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
          url: `${baseUrl}/profile`,
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
      {
          url: `${baseUrl}/blog/common-resume-mistakes-to-avoid`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/eonresume-one-click-professional-summaries`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-eonresumes-ai-can-write-your-work-experience`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-to-highlight-achievements`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-to-tailor-your-resume-for-jobs`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-to-write-a-cover-letter`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-to-write-a-professional-summary`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/how-to-write-a-resume-that-stands-out`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/resume-formatting-tips`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/the-perfect-resume-length`,
          lastModified: new Date()
      },
      {
          url: `${baseUrl}/blog/using-action-verbs-in-your-resume`,
          lastModified: new Date()
      },
    ]
}
