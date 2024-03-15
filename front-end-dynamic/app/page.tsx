// import { DynamicWidget } from "../lib/dynamic";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <DynamicWidget />
//       </div>
//     </main>
//   );
// }
"use client"
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const { primaryWallet } = useDynamicContext();

  const signMessage = async (primaryWallet: any) => {
    if (!primaryWallet) return null;
    else {
      console.log(primaryWallet.address);
    }

    const signer = await primaryWallet.connector.getSigner();

    return signer ? await signer.signMessage("example") : null;
  };

  return (
    <div>
      <DynamicWidget />
      <button onClick={() => signMessage(primaryWallet)}>Sign Message</button>
    </div>
  );
};

export default Main;