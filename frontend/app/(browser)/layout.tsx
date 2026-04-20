import React from "react";
import { Shell } from "../components/shell/Shell";

export default function BrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full text-white">
      {/* Header */}
      {/* <div>Header here</div> */}

      {/* Page content */}
      {/* <main className="w-full">{children}</main> */}
      <Shell>{children}</Shell>

      {/* Footer */}
      {/* <div>Footer here</div> */}
    </div>
  );
}