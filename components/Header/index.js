import Link from "next/link";
import { useContext } from "react";
import { PAGES } from "../../constants";
import { Disconnect } from "../icons/";
import StoreContext from "../../context/store";
import styles from "./style.module.css";

const Header = () => {
  const { handleConnect, handleDisconnect, walletAddress, connected } = useContext(StoreContext);

  return (
    <nav className="border-b p-6 flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <p className="text-4xl font-bold">GOLD DUST</p>
        <div className="flex gap-6 mt-4">
          {PAGES.map((page) => (
            <Link href={page.path} key={page.path}>
              <a className="text-yellow-500">{page.name}</a>
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-auto">
        {connected ? (
          <div className={[styles.dropdown].join(" ")}>
            <button className={styles.connectWalletButton}>
              {walletAddress?.slice(0, 6)}...
              {walletAddress?.slice(-4)}
            </button>
            <div className={[styles.dropdownContent].join(" ")}>
              <button className={styles.dropdownContentItem} onClick={handleDisconnect}>
                <p>Disconnect</p>
                <Disconnect width="20" height="20" color="inherit" />
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.connectWalletButton} onClick={handleConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
