import { Header } from "./_components/header";
import { Navbar } from "./_components/nav";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen font-geist-sans bg-white flex flex-col gap-2">
      <Header />
      <Navbar />
      {children}
    </div>
  );
}
