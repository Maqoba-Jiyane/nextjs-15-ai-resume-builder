import React, { JSX, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const metadata = {
  facebook: {
    appId: "23449",
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps): Promise<JSX.Element | null> => {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { userId },
    select: { affiliate: true },
  });

  const isAffiliate = !!user?.affiliate;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Sidebar isAffiliate={isAffiliate} />
      {children}
    </div>
  );
};

export default Layout;
