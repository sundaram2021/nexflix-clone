import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import { magic } from  '../components/lib/magic';


function login() {
  const router = useRouter();
  const [userMsg, setUserMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("btn clicked");
    if (userEmail) {
      // router.push("/");
      //  log in a user by their email
      if(userEmail === "jhasundarm@gmail.com"){
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email : userEmail,
          });
          console.log({ didToken });
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
        }
      } else {
        setUserMsg("Something went wrong in logging in")
      }
    } else {
      setUserMsg("Enter a valid Email address");
    }
  };

  const handleEmailChange = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setUserEmail(email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}></div>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix Logo"
              width={128}
              height={34}
            />
          </div>
        </a>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>SignIn</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleEmailChange}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLogin} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

export default login;
