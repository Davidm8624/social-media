import React from "react";
import { Message, Button } from "semantic-ui-react";

export const NoProfilePost = () => {
  return (
    <>
      <Message
        info
        icon="meh"
        header="Sorry"
        content="user hasnt posted anything yet"
      />
      <Button
        icon="long arrow alternate left"
        content="go back"
        as="a"
        href="/"
      />
    </>
  );
};

export const NoFollowData = (
  profileName,
  followersComponent = true,
  followingComponent = true
) => {
  <>
    {followersComponent && (
      <Message
        icon="user outline"
        info
        content={`${profileName.split(" ")[0]} does not have followers`}
      />
    )}
        {followingComponent && (
      <Message
        icon="user outline"
        info
        content={`${profileName.split(" ")[0]} does not follow anyone`}
      />
    )}
  </>;
};

export const NoMessages = () => {
  return (
    <Message
      info
      icon="telegram plane"
      header="sorry"
      content="you have not messaged anyone yet, search above to find a friend"
    />
  );
};

export const NoPost = () => {
  return (
    <Message
      info
      icon="meh"
      header="Hey!"
      content="no post, make sure your following someone"
    />
  );
};
