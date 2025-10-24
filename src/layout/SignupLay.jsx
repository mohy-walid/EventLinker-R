import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function SignupLayout() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match...");
      return;
    }

    // Read users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exist = users.find((u) => u.email === email);
    if (exist) {
      alert("Email already exists! Please login");
      navigate("/");
      return;
    }

    const newUser = {
      id:  Math.floor(Math.random() * 1000000000),
      name: fullName,
      email: email,
      password: password,
      role: "user",
    };

    // Save
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully 🎉 Please login now!");
    navigate("/");
    setValidated(true);
  };

  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeFullName = (event) => setFullName(event.target.value);
  const changeConfirmPassword = (event) =>
    setConfirmPassword(event.target.value);
  const login = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="sign-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Full Name */}
        <Form.Group controlId="validationCustomFullName" className="mb-4">
          <Form.Label>Full Name :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={changeFullName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your full name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
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
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="validationCustom02" className="mb-4">
          <Form.Label>Password :</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={changePassword}
            minLength={6}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group controlId="validationCustom03" className="mb-4">
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            isInvalid={password !== confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Terms Checkbox */}
        <Form.Group controlId="formBasicCheckbox" className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to the terms & conditions"
            required
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          Sign Up
        </Button>

        <div className="signup d-flex mt-2">
          <span className="me-2">Already have an account?</span>
          <a href="#" className="text-decoration-none" onClick={login}>
            Login
          </a>
        </div>
      </Form>
    </div>
  );
}

export default SignupLayout;
