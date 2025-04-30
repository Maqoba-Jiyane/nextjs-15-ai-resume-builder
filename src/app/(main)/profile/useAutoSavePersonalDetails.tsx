import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { UserDetailsValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { savePersonalDetails } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoPersonalDetails(personalDetailsData: UserDetailsValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const debouncedPersonalDetailsData = useDebounce(personalDetailsData, 1500);
  const [personalDetailsDataId, setPersonalDetailsDataId] = useState(personalDetailsData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(personalDetailsData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedPersonalDetailsData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedPersonalDetailsData);

        console.log(newData)
        const updatedPersonalDetailsData = await savePersonalDetails({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) === JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: personalDetailsDataId,
        });

        console.log(updatedPersonalDetailsData)

        setPersonalDetailsDataId(updatedPersonalDetailsData.id);
        setLastSavedData(newData);

        if (searchParams.get("personalDetailsDataId") !== updatedPersonalDetailsData.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("personalDetailsDataId", updatedPersonalDetailsData.id);

          if (window) {
            window.history.replaceState(
              null,
              "",
              `?${newSearchParams.toString()}`,
            );
          }
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes</p>
              <Button
              variant='secondary'
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally{
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedPersonalDetailsData, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer);
    if (hasUnsavedChanges && debouncedPersonalDetailsData && !isSaving && !isError) {
      save();
    }
  }, [debouncedPersonalDetailsData, lastSavedData, isSaving, isError, searchParams, toast, personalDetailsDataId]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(personalDetailsData) !== JSON.stringify(lastSavedData),
  };
}
