import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import styles from "../styles/Login.module.css";

function login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userMsg, setUserMsg] = useState("");

  const form = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const res = await fetch("http://localhost:7999/api/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const  { message, token, email } = await res.json();
      localStorage.setItem("netflix-token", token);
      localStorage.setItem('netflix-email', email);
      alert(message);
      router.push("/");
    }

    if (!res.ok) {
      setUserMsg("Please login again");
    }
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password..."
            className={styles.emailInput}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={(e) => handleSubmit(e)}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

export default login;
