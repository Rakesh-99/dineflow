import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/sonner";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  const { theme } = useSelector((state) => state.themeSlice);
  const { userData } = useSelector((state) => state.currentuserSlice);

  return (
    <div
      className={`flex flex-col h-screen transition-all duration-1000 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-zinc-800 text-white"
      }`}
    >
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {userData?.role === "restaurantOwner" && <Sidebar />}

        {/* Only this section scrolls */}
        <section className="flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      <Toaster />
    </div>
  );
};

export default Layout;