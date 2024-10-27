//authenticates login requests
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "./contextProvider";
import { configureRequest } from "../common/utils";

function Login() {
  //define states to manage input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);
  const navigate = useNavigate();
  const request = configureRequest();
  //create payload
  const payload = { email, password };
  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setWaitMessage(true);
    request
      .post("/auth/login", payload)
      .then((res) => {
        const role = res.data.role;
        document.cookie =
          "csrf_token=" + res.data.token + "; path=/; Secure; SameSite=None";
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
          toast.error("An error occured. PLease try again");
        }
        setWaitMessage(false);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-700">
      {/* Deep red background */}

      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-95 p-6 rounded shadow-lg w-96"
      >
        {/* Form container with black background and opacity */}

        <h3 className="text-white mb-4 text-center">
          Please fill the form to login
        </h3>

        <div className="mb-4">
          <label className="form-label text-white block mb-1">Email</label>
          <input
            className="form-control bg-white text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-white block mb-1">Password</label>
          <input
            className="form-control bg-white text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 w-full"
        >
          {waitMessage ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
