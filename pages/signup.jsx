import { useState, useRef, useEffect } from "react";
import {
  Container,
  Divider,
  Form,
  Segment,
  TextArea,
  Button,
} from "semantic-ui-react";
import { HeaderMessage, FooterMessage } from "./components/common/Message";
import CommonSocials from "./components/common/CommonSocials";
import DragNDrop from "./components/common/DragNDrop";
import axios from "axios";
let cancel;

const signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    youtube: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });
  const { name, email, password, bio } = user; //destructures so we dont have to use user.name etc
  //form states:
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitDisabled, setSumbitDisabled] = useState(true);
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [userNameAvaiable, setUserNameAvaiable] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [highLighted, setHighLighted] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicURL;
    if (media !== null) {
    }

    setFormLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkUsername = async () => {
    const cancelToken = axios.CancelToken;

    setUserNameLoading(true);
    try {
      cancel && cancel();
      const res = await axios.get(`/api/v1/signup/${userName}`, {
        cancelToken: new cancelToken((canceler) => {
          cancel = canceler;
        }),
      });
      if (res.data === "Available") {
        setUserNameAvaiable(true);
        setUser((prev) => ({ ...(prev / userName) }));
      }
    } catch (error) {
      setErrorMessage("username is not aviable");
    }
    setUserNameLoading(false);
  };

  useEffect(() => {
    setSumbitDisabled(!(name && email && password && userName)); //
  }, [user, userName]);

  useEffect(() => {
    userName === "" ? setUserNameAvaiable(false) : checkUsername();
  }, [userName]);

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMessage !== null}
        onSubmit={handleSubmit}
      >
        <Segment>
          {/* drag and drop here */}
          <DragNDrop
            inputRef={inputRef}
            handleChange={handleChange}
            media={media}
            setMedia={setMedia}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            highLighted={highLighted}
            setHighLighted={setHighLighted}
          />
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
            loading={userNameLoading}
            error={!userNameAvaiable}
            required
            label="username"
            placeholder="Username"
            value={userName}
            icon={userNameAvaiable ? "check" : "close"}
            // color={userNameAvaiable ? green : red}
            iconPosition="left"
            onChange={(e) => {
              setUserName(e.target.value);
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
            user={user}
            handleChange={handleChange}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
          />
          <Button
            icon="signup"
            content="Sign Up"
            type="submit"
            color="green"
            disabled={submitDisabled || !userNameAvaiable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};
export default signup;
