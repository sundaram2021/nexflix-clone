import  { useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useRouter } from 'next/router'


function register() {
    const router = useRouter()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [userMsg, setUserMsg] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const form = {
        email : email,
        password: password
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // setValidEmail(emailRegex.test(email));

        if(email.includes("@")){
            setValidEmail(true)
        } else {
            setValidEmail(false);
        }

        const res = await fetch("http://localhost:7999/api/register", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!res.ok){
            alert("You are registered successfully");
            router.push("/login");
        }
        
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Registration</title>
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
          <h1 className={styles.signinHeader}>Register</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password..."
            className={styles.emailInput}
            onChange={e => setPassword(e.target.value)}
          />
          <p className={styles.userMsg}>{ !validEmail ? "Enter a valid email" : "" } </p>
          <button  className={styles.loginBtn} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </div>
      </main>
    </div>
  );
}

export default register;
