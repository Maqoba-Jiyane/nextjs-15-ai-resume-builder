"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { CreditCard, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import deleteResume, {
  requestDownloadFromAdmin,
  updateResumeForPayment,
} from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { useRetrieveRef } from "@/hooks/useRetrieveRef";

interface ResumeItemProps {
  resume: ResumeServerData;
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();
  const discountPercentage = Number(useRetrieveRef())

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const handlePrint = () => {
    setTimeout(() => {
      reactToPrintFn();
    }, 500); // Small delay fixes mobile print issues
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  const handleRequestDownload = async () => {
    try {
      const response = await requestDownloadFromAdmin(resume.id);

      if (response) {
        alert("Download request submitted successfully!");
        router.refresh();
      } else {
        alert("Failed to submit download request.");
      }
    } catch (error) {
      console.error("Failed to request download:", error);
      alert("An error occurred while requesting the download.");
    }
  };

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p3">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>

        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full relative"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
        <Button
          size="lg"
          variant="premium"
          disabled={!resume.paid}
          onClick={
            resume.paid ? () => setShowDeleteConfirmation(true) : undefined
          }
          className="flex w-full"
        >
          Download
        </Button>
        <Button
          size="lg"
          variant="destructive"
          disabled={!resume.paid}
          onClick={handleRequestDownload}
          className="flex w-full"
        >
          {resume.downloadRequest ? "Requested" : "Request Admin Download"}
        </Button>
        <DownloadConfirmationDialog
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
          downloadDoc={handlePrint}
        />
      </div>
      <MoreMenu
        resumeId={resume.id}
        onPrintClick={
          resume.paid ? handlePrint : () => myClientComponent(resume.id, discountPercentage)
        }
      />
    </div>
  );
};

export default ResumeItem;

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-5 opacity-0 max-md:opacity-100 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <CreditCard className="size-4" />
            Pay
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function handleDelte() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelte}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DownloadConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  downloadDoc: () => void;
}

function DownloadConfirmationDialog({
  open,
  onOpenChange,
  downloadDoc,
}: DownloadConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDownload() {
    startTransition(async () => {
      downloadDoc();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download resume</DialogTitle>
          <DialogDescription>
            Be sure to set monarch on your download settings on mobile.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <LoadingButton
            variant="default"
            onClick={handleDownload}
            loading={isPending}
          >
            Download
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function myClientComponent(resumeId: string, discountPercentage: number) {
  
  callApi();
  async function callApi() {
    const basePrice = 500;
    const taxRate = 0.15
    const discountedPrice = basePrice * (1 - discountPercentage / 100);
    const taxAmount = discountedPrice * taxRate;
    const totalAmount = discountedPrice + taxAmount;
    try {
      const response = await fetch("/api/yoco-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {amount: totalAmount,
          currency: "ZAR",
          totalDiscount: basePrice * (discountPercentage / 100),
          totalTaxAmount: taxAmount,
          subtotalAmount: discountedPrice,
          lineItems: [
              {
                  displayName: "AI Resume",
                  quantity: 1,
                  pricingDetails: {
                      price: discountedPrice,
                  },
              },
          ],
      }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Yoco checkout");
      }

      const createPayment = await response.json();

      updateResumeForPayment(resumeId, createPayment.id);

      // Directly redirect in the browser
      window.location.href = createPayment.redirectUrl;
    } catch (error) {
      console.error(error);
    }
  }
}
