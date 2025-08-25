import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkUser } from "./Redux/AuthSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <div className="w-full h-full text-black ">
      <Outlet />
    </div>
  );
}

export default App;
