import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.cTA}>
          <img
            className={styles.logo1}
            src={window.location.origin + "/images/cta-logo-one (1).svg"}
            alt="Disney logo"
          />
          <a href="" className={styles.signup} >GET ALL THERE</a>
          <p className={styles.text}>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </p>
          <img
            className={styles.logo2}
            src={window.location.origin + "/images/cta-logo-two.png"}
            alt="img 2"
          />
        </div>
        <img
          className={styles.bgImage}
          src={window.location.origin + "/images/login-background.jpg"}
          alt="Disney Background"
        />
      </div>
    </section>
  );
};

export default Login;
