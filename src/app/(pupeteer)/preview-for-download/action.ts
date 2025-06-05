import prisma from '@/lib/prisma';
import { resumeDataInclude, ResumeServerData } from '@/lib/types';

export async function getResumeData(id: string): Promise<ResumeServerData | null> {
  if (!id || typeof id !== 'string') {
    console.warn('Invalid resume ID provided:', id);
    return null;
  }

  try {
    const resumeData = await prisma.resume.findUnique({
      where: { id },
      include: resumeDataInclude,
    });

    // Optional: Validate or cast the data if needed
    return resumeData as ResumeServerData | null;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return null;
  }
}
