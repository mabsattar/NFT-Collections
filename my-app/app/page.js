"use client";

import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import ethers from "ethers";
import styles from './page.module.css'


'useClient';

export default function Home() {
  const [walletconnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {

  };


  const getProviderOrSigner = async (needSigner = false) => {
    // we need to gain accecss to the provider/signer from Metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.web3Provider(provider);

    //if the user is not connected to Goerly, ask them to switch to Goerli
    const { chainID } = await web3Provider.getNetwork();
    if (chainId !==5) {
      window.alert("Please switch to Goerli network")
      throw new Error("incorrect network");
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
        network: "Goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, []);

  


  return (

    <div>
      <head>
        <title> Crypto Devs NFT </title>
      </head>

      <div className={styles.main}>
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
      </div>
    </div>

  ); 
    
   

  
  
  
}
