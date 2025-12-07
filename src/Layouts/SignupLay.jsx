import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function SignupLayout() {
  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const getRoleFromEmail = (email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    const domainRoleMap = {
      "organizer.com": "organizer",
      "admin.com": "admin",
      "superadmin.com": "superadmin",
    };
    return domainRoleMap[domain] || "user";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setValidated(true);

    if (!form.checkValidity()) return;

    if (!passwordRegex.test(password)) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find((u) => u.email === email);
    if (exist) {
      alert("Email already exists! Please login");
      navigate("/");
      return;
    }

    const userRole = getRoleFromEmail(email);

    const newUser = {
      id: Math.floor(Math.random() * 1000000000),
      name: fullName,
      email,
      phone,
      password,
      role: userRole,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Account created successfully 🎉 Your role: ${userRole}. Please login now!`);
    navigate("/");
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="validationCustomFullName" className="mb-3">
        <Form.Label>Full Name :</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your full name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustomEmail" className="mb-3">
        <Form.Label>Email :</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Use @organizer.com, @admin.com, or @superadmin.com for special roles
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="validationCustomPhone" className="mb-3">
        <Form.Label>Phone Number :</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="^[0-9+ ]{7,15}$"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid phone number (7–15 digits).
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustomPassword" className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={validated && !passwordRegex.test(password)}
        />
        <Form.Control.Feedback type="invalid">
          Contains at least one uppercase letter (A–Z), one number (0–9), one special character (!@#$% etc) and is at least 8 characters long.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustomConfirm" className="mb-3">
        <Form.Label>Confirm Password :</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={validated && password !== confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          Passwords do not match.
        </Form.Control.Feedback>
      </Form.Group>

      <button type="submit" className="w-100">
        Sign Up
      </button>

      <div className="signup d-flex mt-3">
        <span className="me-2">Already have an account?</span>
        <a href="#" className="text-decoration-none" onClick={() => navigate("/")}>
          Login
        </a>
      </div>
    </Form>
  );
}

export default SignupLayout;
