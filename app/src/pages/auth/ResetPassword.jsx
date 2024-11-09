import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  configureAuthenticatedRequest,
  configureRequest,
} from "../common/utils";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reset_code, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //initial step and path incase of logged in users
  const location = useLocation();
  const initialPath = location?.state?.initialPath || "/login";
  const initialStep = location?.state?.initialStep || 1;
  const [resetStep, setResetStep] = useState(initialStep);
  const path = initialPath;
  //configure request depending on client authentication status
  const request =
    initialStep === 2 ? configureAuthenticatedRequest() : configureRequest();
  //request code for logged in user
  useEffect(() => {
    const get_code = async () => {
      try {
        const res = await request.get("/auth/start_password_reset");
        toast.info(res?.data?.message || "A code was sent to your email");
      } catch (error) {
        toast.error("An error occured. Please try again");
      }
    };
    if (initialStep === 2) {
      get_code();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //new password creation
    if (resetStep === 3) {
      if (password.length < 6) {
        toast.error("Password is too short. Should be atleast 6 characters");
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    //set payload and api url depending on password reset step
    const payload =
      resetStep === 1
        ? { email }
        : resetStep === 2
        ? { reset_code }
        : { password };
    const apiUrl =
      resetStep === 1
        ? "get_reset_code"
        : resetStep === 2
        ? "verify_reset_code"
        : "create_new_password";
    //make request
    setLoading(true);
    try {
      const res = await request.post(`/auth/${apiUrl}`, payload);
      toast.info(res.data.message);
      if (resetStep === 3) {
        navigate(path);
      }
      setResetStep((prev) => prev + 1);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-95">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-90 p-6 rounded-md shadow-md max-w-md w-full mx-4"
      >
        <h3 className="text-gray-300 mb-5 text-center text-lg font-regular">
          {resetStep === 1
            ? "Enter your email address to receive a password reset code."
            : resetStep === 2
            ? "Enter the code sent to your email and press verify code to continue"
            : "Enter your new password"}
        </h3>
        {/* input email */}
        {resetStep === 1 ? (
          <div className="mb-3">
            <input
              className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        ) : null}

        {/* input reset code */}
        {resetStep === 2 ? (
          <div className="mb-3">
            <input
              className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="number"
              value={reset_code}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>
        ) : null}

        {/* input new password */}
        {resetStep === 3 ? (
          <>
            <div className="mb-3">
              <label className="block text-gray-400 font-medium mb-1">
                New password
              </label>
              <input
                className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-400 font-medium mb-1">
                Confirm password
              </label>
              <input
                className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        ) : null}

        <button
          type="submit"
          className="bg-gray-700 text-gray-300 my-2 p-2.5 rounded-md hover:bg-gray-600 transition duration-200 w-full font-medium"
        >
          {loading
            ? "Please wait..."
            : resetStep === 1
            ? "Send code"
            : resetStep === 2
            ? "Verify code"
            : "Create new password"}
        </button>
      </form>
    </div>
  );
};
export default ResetPassword;
