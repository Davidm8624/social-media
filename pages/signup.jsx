import { useState, useRef, useEffect } from "react";
import { Container, Divider, Form, Segment, TextArea, Button, } from "semantic-ui-react";
import { HeaderMessage, FooterMessage } from "../components/common/Message";
import CommonSocials from "../components/common/CommonSocials";

const signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;
  const { name, email, password, bio } = user; //destructures so we dont have to use user.name etc
  //form states:
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitDisabled, setSumbitDisabled] = useState(true);
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userNameLoading, setUsernameLoading] = useState(false);
  const [userNameAvaiable, setUserNameAvaiable] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSocialLinks, setShowSocialLinks] = useState(false)

  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    // const isUser = Object.values({name, email, password}).every(
    //   (item) => {
    //     Boolean(item)
    //   }
    // )

    setSumbitDisabled(!( name && email && password && userName)) //
  }, [user, userName])

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMessage !== null}
        onSubmit={handleSubmit}
      >
        <Segment>
          <Form.Input
            required
            label="Name"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
            icon="user"
            iconPosition="left"
          />
          <Form.Input
            required
            label="Email"
            placeholder="email"
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
          <Form.Input
            Loading={userNameLoading}
            error={!userNameAvaiable}
            required
            Label="username"
            placeholder="Username"
            value={userName}
            icon={userNameAvaiable ? "check" : "close"}
            // color={userNameAvaiable ? green : red}
            iconPosition="left"
            onChange={(e) => {
              setUserName(e.target.value);
              const test = userNameRegex.test(e.target.value)
              if(test || userNameRegex.test(e.target.value)){
                setUserNameAvaiable(true)
              }else{
                setUserNameAvaiable(false)
              }
            }}
          />
          <Divider></Divider>
          <Form.Field
          control={TextArea}
          name="bio"
          value={bio}
          onChange={handleChange}
          placeholder="bio (optional)"
          />
          <CommonSocials
          user={user} handleChange={handleChange} showSocialLinks={showSocialLinks} setShowSocialLinks={setShowSocialLinks}
          />
          <Button 
          icon="signup"
          content = "Sign Up"
          type = "submit"
          color = "green"
          disabled = {submitDisabled || !userNameAvaiable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};
export default signup;
