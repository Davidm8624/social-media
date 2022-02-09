// import React from 'react';
// import { Container } from "semantic-ui-react";
import { HeaderMessage, FooterMessage } from "./components/common/Message";
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Divider,
  Form,
  Segment,
  TextArea,
  Button,
  Message,
  formLoading,
} from "semantic-ui-react";
import catchErrors from "./util/catchErrors";
import axios from "axios";
import { setToken } from "./util/auth";
import Cookies from "js-cookie";

const login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorMsg("somthing went wrong");

    setFormLoading(true)

    try {
      const res = await axios.post('/api/v1/user/login', {user})
      setToken(res.data)
    } catch (error) {
      console.log(error);
      const errorMsg = catchErrors(error)
      setErrorMsg(errorMsg)
    }

    setFormLoading(false)
  };

  useEffect(() => {
    setSubmitDisabled(!(email && password));
  }, [user]);

  useEffect(() => {
    document.title = 'welcome back!'
    const userEmail = Cookies.get('userEmaill')
    if(userEmail) setUser((prev) => ({...prev, email: userEmail}))
  }, [])

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="oops"
          // content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <Form.Input
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            icon="envelope"
            iconPosition="left"
            type="email"
          />
          <Form.Input
            required
            label="Password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
            icon={
              showPassword
                ? {
                    name: "eye slash",
                    circular: true,
                    link: true,
                    onClick: () => setShowPassword(!showPassword),
                  }
                : {
                    name: "eye",
                    circular: true,
                    link: true,
                    onClick: () => setShowPassword(!showPassword),
                  }
            }
            iconPosition="left"
            type={showPassword ? "text" : "password"}
          />
          <Divider hidden />
          <Button icon="signup" content="Login" type="submit" disabled={submitDisabled} color="green" />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default login;
