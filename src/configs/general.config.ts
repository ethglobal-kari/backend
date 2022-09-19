export const generalConfig = () => ({
    eth: {
        privateKey: process.env.PRIVATE_KEY,
        network: {
            1: process.env.ETH_RPC_URL,
            42: process.env.KOVAN_RPC_URL
        },
        factory: {
            1: process.env.ETH_FACTORY_ADDRESS,
            42: process.env.KOVAN_FACTORY_ADDRESS
        }
    }
})