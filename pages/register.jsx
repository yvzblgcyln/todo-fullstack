import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";

function Register() {
  const [input, setInput] = useState({});
  const [status, setStatus] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(input),
    })
      .then((res) => setStatus(res.status))
      //.then(() => setInput({ email: "", username: "", password: "" }))
      .then(() => status === 200 && router.push("/login"));
  };

  return (
    <div className="_login">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="Email">Email</Label>
          <Input name="email" placeholder="Email" type="email" value={input.email} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={input.username}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Password">Password</Label>
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <Link href="/login">Login</Link>
      <Link href="/">Home</Link>
      {status !== 200 && status !== 0 && <div style={{ color: "red" }}>Username or email is already taken</div>}
    </div>
  );
}

export default Register;
