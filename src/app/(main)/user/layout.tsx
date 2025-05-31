// app/(with-sidebar)/layout.tsx

export const metadata = {
  title: "Dashboard",
};

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[92vh]">
      {/* <Sidebar /> */}
      {children}
    </main>
  );
}
