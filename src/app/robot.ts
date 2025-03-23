

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.eonresume.co.za'
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/to-get-started', '/sign-in', '/sign-up', '/blog/How-to-Write-a-Resume-That-Stands-Out'],
            disallow: ['/admin/']
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}