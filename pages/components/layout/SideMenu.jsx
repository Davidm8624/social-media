import { useRouter } from "next/router";
import { List, Icon, Divider } from "semantic-ui-react";
import Link from "next/link";
import { logoutUser } from "../../util/auth";

const SideMenu = ({
  user: { email, unreadNotification, unreadMessage, username },
}) => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  return (
    <>
      <List
        // style={{ marginTop: "1rem" }}
        size="big"
        verticalAlign="middle"
        selection
      >
        <Link href="/">
          <List.Item active={isActive("/")}>
            {/* the reason that we set it to udefined is so that it wont break our because an enum needs somthing there, so udefined lets us keep it blank */}
            <Icon
              name="home"
              size="large"
              color={isActive("/") ? "green" : undefined}
            />
            <List.Content>
              <List.Header content="Home" />
            </List.Content>
          </List.Item>
        </Link>
        <Divider hidden />
        <Link href="/messages">
          <List.Item active={isActive("/messages")}>
            {/* the reason that we set it to udefined is so that it wont break our because an enum needs somthing there, so udefined lets us keep it blank */}
            <Icon
              name={unreadMessage ? "hand point right" : "mail outline"}
              size="large"
              color={
                isActive("/messages")
                  ? "green"
                  : unreadMessage
                  ? "orange"
                  : undefined
              }
            />
            <List.Content>
              <List.Header content="Messages" />
            </List.Content>
          </List.Item>
        </Link>
        <Divider hidden />
        <Link href="/notifications">
          <List.Item active={isActive("/notifications")}>
            {/* the reason that we set it to udefined is so that it wont break our because an enum needs somthing there, so udefined lets us keep it blank */}
            <Icon
              name={unreadNotification ? "hand point right" : "bell outline"}
              size="large"
              color={
                isActive("/notifications")
                  ? "green"
                  : unreadNotification
                  ? "orange"
                  : undefined
              }
            />
            <List.Content>
              <List.Header content="Notifications" />
            </List.Content>
          </List.Item>
        </Link>
        <Divider hidden />
        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            {/* the reason that we set it to udefined is so that it wont break our because an enum needs somthing there, so udefined lets us keep it blank */}
            <Icon
              name="user"
              size="large"
              color={router.query.username === username ? "green" : undefined}
            />
            <List.Content>
              <List.Header content="Profile" />
            </List.Content>
          </List.Item>
        </Link>
        <Divider hidden />
        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>
            <List.Header content="Logout" />
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default SideMenu;
