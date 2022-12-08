import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
//import { Session } from "@supabase/supabase-auth-helpers";
import React from "react";
import { Session } from "@supabase/supabase-js";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>Hello</p>
      </div>
      {session?.user ? (
        <ul className={styles.navContent}>
          <li className={styles.name}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.name}>
            <button
              className={styles.buttons}
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </button>
          </li>
          <Link href="/create">
            <button className={styles.buttons}>Add New Album</button>
          </Link>
        </ul>
      ) : (
        <ul className={styles.navContent}>
          <Link href="/login">
            <li className={styles.buttons}>Login</li>
          </Link>
          <Link href="/signup">
            <li className={styles.buttons}>Signup</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
