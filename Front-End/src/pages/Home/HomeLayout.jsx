import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-200 w-full min-h-screen">
      <div>
        <Navbar />
      </div>
      <main>
        <div className=" mt-2  ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Home;
