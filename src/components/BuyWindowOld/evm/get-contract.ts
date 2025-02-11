import { Contract } from "ethers";
import { config } from '../../../config';
import { NETWORK_ETHEREUM } from "../constants";
import { FLARY_PRESALE_ABI } from "../flary-contract-abi";

const {
    ETH_CONTRACT_ADDRESS,
    BSC_CONTRACT_ADDRESS
} = config;

//@ts-ignore
export const getContract = (network, provider) => {
    const contractAddress =
        network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;

    const contract = new Contract(contractAddress, FLARY_PRESALE_ABI, provider);

    return contract;
};