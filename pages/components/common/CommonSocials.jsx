import React from "react";
import { Divider, Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

const CommonSocials = ({
  user: { facebook, instagram, youtube, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <Button
        content="Add social links"
        color="orange"
        icon="at"
        type="button"
        onClick={() => setShowSocialLinks(!showSocialLinks)}
      />
      {showSocialLinks && (
        <>
          <Divider />
          <Message
            icon="attention"
            info
            size="small"
            header="Social Media Links Are Optional!!!!"
          />
          <Form.Input
            icon="facebook f"
            iconPosition="left"
            placeHolder="facebook"
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
                    <Form.Input
            icon="twitter"
            iconPosition="left"
            placeHolder="twitter"
            name="twitter"
            value={twitter}
            onChange={handleChange}
          />
                    <Form.Input
            icon="youtube"
            iconPosition="left"
            placeHolder="youtube"
            name="youtube"
            value={youtube}
            onChange={handleChange}
          />
                    <Form.Input
            icon="instagram"
            iconPosition="left"
            placeHolder="instagram"
            name="instagram"
            value={instagram}
            onChange={instagram}
          />
        </>
      )}
    </>
  );
};

export default CommonSocials;
