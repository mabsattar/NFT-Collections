'use client';

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import  Web3Modal  from "web3modal";
import  { providers, Contract } from "ethers";
import styles from './page.module.css';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "@/constants/Index";


export default function Home() {
  const [isOwner, setIsOwner] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [preSaleEnded, setPresaleEnded] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getOwner = async () => {
    try {
      const signer = await getProviderOrSigner();

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);

      const owner = nftContract.owner();
      const userAddress = signer.getAddress();

      if (owner.toLowerCase() === userAddress.ToLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);

      const txn = await nftContract.StartPresale();
      await txn.wait();

      setPresaleStarted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner();
    
      //Get an instance of your NFT Contract
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS, 
        NFT_CONTRACT_ABI,
        provider
      );

      // this will return a BigNumber because presaleEnded is a uint 256
      // this will return a timestamp in seconds

      const presaleEndTime = await nftContract.presaleEnded();
      const currentTimeinSeconds = Data.now() / 1000;
      const hasPresaleEnded = presaleEndTime.lt(
        math.floor(currentTimeinSeconds)
      );

      
      setPresaleEnded(hasPresaleEnded);
    } catch (error) {
      console.error(error);
      
    }
  };

  const checkIfPresaleStarted = async () => {
    try {
      
      const provider = await getProviderOrSigner();

      // get an instance of your NFT Contract
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
