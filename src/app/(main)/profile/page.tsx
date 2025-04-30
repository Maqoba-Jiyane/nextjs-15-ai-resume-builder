import { Metadata } from "next";
import PersonalDetailsEditor from "./PersonalDetailsEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { userDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Fill in your details",
};

async function Page() {
  // const {personalDetailsId} = await searchParams

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const personalDetailsToEdit = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: userDataInclude,
  });

  return (
    <PersonalDetailsEditor
      personalDetailsToEdit={personalDetailsToEdit}
    />
  );
}

export default Page;
