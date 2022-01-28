import {useRouter} from 'next/router';
import Link from 'next/link'
import {Menu, Container, Icon} from  'semantic-ui-react'

const Navbar = () => {
  const router = useRouter
  const isActive = (route) => router.pathname === route
  return (<Menu borderless fluid>
    <Container text>
      <Link href='/login'>
        <Menu.Item header active = {isActive('/login')}>
          <Icon name="sign-in" size = 'large'/>
          login
        </Menu.Item>  
      </Link>
      <Link href='/signup'>
        <Menu.Item header active = {isActive('/signup')}>
          <Icon name="signup" size = 'large'/>
          signup
        </Menu.Item>
      </Link>
    </Container>
  </Menu>);
};

export default Navbar;
