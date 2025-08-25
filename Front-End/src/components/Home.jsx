import { Link } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTop";

import ScrollCounterFramer from "./Other/Count";

function Home() {
  const item=[
    {name:"component"},

  ]
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <h1 className="text-center text-2xl"> Welcome to design dectonary </h1>
      <ul>
       <Link to={"/ComponentList"}>
       Components
       </Link>
      </ul>





     
      <ScrollToTopButton />
      <ScrollCounterFramer />
    </div>
  );
}

export default Home;
