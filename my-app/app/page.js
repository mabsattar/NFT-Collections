"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { ethers }  from "ethers";
import styles from './page.module.css';


export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    await getProviderOrSigner();
    setWalletConnected(true);
  };


  const getProviderOrSigner = async (needSigner = false) => {
    // we need to gain accecss to the provider/signer from Metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.BrowserProvider(provider);

    //if the user is not connected to Goerly, ask them to switch to Sepolia
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 11155111) {
      window.alert("Please switch to Sepolia network");
      throw new Error("Incorrect network");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };
  


  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Sepolia",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, []);

  


  return (

    <div>
      <Head>
        <title> Crypto Devs NFT </title>
      </Head>

      <div className={styles.main}>
        {walletConnected ? null : (       
         <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
         </button>
        )}        
      </div>
    </div>

  );  
  
}
