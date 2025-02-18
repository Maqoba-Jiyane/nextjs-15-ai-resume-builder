import { Button } from "@/components/ui/button";
import { LayoutGrid, FileText, Layers } from "lucide-react";

export const ResumeTemplates = {
  CLASSIC: "CLASSIC",
  MODERN: "MODERN",
  CREATIVE: "CREATIVE",
}

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

  const Icon =
    template === "CLASSIC" ? FileText :
    template === "MODERN" ? LayoutGrid :
    Layers; // Default icon for CREATIVE

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change resume template"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
};

export default TemplateSwitcher;
