import { Magic } from "magic-sdk";

export const createMagic = () => {

  const customNodeOptions = {
    rpcUrl: 'https://auth.magic.link', // your ethereum, polygon, or optimism mainnet/testnet rpc URL
    chainId: 137 // corresponding chainId for your rpc url
  }
  return (
    typeof window !== "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
      network: customNodeOptions, // connected to Polygon Mainnet!
    })
  )
};

export const magic = createMagic();

console.log("magic", magic);
