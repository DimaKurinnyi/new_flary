import { PublicKey } from '@solana/web3.js';
import IDL from './IDL.json';
import { Buffer } from 'buffer';
import { Program } from "@coral-xyz/anchor";
window.Buffer = Buffer;

const flaryTokenSaleAddress = new PublicKey("2EBs8GKZGfrnQSdhQfHmxa1Mik2UgGXRV6kRjS4h8G8T");

//@ts-ignore
export const getSolanaBoughtTokensFromContract = async (publicKey, connection) => {

    //@ts-ignore
    const saleProgram = new Program(IDL, { connection });

    const [userSaleStateAddress] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_sale_state"),
            publicKey.toBuffer()
        ],
        flaryTokenSaleAddress,
    );

    //@ts-ignore
    const userSaleStateInitial = await saleProgram.account.userSaleState.fetch(userSaleStateAddress);

    return userSaleStateInitial.tokenAmount.toNumber() / 10 ** 9;
};