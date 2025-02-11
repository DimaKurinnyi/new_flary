export const getSolanaPrice = async () => {
    const response = await fetch(
        "https://hermes.pyth.network/v2/updates/price/latest?ids[]=0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"
    );

    const data = await response.json();

    const price = data.parsed[0].price;

    return Number(price.price) * Math.pow(10, price.expo);
};