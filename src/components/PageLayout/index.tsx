import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-wrapper">
      <div className="page-navigation"></div>
      <div className="page-content">{children}</div>
    </div>
  );
}
