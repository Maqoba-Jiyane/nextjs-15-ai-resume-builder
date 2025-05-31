"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { UserDetailsValues } from "@/lib/validation";
import { cn, mapToUserDetailsValues, } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import {  UserServerData } from "@/lib/types";
import useAutoPersonalDetails from "./useAutoSavePersonalDetails";

interface PersonalDetailsEditorProps {
  personalDetailsToEdit: UserServerData | null;
}

function PersonalDetailsEditor({ personalDetailsToEdit }: PersonalDetailsEditorProps) {
  const searchParams = useSearchParams();
  const [personalDetailsData, setPersonalDetailsData] = useState<UserDetailsValues>(
    personalDetailsToEdit ? mapToUserDetailsValues(personalDetailsToEdit) : {},
  );
  const { isSaving, hasUnsavedChanges } = useAutoPersonalDetails(personalDetailsData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    if (typeof window !== "undefined") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("step", key);
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    }
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col z-0">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Fill in your details</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to fill in your details. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full p-3 overflow-y-auto space-y-6 md:block",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                personalDetailsData={personalDetailsData}
                setPersonalDetailsData={setPersonalDetailsData}
              />
            )}
          </div>
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        isSaving={isSaving}
      />
    </div>
  );
}

export default PersonalDetailsEditor;
