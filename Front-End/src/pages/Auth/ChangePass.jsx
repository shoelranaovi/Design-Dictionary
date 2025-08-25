import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { changepass, checkUser } from "@/Redux/AuthSlice";
import LoadingComponent from "../LoadingComponent";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Extract query params
  const email = queryParams.get("email");
  const [formData, setFormData] = useState({
    email: email,
    newPassword: "",
    confirmPassword: "",
  });
 
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);


  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      dispatch(changepass(formData)).then((data) => {
       

        if (data.payload.success) {
          toast.success("Password changed successfully!");
          navigate("/");
          dispatch(checkUser());
          setFormData({
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          toast.error(data.payload.message || "Failed to change password");
        }
      });
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              onSubmit={handleSubmit}
              type="submit"
              className="w-full bg-orange-700">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default ChangePasswordPage;
