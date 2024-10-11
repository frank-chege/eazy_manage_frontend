//authenticates login requests
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "./GlobalContext";
import { extractTokenFromCookie } from "../common/utils";
import { configureRequest } from "../common/utils";

function Login() {
  //define states to manage input values
  const [email, changeEmail] = useState("");
  const [pwd, changePwd] = useState("");
  const [role, changeRole] = useState("patient");
  const [login, changeLoginMessage] = useState(false);

  const { setEmail, setRole } = useGlobalContext();
  const navigate = useNavigate();
  const request = configureRequest();
  //create payload
  const data = { email, pwd, role };

  //handle form submission
  const handleSubmit = (e) => {
    //prevent reload
    e.preventDefault();
    changeLoginMessage(true);
    //send data to the backend
    request
      .post(`/auth/login/${role}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //set the email and role
        const role = res.data.role;
        extractTokenFromCookie();
        setEmail(res.data.email);
        setRole(role);
        navigate(`/${role}/home`);
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (
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
        changeLoginMessage(false);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Enter your details to login</h3>
        <div className="mb-3">
          <label className="form-label">Login as: </label>
          <select
            className="form-select"
            onChange={(e) => changeRole(e.target.value)}
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital admin</option>
            <option value="pharmacy">Pharmacy admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={pwd}
            onChange={(e) => changePwd(e.target.value)}
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
          {login && <>Logging in...</> ? <>Logging in...</> : <>Login</>}
        </button>
      </form>
    </div>
  );
}

export default Login;
