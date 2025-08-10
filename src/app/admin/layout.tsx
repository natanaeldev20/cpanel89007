import Header from "@/components/layout/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[310px_1fr]">
      <Header />
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
