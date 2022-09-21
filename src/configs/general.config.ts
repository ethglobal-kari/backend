export const generalConfig = () => ({
    eth: {
        privateKey: process.env.PRIVATE_KEY,
        network: {
            1: process.env.ETH_RPC_URL,
            42: process.env.KOVAN_RPC_URL,
            420: process.env.OP_GOERLI_RPC_URL,
            80001: process.env.MUMBAI_RPC_URL
        },
        factory: {
            1: process.env.ETH_FACTORY_ADDRESS,
            42: process.env.KOVAN_FACTORY_ADDRESS,
            420: process.env.OP_GOERLI_FACTORY_ADDRESS,
            80001: process.env.MUMBAI_FACTORY_ADDRESS
        }
    }
})