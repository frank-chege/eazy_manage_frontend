//manages registration
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [role, changeRole] = useState("patient");
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [pwd, changePwd] = useState("");
  const [contact, changeContact] = useState("");
  const [birthday, changeBirthday] = useState("");
  const [gender, changeGender] = useState("");
  const [confirmPwd, changeConfirmPwd] = useState("");
  const [files, changeFile] = useState("");
  const [address, changeAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate name
    if (name.length < 5) {
      toast.error("Name is too short!");
      return;
    }
    //check if passwords match
    if (role === "patient" && pwd !== confirmPwd) {
      toast.error("Passwords do not match!");
      return;
    }

    if (role === "patient" && pwd.length < 6) {
      toast.error("Password is too short! should be atleast 6 characters");
      return;
    }
    //check if file was uploaded for hospital and pharmacy
    if (role !== "patient" && files.length < 1) {
      toast.error("Please upload verification files");
      return;
    }
    let data;
    let contType;
    //create the patient payload
    if (role === "patient") {
      data = JSON.stringify({
        role,
        name,
        email,
        contact,
        pwd,
        birthday,
        gender,
      });
      contType = "application/json";
    } else {
      //create payload for hospital and pharmacy
      data = new FormData();
      for (let len = 0; len < files.length; len++) {
        data.append("files", files[len]);
      }
      data.append(
        "payload",
        JSON.stringify({ role, name, email, contact, address })
      );
      contType = "multipart/form-data";
    }
    //send data to backend
    await axios
      .post(`http://127.0.0.1:5000/api/auth/register/${role}`, data, {
        headers: {
          "Content-Type": contType,
        },
      })
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
        } else {
          toast.error("An error occured. PLease try again");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Register as: </label>
        <select
          className="form-select"
          value={role}
          onChange={(e) => changeRole(e.target.value)}
          required
        >
          <option value="patient">Patient</option>
          <option value="hospital">Hospital admin</option>
          <option value="pharmacy">Pharmacy admin</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Full name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => changeName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => changeEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact</label>
        <input
          className="form-control"
          type="tel"
          pattern="[0-9]+"
          placeholder="0712345678"
          value={contact}
          onChange={(e) => changeContact(e.target.value)}
          required
        />
      </div>
      {/**file upload for pharmacy and hospital */}
      {role != "patient" && (
        <>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              type="text"
              value={address}
              onChange={(e) => changeAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Upload documents verifying your institution
            </label>
            <input
              className="form-control"
              type="file"
              multiple
              accept=".pdf, .docx"
              onChange={(e) => changeFile(e.target.files)}
              placeholder="Upload files. pdf/docx"
              required
            />
          </div>
        </>
      )}
      {/**input fields to be hidden if role is not patient */}
      {role == "patient" && (
        <>
          <div className="mb-3">
            <label className="form-label">Date of birth</label>
            <input
              className="form-control"
              type="date"
              value={birthday}
              onChange={(e) => changeBirthday(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => changeGender(e.target.value)}
              required
            >
              <option value="" disabled>
                --Select your gender--
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>
              <option value="other">Other</option>
            </select>
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

          <div>
            <label className="form-label">Confirm password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPwd}
              onChange={(e) => changeConfirmPwd(e.target.value)}
              required
            />
          </div>
        </>
      )}
      <p>
        Already have an account?
        <Link className="navbar-brand" to="/login">
          Login here
        </Link>
      </p>
      <button type="submit" className="btn btn-primary ">
        Register
      </button>
    </form>
  );
}
export default Register;
