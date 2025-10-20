import axios from "axios";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const endPoint = "/api/login";
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      try {
        const response = await axios.post(endPoint, formData, {
          headers: {
            name: "Yara",
          },
        });
        localStorage.setItem("name", response.data?.user?.name);
        localStorage.setItem("email", response.data?.user?.email);
        localStorage.setItem("id", response.data?.user?.id);
        localStorage.setItem("role", response.data?.user?.role);
        localStorage.setItem("token", response.data?.token);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }

    setValidated(true);
  };

  return (
    <div className="log-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01" className="mb-4">
          <Form.Label>email</Form.Label>
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
          <Form.Label>Password</Form.Label>
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
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LogLayout;
