

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.eonresume.co.za'
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/to-get-started', '/sign-in', '/sign-up', '/blog/How-to-Write-a-Resume-That-Stands-Out', '/blog', '/blog/top-5-skills-employers-look-for'],
            disallow: ['/admin/']
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}