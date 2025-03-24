export default async function sitemap() {
    const baseUrl = 'https://www.eonresume.co.za'

    return [
      {
          url: baseUrl,
          lastModified: new Date(),
      },
      {
          url: `${baseUrl}/to-get-started`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/sign-in`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/sign-up`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/How-to-Write-a-Resume-That-Stands-Out`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/top-5-skills-employers-look-for`,
          lastModified: new Date()
      },
    ]
}
