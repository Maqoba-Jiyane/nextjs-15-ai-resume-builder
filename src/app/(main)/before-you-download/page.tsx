import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div
      id="downloadModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ⚠️ Important Before Downloading
        </h2>
        <p className="text-gray-700">
          We are still improving the platform, and downloading may require
          manual adjustments.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-3">
          📌 How to Download Correctly:
        </h3>
        <ul className="list-disc ml-5 text-gray-700 mb-4">
          <li>
            ✅ Use <strong>Google Chrome</strong> (Recommended)
          </li>
          <li>⚠️ Firefox & Safari may need adjustments</li>
          <li>
            📏 Set <strong>Paper Size: A4</strong>
          </li>
          <li>
            📐 Adjust <strong>Margins: Normal</strong>
          </li>
          <li>
            🔍 Scale: <strong>100% or Fit to Page</strong>
          </li>
          <li>
            📱 On mobile? Try <strong>Desktop Mode</strong> in your browser.
          </li>
        </ul>

        <p className="text-gray-600 font-semibold mb-4">
          Still having issues? Try downloading on a **laptop/desktop**.
        </p>
      </div>
      <Button asChild size='lg' variant='premium'><Link href={'/to-get-started'}>Get started</Link></Button>
    </div>
  );
};

export default Page;


