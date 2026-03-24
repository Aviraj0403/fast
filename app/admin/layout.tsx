// app/admin/layout.tsx
import { ReactNode } from "react";
import AdminNavbar from "@/components/AdminNavbar"; // optional
import AdminFooter from "@/components/AdminFooter"; // optional

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Admin Panel | FastAdmission</title>
      </head>
      <body className="bg-gray-50 min-h-screen">
        <AdminNavbar />
        <main className="p-6">{children}</main>
        <AdminFooter />
      </body>
    </html>
  );
}
