// import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar'),
  //   headless: chromium.headless,
  // })

  let resumeId: string | undefined
  try {
    const body = await req.json()
    resumeId = body.resumeId
  } catch {}

  const origin = req.nextUrl.origin

  const browser = await puppeteer.connect({
    browserWSEndpoint: `${origin}/preview-for-download?resumeId=${resumeId}`,
  });

  const page = await browser.newPage()

  const cookieStore = await cookies()
  const allCookieEntries = cookieStore.getAll()
  const clerkCookieEntries = allCookieEntries.filter(({ name }) =>
    name.startsWith('__session') ||
    name.startsWith('__client_uat') ||
    name.startsWith('__clerk_db_jwt') ||
    name.startsWith('__client')
  )

  for (const { name, value } of clerkCookieEntries) {
    await page.setCookie({
      name,
      value,
      domain: process.env.NODE_ENV === 'production' ? 'eonresume.co.za' : 'localhost',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  }
  // await page.goto(`${origin}/preview-for-download?resumeId=${resumeId}`, { waitUntil: 'networkidle0' })
  await page.emulateMediaType('screen')

  const idList = ['resumePreviewContent']
  await page.evaluate((ids) => {
    ids.forEach((id: string) => {
      const el = document.getElementById(id)
      if (el) el.style.padding = '0px'
    })
  }, idList)

  const pdfBuffer = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' }
  })

  await browser.close()

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=resume_${resumeId}.pdf`,
    },
  })
}
