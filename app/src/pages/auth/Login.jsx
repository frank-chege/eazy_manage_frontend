import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { configureRequest } from "../common/utils";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);
  const navigate = useNavigate();
  const request = configureRequest();
  const payload = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitMessage(true);
    request
      .post("/auth/login", payload)
      .then((res) => {
        const role = res.data.role;
        //check if cookie exists
        if (!Cookies.get("csrf_token")) {
          Cookies.set("csrf_token", res.data.token);
        } else {
          Cookies.remove("csrf_token");
          Cookies.set("csrf_token", res.data.token);
        }
        navigate(`/${role}/tasks`);
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          toast.error("Request timeout. Please try again.");
        } else if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          console.log(error);
          toast.error("An error occurred. Please try again.");
        }
        setWaitMessage(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-95">
      {/* Very dark page background */}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-90 p-6 rounded-md shadow-md max-w-md w-full mx-4"
      >
        {/* Form with slightly transparent, dark background */}

        <h3 className="text-gray-300 mb-5 text-center text-lg font-semibold">
          Login to Your Account
        </h3>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">Email</label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">
            Password
          </label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Link
          to={"/reset_password"}
          className="text-gray-400 hover:text-gray-200 underline"
        >
          Forgot your password?
        </Link>

        <button
          type="submit"
          className="bg-gray-700 text-gray-300 p-2 rounded-md hover:bg-gray-600 transition duration-200 w-full font-medium"
        >
          {waitMessage ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-500 text-sm text-center mt-5">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-gray-400 hover:text-gray-200 underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
