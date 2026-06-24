import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TopMarquee } from "@/components/effects/TopMarquee";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-abyss text-sand-300 flex flex-col">
      <TopMarquee />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
