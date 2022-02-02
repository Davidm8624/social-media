import React from 'react';
import {Message, Button} from 'semantic-ui-react'


export const NoProfilePost = () => {
  return <>
  <Message info icon='meh' header="Sorry" content="user hasnt posted anything yet"/>
  <Button icon="long arrow alternate left" content="go back" as="a" href="/"/>
  </>;
};

export const NoFollowData = () => {

}

export const noMessages = () => {
  return <Message info icon='telegram plane' header="sorry" content='you have not messaged anyone yet, search above to find a friend'/>
}

export const noPost = () => {
  return <Message info icon='meh' header="Hey!" content='no post, make sure your following someone' />
}