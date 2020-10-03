import React, { useState } from 'react'
import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: 'c699ca69-5eae-433f-9fcd-f7765f2132e7',
    redirectUri: 'http://localhost:3000'
  }
};

const loginRequest = {
  scopes: ["User.Read"]
};

const tokenRequest = {
  scopes: ["User.Read"]
}

const msalInstance = new msal.PublicClientApplication(msalConfig);

const LoginButton = ({ loggedIn, setLoggedIn }) => {

  async function handleClick() {
    try {
      const result = await msalInstance.loginPopup(loginRequest)
      setLoggedIn(true)
      window.sessionStorage.setItem("id_token", result.idToken)
    } catch (e) {
      console.error(e)
      alert("oops")
    }

  }

  if (loggedIn) {
    return <button>Logout</button>
  }

  return (
    <button onClick={handleClick}>Login</button>
  )
}

export default LoginButton