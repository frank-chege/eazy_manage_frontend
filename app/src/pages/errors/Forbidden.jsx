//forbidden access page

import { useNavigate } from "react-router-dom";

export default function Forbidden({ previousPage }) {
  const navigate = useNavigate();
  const goToPreviousPage = () => {
    navigate(previousPage);
  };

  return (
    <div className="container mt-5 text-center">
      <div className="alert alert-danger" role="alert">
        <h2 className="display-4">403 - Forbidden</h2>
        <p className="lead">
          Sorry, you don't have permission to access this page.
        </p>
        <hr />
        <p>If you believe this is a mistake, please contact support.</p>
        <button onClick={goToPreviousPage} className="btn btn-primary">
          Go back to the previous page
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="btn btn-primary"
        >
          Or log in
        </button>
      </div>
    </div>
  );
}
