import React from "react";
import Navbar from "./Navbar";
// import PremiumModal from "@/components/premium/PremiumModal";
export const metadata = {
  facebook: {
    appId: '23449',
  },
}
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      {/* <PremiumModal/> */}
    </div>
  );
}

export default Layout;
