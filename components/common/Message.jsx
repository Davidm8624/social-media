import { Message, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const isSignup = router.pathname === "/signup";
  const [hideMessage, setHideMessage] = useState(false);
  return (
    <Message
      // hidden={hideMessage}
      // onDismiss={() => {                         lets you dismiss the message
      //   setHideMessage(true)
      // }}
      color="green"
      icon={isSignup ? "settings" : "privacy"}
      header={isSignup ? "get started here" : "welcome back"}
      content={
        isSignup ? "create new account" : "login with email and password"
      }
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const isSignup = router.pathname === "/signup";
  return (
    <>
      {isSignup ? (
        <>
          <Message warning>
            <Icon name="help" />
            Existing user ? <Link href="/login">login here!</Link>
          </Message>
        </>
      ) : (
        <>
          <Message attached="top" warning>
            <Icon name="lock" />
            <Link href="/reset">forgot password?</Link>
          </Message>
          <Message attached="bottom" warning>
            <Icon name="help" />
            new user ? <Link href="/signup">signup here!</Link>
          </Message>
        </>
      )}
    </>
  );
};
