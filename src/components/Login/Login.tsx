import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import styles from './Login.module.css'

const provider = new GoogleAuthProvider()

type LoginProps = {
  onLogin: (userUID: string) => void
}

const Login = ({
  onLogin
}: LoginProps) => {
  const [userDisplayName, setUserDisplayName] = useState("")
  const [userUID, setUserUID] = useState("")


  const login = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken;
        const user = result.user;
        setUserDisplayName(user.displayName || "")
        setUserUID(user.uid)
        onLogin(user.uid)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  return (
    <div className={styles.container}>
      {
        !userUID && (
          <button
            className={styles.button}
            onClick={login}
          >
            Login
          </button>
        )
      }
      {
        userUID && (
          <div className={styles.welcome}>
            Welcome {userDisplayName} 😀
          </div>
        ) 
      }
    </div>
  )
}

export default Login