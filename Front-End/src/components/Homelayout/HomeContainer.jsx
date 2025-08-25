import ProductCard from "./Card";

const list = [1];

function HomeContainer() {
  return (
    <div className=" container mx-auto   bg-green-800 h-screen   gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 h-40 font-poppins">Item 1</div>
        <div className="bg-green-500 h-40">Item 2</div>
        <div className="bg-red-500 h-40">Item 3</div>
        <div className="bg-yellow-500 h-40">Item 4</div>
        <div className="bg-purple-500 h-40">Item 5</div>
        <div className="bg-indigo-500 h-40">Item 6</div>
      </div>
    </div>
  );
}

export default HomeContainer;
