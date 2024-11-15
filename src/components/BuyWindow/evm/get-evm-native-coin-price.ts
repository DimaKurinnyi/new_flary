import { NETWORK_ETHEREUM } from "../constants";
import { config } from '../../../config';
import { formatUnits, JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { PRICE_FEED_ABI } from "../price-feed-abi";
import { getContract } from "./get-contract";

const {
    RPC_ETH,
    RPC_BSC,
} = config;

//@ts-ignore
export const getEvmNativeCurrencyPrice = async (network) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    const provider = new JsonRpcProvider(providerRpc);

    const contract = getContract(network, provider);

    const priceFeedAddress = await contract.nativeUsdPriceFeed();

    const priceFeed = new Contract(priceFeedAddress, PRICE_FEED_ABI, provider);

    const priceLatest = await priceFeed.latestAnswer();
    const decimals = await priceFeed.decimals();

    return Number(formatUnits(priceLatest, decimals));
}