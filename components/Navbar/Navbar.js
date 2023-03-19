import { useState } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

function Navbar(props) {
  const [signOut, setSignOut] = useState(false);
  let { userEmail } = props;
  const router = useRouter();

  if(userEmail === undefined || userEmail=== null){
    userEmail = "undefined user name";
  }

  const handleHomeClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleListClick = () => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleSignOut = () => {
    Cookies.remove("netflix-cookie-email");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" legacyBehavior>
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
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleHomeClick}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleListClick}>
            My List
          </li>
        </ul>
        <nav className={styles.navCotainer}>
          {!(userEmail === "") && (
            <div>
              <button className={styles.usernameBtn}>
                <p
                  className={styles.username}
                  onClick={() => setSignOut(!signOut)}
                >
                  {userEmail}
                </p>
                <Image
                  src="/static/expand_more.svg"
                  alt="Expand"
                  width={24}
                  height={24}
                  style={{ color: "White" }}
                />
              </button>
              {signOut && (
                <div className={styles.navDropdown} >
                  <div>
                    <Link href="/login" legacyBehavior onClick={handleSignOut}>
                      <a className={styles.linkName}>Sign Out</a>
                    </Link>
                    <div className={styles.lineWrapper}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
