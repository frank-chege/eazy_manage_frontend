import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { configureRequest } from "../common/utils";
import { useGlobalContext } from "./contextProvider";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);
  const [regRole, setRegRole] = useState("");

  const navigate = useNavigate();
  const request = configureRequest();
  const { loginRole } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //verify input
    if (firstName.length < 3 || lastName < 3) {
      toast.error("Name is too short!");
      return;
    }

    if (pwd.length < 6) {
      toast.error("Password is too short! should be atleast 6 characters");
      return;
    }

    if (pwd !== confirmPwd) {
      toast.error("Passwords do not match!");
      return;
    }
    const role = loginRole !== "admin" ? "viewer" : regRole;
    const payload = { firstName, lastName, email, pwd, role };

    request
      .post("/auth/register", payload)
      .then((res) => {
        navigate("/login");
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
          if (error.response.status === 409) {
            navigate("/login");
          }
        } else {
          toast.error("An error occured. PLease try again");
        }
        setWaitMessage(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Please fill the form to register</h3>
      {/**add role field for admin */}
      {loginRole === "admin" ? (
        <div className="mb-3">
          <label className="form-label">Select role: </label>
          <select
            className="form-select"
            onChange={(e) => setRegRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      ) : (
        ""
      )}

      <div className="mb-3">
        <label className="form-label">First name</label>
        <input
          className="form-control"
          type="text"
          pattern="[A-Za-z]+"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last name</label>
        <input
          className="form-control"
          type="text"
          pattern="[A-Za-z]+"
          title="Name can only contain letters."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="form-label">Confirm password</label>
        <input
          className="form-control"
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          required
        />
      </div>

      <p>
        Already have an account?
        <Link className="navbar-brand" to="/login">
          Login here
        </Link>
      </p>
      <button type="submit" className="btn btn-primary ">
        {waitMessage ? "Please wait..." : "Register"}
      </button>
    </form>
  );
}
