import NavBar from "../components/NavBar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      <div className="space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        {children}
      </div>
    </main>
  );
}
