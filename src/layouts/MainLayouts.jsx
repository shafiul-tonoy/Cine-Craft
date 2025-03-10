import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import {Toaster} from "react-hot-toast"

export default function MainLayouts() {
  return (
    <>
       <Toaster />  
      <header>
        <Navbar />
      </header>
      <hr />
      <main className= 'font-merriweather' >
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
