import { SignIn } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <main className="flex h-screen justify-center p-3">
      <SignIn />
    </main>
  );
}

export default Page;
