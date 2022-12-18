import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { signOut } from '../lib/api/auth';

const BookAppBar = () => {
  const {isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const navigation = useNavigate()

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigation("/signin")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButton = () => {
    if (isSignedIn) {
      return (
        <>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            {currentUser?.email}
          </Typography>
          <Button
            color="inherit"
            onClick={handleSignOut}
          >
            ログアウト
          </Button> 
        </>
      )
    } else {
      return (
        <>
          <Button
            href="/signin"
            color="inherit"
          >
            ログイン
          </Button>
          <Button
            href="/signup"
            color="inherit"
          >
            ユーザー登録
          </Button>
        </>
      )
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_TITLE}
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BookAppBar