import { Link } from "react-router-dom";


export default function AuthList() {
  return (
    <div className="flex flex-col">
      <Link to={"/components/auth/login"} > login page -socialfy </Link>
      <Link to={"/components/auth/signup"} > signup page -socialfy </Link>
      
    </div>
  )
}
