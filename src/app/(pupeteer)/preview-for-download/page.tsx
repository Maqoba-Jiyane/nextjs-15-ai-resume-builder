// app/preview/page.tsx (or whatever route you're using)

import ResumePreview from '@/components/ResumePreview';
import { getResumeData } from './action';
import { notFound } from 'next/navigation';
import { mapToResumeValues } from '@/lib/utils';

interface Props {
  searchParams: Promise<{resumeId?: string}>
}

export default async function ResumePage({ searchParams }: Props) {
  const { resumeId } = await searchParams;

  if (!resumeId) {
    notFound();
  }

  const resumeData = await getResumeData(resumeId);

  if (!resumeData) {
    notFound();
  }

  const resume = mapToResumeValues(resumeData);

  return (
    <div className='lg:px-40'>
      <ResumePreview resumeData={resume} />
    </div>
  );
}
