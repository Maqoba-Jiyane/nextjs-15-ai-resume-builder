import React, { JSX, ReactNode } from "react";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  facebook: {
    appId: "23449",
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({
  children,
}: LayoutProps): Promise<JSX.Element | null> => {
  const { userId } = await auth();

  if (!userId) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
