import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import AdminCredentials from "../components/AdminCredentials";

function LogLayout() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const signup = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find((user) => user.email === email);

      if (!foundUser) {
        alert("Email not found, please Sign Up first");
      } else if (foundUser.password !== password) {
        alert("Wrong password, please try again");
      } else {
        localStorage.setItem("token", "dummy_token_123");
        localStorage.setItem("name", foundUser.name);
        localStorage.setItem("email", foundUser.email);
        localStorage.setItem("id", foundUser.id);
        localStorage.setItem("role", foundUser.role);
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        navigate("/home");
      }
    }
    setValidated(true);
  };

  return (
    <>
      <AdminCredentials />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01" className="mb-4">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={changeEmail}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter an email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom02" className="mb-4">
          <Form.Label>Password :</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={changePassword}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        
        <button type="submit">
          Sign In
        </button>
        
        <div className="signup d-flex mt-3">
          <span className="me-2">Don't have account yet?</span>
          <a href="#" className="text-decoration-none" onClick={signup}>
            SignUp
          </a>
        </div>
      </Form>
    </>
  );
}

export default LogLayout;