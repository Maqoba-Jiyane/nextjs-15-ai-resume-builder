import { Button } from "@/components/ui/button";
import { SwitchCamera } from "lucide-react";

export const ResumeTemplates = {
  CLASSIC: "classic",
  ATS1: "ats-1",
  MODERN: "modern",
  CLASSICRESUMERICH: "classic-resume-rich",
  SCIENCEENGINEERINGRESUME: 'science-engineering-resume',
};

const templateStyles = Object.values(ResumeTemplates);

interface TemplateSwitcherProps {
  template: string | undefined;
  onChange: (template: string) => void;
}

const TemplateSwitcher = ({ template, onChange }: TemplateSwitcherProps) => {
  function handleClick() {
    const currentIndex = template ? templateStyles.indexOf(template) : 0;
    const nextIndex = (currentIndex + 1) % templateStyles.length;
    onChange(templateStyles[nextIndex]);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change resume template"
      onClick={handleClick}
    >
      <SwitchCamera className="size-5" />
    </Button>
  );
};

export default TemplateSwitcher;
