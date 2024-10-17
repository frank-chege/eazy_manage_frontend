import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { configureRequest } from "../../common/utils";
import { useGlobalContext } from "../../auth/contextProvider";

export default function AddEmployee() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [dep, setDep] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [joined, setJoined] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);

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
    const payload = {
      role,
      firstName,
      lastName,
      email,
      status,
      dep,
      jobTitle,
      joined,
    };

    request
      .post("/auth/register", payload)
      .then((res) => {
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
          toast.error("An error occured. PLease try again");
        }
        setWaitMessage(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Please fill the form to add new employee</h3>
      <div className="mb-3">
        <label className="form-label">Select role: </label>
        <select
          className="form-select"
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option disabled>--select role--</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">First name</label>
        <input
          className="form-control"
          type="text"
          pattern="[A-Za-z]+"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
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
          placeholder="Enter last name"
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
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Select status: </label>
        <select
          className="form-select"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled>--select status--</option>
          <option value="active">Active</option>
          <option value="leave">On leave</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select department: </label>
        <select
          className="form-select"
          onChange={(e) => setDep(e.target.value)}
          required
        >
          <option disabled>--select department--</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="ACCOUNTS">Accounts</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select job title: </label>
        <select
          className="form-select"
          onChange={(e) => setjobTitle(e.target.value)}
          required
        >
          <option disabled>--select job title--</option>
          <option value="accountant">Accountant</option>
          <option value="hr">Hr</option>
          <option value="developer">Developer</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Joined</label>
        <input
          className="form-control"
          type="date"
          value={joined}
          onChange={(e) => setJoined(e.target.value)}
          placeholder="select date"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary ">
        {waitMessage ? "Please wait..." : "Add Employee"}
      </button>
    </form>
  );
}
