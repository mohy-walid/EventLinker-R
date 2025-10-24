import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

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
    // Read all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check email exist
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      alert("Email not found, please Sign Up first");
    } else if (foundUser.password !== password) {
      alert("Wrong password, please try again");
    } else {
      // Successful login
      localStorage.setItem("token", "dummy_token_123");
      localStorage.setItem("name", foundUser.name);
      localStorage.setItem("email", foundUser.email);
      localStorage.setItem("id", foundUser.id);
      localStorage.setItem("role", foundUser.role);

      navigate("/home");
    }
  }
    setValidated(true);
  };

  return (
    <div className="log-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01" className="mb-4">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            required
            type="text"
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
        <Button type="submit" variant="dark">
          Sign In
        </Button>
        <div className="signup d-flex mt-2">
          <span className="me-2">Don't have account yet?</span>
          <a href="#" className="text-decoration-none" onClick={signup}>
            SignUp
          </a>
        </div>
      </Form>
    </div>
  );
}

export default LogLayout;
