/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { nftMarketplaceAddress } from "../config";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

// ipfs configs
let infuraIpfsProjectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
let infuraIpfsSecretKey = process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET_KEY;

const auth = "Basic " + Buffer.from(infuraIpfsProjectId + ":" + infuraIpfsSecretKey).toString("base64");

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const CreateSellNft = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
  const router = useRouter();

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const uploadToIPFS = async () => {
    const { name, description, price } = formInput;

    /* first, upload to IPFS */

    try {
      const addedFile = await client.add(file, { progress: (prog) => console.log(`received: ${prog}`) });
      const fileUrl = `https://infura-ipfs.io/ipfs/${addedFile.path}`;

      if (!name || !description || !price || !fileUrl) return;

      const data = JSON.stringify({
        name,
        description,
        image: fileUrl,
      });

      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  // for creating the sale or listing the item for sale
  const listNFTForSale = async () => {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(nftMarketplaceAddress, NFTMarketplace.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    let transaction = await contract.createToken(url, price, { value: listingPrice });
    await transaction.wait();

    router.push("/");
  };
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input type="file" name="Asset" className="my-4" onChange={onChangeFile} />
        {filePreview && <img className="rounded mt-4" width="350" src={filePreview} alt="nft" />}
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-yellow-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  );
};

export default CreateSellNft;
