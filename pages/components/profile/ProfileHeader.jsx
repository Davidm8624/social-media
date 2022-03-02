import React, { useState } from "react";
import {
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Button,
  List,
  GridRow,
} from "semantic-ui-react";
import { followUser, unfollowUser } from "../../util/profileActions";

const ProfileHeader = ({
  profile,
  ownAccount,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
}) => {
  const [loading, setLoading] = useState(false);
  const isFollowing = loggedUserFollowStats.following.some(
    (eachUser) => eachUser.user === profile.user._id
  );

  return (
    <>
      <Segment>
        <Grid stackable>
          <Grid.Column width={11}>
            <Grid.Row>
              <Header as='h2' content={profile.user.name} style = {{marginBottom : '5px'}}/>
            </Grid.Row>
            <GridRow stretched>
              {profile.bio}
              <Divider hidden/>
            </GridRow>
            <Grid.Row>
              {profile.social ? (
                <></>
              ):(<p>no social media links</p>)}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
};

export default ProfileHeader;
