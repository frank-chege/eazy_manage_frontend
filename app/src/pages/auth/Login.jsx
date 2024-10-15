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

  const { setLoginRole } = useGlobalContext();
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
        setLoginRole(role);
        navigate(`/${role}/home`);
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
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Please fill the form to login</h3>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p>
          Don't have an account?
          <Link className="navbar-brand" to="/register">
            Register here
          </Link>
        </p>
        <button type="submit" className="btn btn-primary ">
          {waitMessage ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
