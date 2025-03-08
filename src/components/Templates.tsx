"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Template } from "@prisma/client";
import logo from '../../../assets/logo.png'; // Sample logo, can be customized for each template

interface TemplatesProp {
  templates: Template[]; // List of templates
}

export default function Templates({ templates }: TemplatesProp) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Handle template selection and simulate saving
  const handleSaveTemplate = async (templateName: string) => {
    setIsSaving(true); // Start saving
    // Simulate an API call or save operation
    setTimeout(() => {
      setIsSaving(false);
      setSelectedTemplate(templateName); // Update the selected template
      // Here, you would save the selected template in the database or state
      console.log(`Template "${templateName}" saved!`);
    }, 2000); // Simulate saving process (2 seconds)
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select a Resume Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="flex flex-col items-center">
            <div
              className={`border rounded-lg p-3 cursor-pointer transition hover:shadow-lg ${
                selectedTemplate === template.name ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedTemplate(template.name)} // Set selected template on click
            >
              {/* Image from assets or external link */}
              <Image
                src={template.image || logo} // Use fallback logo if no image is assigned
                alt={template.name}
                width={250}
                height={300}
                className="rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{template.name}</h2>
            </div>
            {selectedTemplate === template.name && (
              <div className="mt-4">
                <Button
                  className="bg-blue-500 text-white"
                  disabled={isSaving}
                  onClick={() => handleSaveTemplate(template.name)}
                >
                  {isSaving ? 'Saving...' : 'Use Selected Template'}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
