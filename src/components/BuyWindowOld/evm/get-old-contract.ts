import { Contract } from "ethers";
import { config } from '../../../config';
import { FLARY_PRESALE_ABI } from "../flary-contract-abi";

const {
    ETH_CONTRACT_ADDRESS_OLD,
    
} = config;

//@ts-ignore
export const getContractOld = (network, provider) => {
    const contractAddress =
        ETH_CONTRACT_ADDRESS_OLD

    const contract = new Contract(contractAddress, FLARY_PRESALE_ABI, provider);

    return contract;
};