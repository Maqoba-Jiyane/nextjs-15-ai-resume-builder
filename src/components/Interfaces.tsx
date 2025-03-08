

interface AtsSection {
    score: number;
    analysis: string;
    improvements: string[];
  }
  
  export interface ATSAnalysisProps {
    overall_score: number;
    keywords_match: AtsSection;
    experience_match: AtsSection;
    education_match: AtsSection;
    skills_match: AtsSection;
    ats_compatibility: AtsSection;
  }