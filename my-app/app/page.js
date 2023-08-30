'use client';

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import  Web3Modal  from "web3modal";
import  { providers, Contract } from "ethers";
import styles from './page.module.css';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "@/constants/Index";


export default function Home() {
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const startPresale = async () => {
    try {
      
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfPresaleStarted = async () => {
    try {
      
      const provider = await getProviderOrSigner();

      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS, 
        NFT_CONTRACT_ABI,
        provider
      );

      const isPresaleStarted = await nftContract.presaleStarted();
      setPresaleStarted(isPresaleStarted);
    } catch (error) {
      console.error(error)      
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };


  const getProviderOrSigner = async (needSigner = false) => {
    // we need to gain accecss to the provider/signer from Metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    //if the user is not connected to Sepolia, ask them to switch to Sepolia
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
