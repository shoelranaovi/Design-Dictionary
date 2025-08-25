import spainer from "../assets/Spinner.svg";

function LoadingComponent() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/5 backdrop-blur-[1px] ">
      {/* <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div> */}
      <img src={spainer} />
    </div>
  );
}

export default LoadingComponent;
