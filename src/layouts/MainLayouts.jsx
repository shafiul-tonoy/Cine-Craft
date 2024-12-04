import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

export default function MainLayouts() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
