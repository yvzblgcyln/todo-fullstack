import { setUserName } from "@/redux/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";

function Login() {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) =>
        data.status === 200 ? dispatch(setUserName(data.user)) && router.push("/") : setMessage(data.message)
      );
  };
  return (
    <div className="_login">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="Username">Username</Label>
          <Input id="Username" name="username" placeholder="Username" type="text" onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Password">Password</Label>
          <Input
            id="Password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <Link href="/register">Register</Link>
      <Link href="/">Home</Link>
      <div style={{ color: "red" }}>{message}</div>
    </div>
  );
}

export default Login;
