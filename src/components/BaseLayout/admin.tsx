import React from "react";
import BusinessStoreProvider from "../../context";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import Notify from "../Notify";
import "./style.scss";

interface AdminBaseLayoutProps {
  children: React.ReactNode;
}

export default function AdminBaseLayout({ children }: AdminBaseLayoutProps) {
  return (
    <div className="admin-main-wrapper">
      <BusinessStoreProvider>
        <AdminSidebar />
        <AdminHeader />
        <div className="content">{children}</div>
        <Notify />
      </BusinessStoreProvider>
    </div>
  );
}
