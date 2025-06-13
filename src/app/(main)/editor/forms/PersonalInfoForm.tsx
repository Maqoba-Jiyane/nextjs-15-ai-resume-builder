"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { shallowCompareFields } from "@/lib/utils/compare";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

const PersonalInfoForm = ({
  resumeData,
  setResumeData,
  personalDetails,
}: EditorFormProps) => {
  // Memoize default values
  const defaultValues = useMemo<PersonalInfoValues>(() => ({
    firstName: resumeData.firstName ?? personalDetails.firstName ?? "",
    lastName: resumeData.lastName ?? personalDetails.lastName ?? "",
    jobTitle: resumeData.jobTitle ?? personalDetails.jobTitle ?? "",
    country: resumeData.country ?? personalDetails.country ?? "",
    city: resumeData.city ?? personalDetails.city ?? "",
    phone: resumeData.phone ?? personalDetails.phone ?? "",
    email: resumeData.email ?? personalDetails.email ?? "",
    // website: resumeData.website ?? personalDetails.website ?? "",
    // linkedin: resumeData.linkedin ?? personalDetails.linkedin ?? "",
    // github: resumeData.github ?? personalDetails.github ?? "",
    photo: undefined, // leave file uploads empty by default
  }), [
    resumeData, 
    personalDetails,
    // Include all dependencies used in the default values
    resumeData.firstName, personalDetails.firstName,
    resumeData.lastName, personalDetails.lastName,
    resumeData.jobTitle, personalDetails.jobTitle,
    resumeData.country, personalDetails.country,
    resumeData.city, personalDetails.city,
    resumeData.phone, personalDetails.phone,
    resumeData.email, personalDetails.email,
    // resumeData.website, personalDetails.website,
    // resumeData.linkedin, personalDetails.linkedin,
    // resumeData.github, personalDetails.github,
  ]);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  // Watch all form values
  const watchedValues = useWatch({
    control: form.control,
  });
  
  // Auto-save whenever watched values change
  useEffect(() => {
    const fields: (keyof PersonalInfoValues)[] = [
      "firstName", "lastName", "jobTitle", "country", "city",
      "phone", "email", "website", "linkedin", "github", "photo"
    ];
  
    if (shallowCompareFields(resumeData, watchedValues, fields)) {
      setResumeData({
        ...resumeData,
        ...watchedValues,
      });
    }
  }, [watchedValues]);
  

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal info</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://linkedin.com/in/username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://github.com/username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;