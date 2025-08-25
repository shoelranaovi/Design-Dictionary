/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetpass } from "@/Redux/AuthSlice";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromdata = {
      email: email,
    };

    // Validation (More robust validation needed in real app)
    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      dispatch(forgetpass(fromdata)).then((data) => {
        if (data.payload.success) {
          toast.success(
            data.payload.message || " verification mail send successfully"
          );
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
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-orange-500">Socialify</span>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter your email"
            type="email"
            className="mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 mb-4">
            Reset Password
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to={"/auth/login"}
            href="#"
            className="text-sm text-gray-600 hover:underline">
            Remembered your password? Login
          </Link>
        </div>
      </div>
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default ForgotPasswordPage;
