
import puppeteer from 'puppeteer'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST( req:NextRequest ) {
  const browser = await puppeteer.launch({
    headless: 'shell',
    executablePath: puppeteer.executablePath(), // Vercel will use the path to installed Chrome
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // these args are important for serverless
  })
  const page = await browser.newPage()

  const cookieStore = await cookies()
  const allCookieEntries = cookieStore.getAll() // array of { name, value }
  const clerkCookieEntries = allCookieEntries.filter(({ name }) =>
    name.startsWith('__session') ||
    name.startsWith('__client_uat') ||
    name.startsWith('__clerk_db_jwt') ||
    name.startsWith('__client')
  )

  if (clerkCookieEntries.length === 0) {
    console.warn('[pupeteer] No Clerk cookies found in request—user may not be signed in.')
  }

  for (const { name, value } of clerkCookieEntries) {
    await page.setCookie({
      name,
      value,
      domain:
        process.env.NODE_ENV === 'production'
          ? 'eonresume.co.za'
          : 'localhost',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  }

  let resumeId: string | undefined
  try {
    const body = await req.json()
    resumeId = body.resumeId
  } catch {
    // malformed JSON or no body
  }

  const origin = req.nextUrl.origin

  await page.goto(`${origin}/preview-for-download?resumeId=${resumeId}`, { waitUntil: 'networkidle0' })
  await page.emulateMediaType('screen')

  // Un-comment to export with background layout enabled
  // await page.click('[id="headlessui-switch-:R1im:"]')

  // const idRemovalList = '#header, #page-break, #footer'

  // await page.evaluate(( selector ) => {
  //   const elements = document.querySelectorAll( selector )
  //   elements.forEach( pageItem => pageItem.parentNode?.removeChild( pageItem ))
  // }, idRemovalList )

  const idList = ['resumePreviewContent'];

await page.evaluate((ids) => {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.padding = '0px'; // or: el.remove();
    }
  });
}, idList);


  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: {top: '5mm', bottom: '5mm', left: '5mm', right: '5mm'} })


  await browser.close()

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=resume_${'resumeId'}.pdf`,
    },
  })
}
