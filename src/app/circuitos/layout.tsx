import Navbar from "@/components/Navbar";

export default function CircuitosLayout({
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
