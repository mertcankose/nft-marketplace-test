import React from "react";
import Footer from "../footer";
import Header from "../header";
import styles from "./style.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />

      <main className={styles.main}>{children}</main>

      {/* <Footer className={styles.footer} /> */}
    </div>
  );
};

export default Layout;
