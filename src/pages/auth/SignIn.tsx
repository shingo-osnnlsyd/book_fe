import Cookies from "js-cookie"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material"
import { AuthContext } from "../../App"
import { SignInParams } from "../../interfaces/SignInParams"
import { signIn } from "../../lib/api/auth"

const SignIn = () => {
  const navigation = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)

      if (res.status === 200) {
        const accessToken = res.headers["access-token"]
        const client = res.headers["client"]
        const uid = res.headers["uid"]

        if (accessToken && client && uid) {
          Cookies.set("_access_token", accessToken)
          Cookies.set("_client", client)
          Cookies.set("_uid", uid)
        }
        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigation("/ballance")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader title="Sign In" />
          <CardContent>
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
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              disabled={!email || !password ? true : false}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default SignIn