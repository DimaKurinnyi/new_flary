import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import IDL from './solana/IDL.json';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import style from './BuyWindow.module.scss';
import { BN, Program } from "@coral-xyz/anchor";
import { TOKEN_SOL } from './constants';
import { config } from '../../config';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet as useWalletSolana } from '@solana/wallet-adapter-react';
import { useBuy } from './BuyContext';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { MakeAPurchaseButton } from './BuyButton';
import { useWalletConnectButton} from '@solana/wallet-adapter-base-ui';

import isMobile from 'is-mobile';

const {
    SOL_USDC_ADDRESS,
    TOKEN_PROGRAM,
    SOL_PROGRAM_PUBLIC_KEY
} = config;

const flaryTokenSaleAddress = new PublicKey(SOL_PROGRAM_PUBLIC_KEY);
const USDC_MINT_ADDRESS = new PublicKey(SOL_USDC_ADDRESS);

export const BuyButtonSolana = ({
    //@ts-ignore
    updateTokenHoldings
}) => {
    const { connected: isSolanaConnected } = useWalletSolana();

    return (
        (isSolanaConnected ? <ProcessPaymentButtonSolana updateTokenHoldings={updateTokenHoldings} /> : (isMobile() ? <ConnectSolanaButtonMob/> :<ConnectSolanaButton/>))
    );
};

const ConnectSolanaButtonMob = () => {
    // const { setVisible } = useWalletModal();
    const { onButtonClick: onWalletConnect } = useWalletConnectButton()

    return (
        <div
            className={style.pay_button}
            
            onClick={onWalletConnect}>
            Connect Solana Wallet To Buy FLFI
        </div>
    )
};
const ConnectSolanaButton = () => {
    const { setVisible } = useWalletModal();
    

    return (
        <div
            className={style.pay_button}
            
            onClick={() => setVisible(true)}>
            Connect Solana Wallet To Buy FLFI
        </div>
    )
};

const ProcessPaymentButtonSolana = ({
    //@ts-ignore
    updateTokenHoldings
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const { token, tokensFromAmount, setLoading, tokensToAmount, setErrorTransaction, setSuccessful } = useBuy();

    const buyTokensWithSolana = async () => {
        try {
            setLoading(true);

            const transaction = await getBuyWithSolanaTransaction(publicKey, connection, Number(tokensFromAmount));
            const signature = await sendTransaction(transaction, connection);

            //@ts-ignore
            const confirmation = await connection.confirmTransaction(signature, {
                commitment: 'confirmed',

            });

            if (confirmation.value.err) {
                setErrorTransaction(true);
            } else {
                try {
                    await fetch("https://back.flary.finance/api/user/boughtTokens", {
                        method: "POST",
                        body: JSON.stringify({ address: publicKey?.toBase58(), amount: Number(tokensToAmount), chsin: "sol" })
                    });
                } catch { }

                await updateTokenHoldings();
                setSuccessful(true);
            }
        } catch (error) {
            setErrorTransaction(true);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const buyTokensWithUsdc = async () => {
        try {
            setLoading(true);

            const transaction = await getBuyWithUsdcTransaction(publicKey, connection, Number(tokensFromAmount));
            const signature = await sendTransaction(transaction, connection);

            //@ts-ignore
            const confirmation = await connection.confirmTransaction(signature, {
                commitment: 'confirmed',
            });

            if (confirmation.value.err) {
                setErrorTransaction(true);
            } else {
                try {
                    await fetch("https://back.flary.finance/api/user/boughtTokens", {
                        method: "POST",
                        body: JSON.stringify({ address: publicKey?.toBase58(), amount: Number(tokensToAmount), chain: "sol" })
                    });
                } catch { }

                await updateTokenHoldings();
                setSuccessful(true);
            }
        } catch (error) {
            setErrorTransaction(true);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MakeAPurchaseButton onClick={() => (token === TOKEN_SOL ? buyTokensWithSolana : buyTokensWithUsdc)()} />
    )
}

//@ts-ignore
const getBuyWithSolanaTransaction = async (publicKey, connection, amount) => {
    //@ts-ignore
    const saleProgram = new Program(IDL, { connection });

    const solanaAmountBn = new BN(amount * LAMPORTS_PER_SOL);

    const [userSaleState] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_sale_state"),
            publicKey.toBuffer()
        ],
        flaryTokenSaleAddress,
    );

    const [saleWallet] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("sale_wallet")
        ],
        flaryTokenSaleAddress,
    );

    const [sale] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("sale")
        ],
        flaryTokenSaleAddress,
    );

    const instruction = await saleProgram
        .methods
        .buyTokensSol(solanaAmountBn)
        .accounts({
            user: publicKey,
            systemProgram: SystemProgram.programId,
            userSaleState,
            saleWallet,
            sale
        })
        .instruction();

    const blockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
        feePayer: publicKey,
        ...blockhash
    }).add(instruction);

    return transaction;
};

//@ts-ignore
const getBuyWithUsdcTransaction = async (publicKey, connection, amount) => {
    //@ts-ignore
    const saleProgram = new Program(IDL, { connection });

    const amountBn = new BN(amount * 10 ** 6);

    const usdcAddress = await getAssociatedTokenAddress(
        USDC_MINT_ADDRESS,
        publicKey,
        false,
        TOKEN_PROGRAM
    );

    const instruction = await saleProgram
        .methods
        .buyTokensUsdt(amountBn)
        .accounts({
            usdtMint: USDC_MINT_ADDRESS,
            tokenProgram: TOKEN_PROGRAM,
            signerUsdtMint: usdcAddress,
            user: publicKey,
            systemProgram: SystemProgram.programId,
        })
        .instruction();

    const blockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
        feePayer: publicKey,
        ...blockhash
    }).add(instruction);

    return transaction;
};