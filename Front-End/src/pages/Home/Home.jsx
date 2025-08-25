import Container from "@/components/Home/Container";
import Sidebar from "@/components/Home/Sidebar";
import SuggestedFriends from "@/components/Common/SuggestedFriends";
import PendingRequest from "@/components/Common/PendingRequest";

function Homepage() {
  return (
    <div className="w-full flex justify-between  mt-2 gap-2">
      <div className="   lg:w-2/6">
        {" "}
        <Sidebar />{" "}
      </div>
      <div className="   w-3/6">
        <Container />
      </div>
      <div className="bg-green-700 flex flex-col gap-2 w-2/6 pr-1">
        <SuggestedFriends />
        <PendingRequest />
      </div>
    </div>
  );
}

export default Homepage;
