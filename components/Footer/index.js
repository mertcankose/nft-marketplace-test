import styles from "./style.module.css";
import { Twitter, Instagram } from "../icons/";

const Footer = ({ className, ...props }) => {
  return (
    <div className={[styles.footer, className].join(" ")} {...props}>
      {/* copyright text */}
      <p>Copyright © {new Date().getFullYear()} GOLD DUST Inc. All rights reserved.</p>
      <div className={styles.socialContainer}>
        {/* social media icons */}
        <a href="https://twitter.com/mertcankose_/" target="_blank" rel="noreferrer" className={styles.socialIconTwitter}>
          <Twitter width="20" height="20" />
        </a>
        <a href="https://www.instagram.com/mertcankse_/" target="_blank" rel="noreferrer" className={styles.socialIconInstagram}>
          <Instagram width="20" height="20" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
