import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "School Management System",
  description: "Manage students efficiently with Spring Boot & Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
