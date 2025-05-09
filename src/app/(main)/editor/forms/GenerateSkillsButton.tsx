import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { generateSkills } from "./actions";

// Updated props to include aiUsed flag in the payload
interface GenerateSkillsButtonProps {
  resumeData: ResumeValues;
  /**
   * Called when skills summary is generated.
   * @param payload.skills  comma-separated skills string
   * @param payload.aiUsed  whether AI was used to generate skills
   */
  onSkillsGenerated: (payload: { skills: string; aiUsed: boolean }) => void;
}

const GenerateSkillsButton = ({ resumeData, onSkillsGenerated }: GenerateSkillsButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO: Block non-premium users
    try {
      setLoading(true);
      const aiResponse = await generateSkills(resumeData);
      // Pass both the generated skills and the aiUsed flag
      onSkillsGenerated({ skills: aiResponse, aiUsed: true });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparkles className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
};

export default GenerateSkillsButton;
