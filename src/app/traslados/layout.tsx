import Navbar from "@/components/Navbar";

export default function TrasladosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
