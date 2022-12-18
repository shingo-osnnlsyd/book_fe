import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material"
import Cookies from "js-cookie"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import { SignUpParams } from "../../interfaces/SignUpParams"
import { signUp } from "../../lib/api/auth"

const SignUp = () => {
  const navigation = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name,
      email,
      password,
      passwordConfirmation
    }

    try {
      const res = await signUp(params)

      if (res.status === 200) {
        const accessToken = res.headers["access-token"]
        const client = res.headers["client"]
        const uid = res.headers["uid"]
        if (accessToken && client && uid) {
          Cookies.set("_access_token", accessToken)
          Cookies.set("_client", client)
          Cookies.set("_uid", uid)
          setIsSignedIn(true)
          setCurrentUser(res.data.data)
  
          navigation("/")
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader title="Sign Up" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              onClick={handleSubmit}
            >
              ユーザー登録
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default SignUp