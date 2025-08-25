import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import { toast } from "sonner";
import { loginwithPassword } from "@/Redux/AuthSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear any previous email errors
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear any previous password errors
  };
  const googlelogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };
  const facebooklogin = () => {
    window.location.href = "http://localhost:3000/api/auth/facebook";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromdata = {
      email: email,
      password: password,
    };

    // Validation (More robust validation needed in real app)
    if (!email) {
      setError("Email is required.");
      return;
    } else if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      dispatch(loginwithPassword(fromdata)).then((data) => {
        if (data.payload.success) {
        
          toast.success(data.payload.message || "login successfully");
          navigate("/");
        } else {
          toast.error(data.payload.message || "something happen");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-0">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md md:w-96">
        {/* Tenda Logo */}
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-orange-500">Socialify</span>
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Local Login Form */}
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email"
            className="mb-4 w-full"
            value={email}
            onChange={handleEmailChange} // Use handler function
          />
          <Input
            placeholder="Password"
            type="password"
            className="mb-4 w-full"
            value={password}
            onChange={handlePasswordChange} // Use handler function
          />
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 mb-4">
            Login
          </Button>
        </form>
        {/* OR Separator */}
        <div className="text-center text-gray-500 mb-4">OR</div>{" "}
        {/* Added separator */}
        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={googlelogin}
            className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 flex items-center space-x-2">
            <FaGoogle /> <span>Google</span>
          </Button>
          <Button
            onClick={facebooklogin}
            className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 flex items-center space-x-2">
            <FaFacebook /> <span>Facebook</span>
          </Button>
        </div>
        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            to={"/auth/forgetpass"}
            className="text-sm text-gray-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default LoginPage;
