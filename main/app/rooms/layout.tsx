// app/layout.tsx or wherever your AppLayout is defined
import NavBar from "../../components/NavBar";
import { getSession } from "../libs/session";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  return (
      <main>
        <NavBar user={session.user}/>
        <div className="space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
          {children}
        </div>
      </main>
  );
}
