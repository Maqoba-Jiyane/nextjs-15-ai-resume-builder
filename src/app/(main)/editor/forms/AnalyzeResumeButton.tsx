
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { Brain, Ellipsis } from "lucide-react";
import { useState } from "react";
import { analyzeResume } from "./actions";
import { ATSAnalysisProps } from "@/components/Interfaces";
import { Button } from "@/components/ui/button";

interface AnalyzeResumeButtonProps {
  resumeData: ResumeValues;
  onResumeAnalyzed: (analysis: ATSAnalysisProps) => void;
}

const AnalyzeResumeButton = ({
  resumeData,
  onResumeAnalyzed,
}: AnalyzeResumeButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO Block non-premium users

    try {
        setLoading(true)
        const aiResponse = await analyzeResume(resumeData);
        onResumeAnalyzed(aiResponse)
    } catch (error) {
        console.error(error)
        toast({
            variant: 'destructive',
            description: 'Something went wrong. Please try again.'
        })
    }finally{
        setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      size={'icon'}
      onClick={handleClick}
    >
      {!loading ? <Brain /> : <Ellipsis />}
    </Button>
  );
};

export default AnalyzeResumeButton;
