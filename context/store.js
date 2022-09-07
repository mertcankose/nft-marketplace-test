import React, { createContext, useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { Contract, ethers, utils, constants } from "ethers";
import { successNotify, warningNotify, errorNotify } from "../helpers/notify";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [isBsc, setIsBsc] = useState(null);

  useEffect(() => {
    if (window.localStorage) {
      setConnected(JSON.parse(localStorage.getItem("wallet_connect")));
    }
  }, []);

  useEffect(() => {
    initWeb3Modal();
    if (connected) {
      handleConnect();
    }
  }, [setWeb3Modal, web3Modal]);

  const initWeb3Modal = async () => {
    try {
      if (!web3Modal) {
        const providerOptions = {
          metamask: {
            id: "injected",
            name: "MetaMask",
            type: "injected",
            check: "isMetaMask",
          },
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              rpc: {
                56: "https://bsc-dataseed.binance.org/",
              },
              network: "binance",
              qrcodeModalOptions: {
                mobileLinks: ["metamask", "trust"],
              },
            },
          },
        };

        const web3Modal = new Web3Modal({
          network: "binance",
          cacheProvider: true,
          providerOptions,
          theme: "light",
        });

        setWeb3Modal(web3Modal);
      }
    } catch (error) {
      console.log("init web3 modal error: ", error);
    }
  };

  const switchNetwork = async (newChainId) => {
    if (currentProvider) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: newChainId }],
        });
      } catch (switchError) {
        errorNotify("There was an error switching networks");
      }
    }
  };

  useEffect(() => {
    if (chainId) {
      if (chainId === "0x38") {
        setIsBsc(true);
      } else {
        setIsBsc(false);
      }
    }
  }, [chainId]);

  const handleConnect = async () => {
    const provider = await web3Modal?.connect();

    if (provider) {
      const newWeb3 = new ethers.providers.Web3Provider(provider);
      const accounts = await newWeb3.listAccounts();
      const balance = await newWeb3.getBalance(accounts[0]);

      setWalletBalance(ethers.utils.formatEther(balance));
      setWalletAddress(accounts[0]);
      setWallet(newWeb3.getSigner());
      setConnected(true);

      if (newWeb3.provider.chainId === 56) {
        setChainId("0x38");
      } else {
        setChainId(newWeb3.provider.chainId);
      }

      setCurrentProvider(provider);

      if (window.localStorage) {
        window.localStorage.setItem("wallet_connect", true);
      }

      provider.on("accountsChanged", (newAccounts) => {
        if (Array.isArray(newAccounts) && newAccounts.length) {
          setWalletAddress(newAccounts[0]);
        }
      });

      provider.on("chainChanged", (chainId, oldChainId) => {
        setChainId(chainId);
      });

      provider.on("disconnect", (error) => {
        handleDisconnect();
        console.log(error);
      });
    } else {
      await handleDisconnect();
    }
  };

  const handleDisconnect = async () => {
    setConnected(false);
    setWalletAddress(null);
    setWallet(null);
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    if (window.localStorage) {
      window.localStorage.setItem("wallet_connect", false);
    }

    if (window) {
      window.location.reload();
    }
  };

  return (
    <StoreContext.Provider
      value={{
        web3Modal,
        connected,
        walletAddress,
        wallet,
        walletBalance,
        chainId,
        currentProvider,
        handleConnect,
        handleDisconnect,
        isBsc,
        switchNetwork,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
