import { Link, Outlet } from "react-router-dom"


function ComponnetsLayout() {
  return (
    <div className="flex flex-col">
      
      <Outlet />

    </div>
  )
}

export default ComponnetsLayout