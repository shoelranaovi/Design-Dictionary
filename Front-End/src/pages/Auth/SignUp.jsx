import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/Redux/AuthSlice";
import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoadingComponent from "../LoadingComponent";

const RegisterPage = () => {
  const initailData = {
    username: "",
    email: "",
    password: "",
  };
  const [fromdata, setFromdata] = useState(initailData);

  const { username, email, password } = fromdata;
  const { isLoading } = useSelector((state) => state.auth);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googlelogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };
  const facebooklogin = () => {
    window.location.href = "http://localhost:3000/api/auth/facebook";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setError("Name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      dispatch(register(fromdata)).then((data) => {
        if (data.payload.success) {
          toast.success(data.payload.message || "Register successfully");
          navigate(`/auth/verify?email=${encodeURIComponent(fromdata.email)}`);
        } else {
          toast.error(data.payload.message || "something happen");
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-0">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md md:w-96">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-orange-500">Socialify</span>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Full Name"
            className="mb-4 w-full"
            value={username}
            onChange={(e) =>
              setFromdata({ ...fromdata, username: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            type="email"
            className="mb-4 w-full"
            value={email}
            onChange={(e) =>
              setFromdata({ ...fromdata, email: e.target.value })
            }
          />
          <Input
            placeholder="Password"
            type="password"
            className="mb-4 w-full"
            value={password}
            onChange={(e) =>
              setFromdata({ ...fromdata, password: e.target.value })
            }
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            className="mb-4 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 mb-4">
            Register
          </Button>
        </form>
        <div className="text-center text-gray-500 mb-4">OR</div>
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
        <div className="mt-4 text-center">
          <Link
            to={"/auth/login"}
            className="text-sm text-gray-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default RegisterPage;
