import { ChatCompletionFunctions } from "openai-edge";
export const searchDataSchemas = [

    {
        name: "TRANSACTION_DETAILS_BY_TRANSACTION_HASH",
        description:
            "This function gets transaction information by transaction hash and network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have txnHash key which is nothing but transaction hash of a transaction in blockchain.`,
            properties: {
                txnHash: {
                    type: "string",
                    description:
                        "A transaction hash is a string of letters and numbers that is generated when a cryptocurrency transaction is initiated. It is a unique identifier that is used to track the transaction on the blockchain. Every transaction that occurs on the blockchain is recorded as a block, and each block has a unique hash.",
                },
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
            },
            required: ["txnHash", "network"],
        },
    },
    {
        name: "GIVE_ME_TOP_TOKEN_LIST",
        description:
            "This function gets top token information. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
    },
    {
        name: "GIVE_ME_GAS_PRICE",
        description:
            "This function gets gas price information by given network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
            },
            required: ['network']
        }
    },
    {
        name: "GIVE_ME_BLOCK_DETAILS_BY_BLOCK_NUMBER",
        description:
            "This function gets block details by given block number and network name. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: Give me block details for block number 31779828 on opBNB network. In this query blockNumber is 31779828 and network is opBNB. Please do not change network name, pick only from given command by user.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                blockNumber: {
                    type: 'string',
                    description: 'Block number will be a numeric or latest key as a string. Also, Blocks are identified by long numbers that include encrypted transaction information from previous blocks and new transaction information.'
                },
            },
            required: ['network', 'blockNumber']
        }
    },
    {
        name: "FETCH_TOKEN_SCORE_BY_TOKEN_ADDRESS_AND_NETWORK",
        description:
            "This function gets token score using token address and network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Don't confuse with pool liquidity score. This is for token score on a specific network.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                token: {
                    type: 'string',
                    description: 'Tokens are digital assets that operate on an existing blockchain network. User will provider a hex string,'
                },
            },
            required: ['network', 'token']
        }
    },
    {
        name: "FETCH_BLOCKCHAIN_LIST",
        description:
            "This function gets all the blockchain. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
    },
    {
        name: "FETCH_POOL_LIQUIDITY_SCORE",
        description:
            "This function gets pool liquidity score using token address and network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Don't confuse with token score. This is for pool liquidity score on a specific network.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                token: {
                    type: 'string',
                    description: 'Tokens are digital assets that operate on an existing blockchain network. User will provider a hex string,'
                },
            },
            required: ['network', 'token']
        }
    },
    {
        name: "FETCH_TOP_GAINER_TOKENS",
        description:
            "This function gets top gainer tokens on a given network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Don't confuse with token score. This is for pool liquidity score on a specific network.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                timePeriod: {
                    type: 'string',
                    description: 'timePeriod is time frame string which have only 5m, 1h, 6h, and 24h valid string. If user don\'t provide period. Add default period as 24h'
                },
            },
            required: ['network', 'timePeriod']
        }
    },
    {
        name: "FETCH_TOP_LOSER_TOKENS",
        description:
            "This function gets top loser tokens on a given network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Don't confuse with token score. This is for pool liquidity score on a specific network.",
        parameters: {
            type: 'object',
            description: 'Network is blockchain node.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                timePeriod: {
                    type: 'string',
                    description: 'timePeriod is time frame string which have only 5m, 1h, 6h, and 24h valid string. If user don\'t provide period. Add default period as 24h'
                },
            },
            required: ['network', 'timePeriod']
        }
    },
    {
        name: "FETCH_DEX_INFORMATION",
        description:
            "This function gets information about all DEXs on a specified blockchain. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: Give me top exchange list based on volume on ethereum network.",
        parameters: {
            type: 'object',
            description: 'This functionality requires two parameters network and sort key.',
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
                sortKey: {
                    type: 'string',
                    description: 'sortKey is nothing but a key by which we will search the data. Possible sortKey will be name, volume, pool, and swap'
                },
            },
            required: ['network', 'sortKey']
        }
    },
    {
        name: "BLOCKSCOUT_TRANSACTION_INFORMATION",
        description:
            "This function gets information about daily transactions count in Blockscout blockchain. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: Give me transaction count information.",
    },
    {
        name: "BLOCKSCOUT_MARKET_CAP_INFORMATION",
        description:
            "This function gets information about market cap of Blockscout blockchain. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: Give me market cap and closing prince information.",
    },
    {
        name: "BLOCKSCOUT_STATS",
        description:
            "This function gets information about Blockscout blockchain. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: Give me quick stats about Blockscout.",
    },
    {
        name: "FETCH_VERIFIED_SMART_CONTRACTS_COUNTERS",
        description:
            "This function gets information about verified smart contracts stats overview. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: I want to know verified smart contracts stats overview.",
    },
    {
        name: "FETCH_SYMBOL_INFORMATION",
        description:
            "This function gets information about tokens based on given symbol. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: I want to know more about token which have USDT symbol.",
        parameters: {
            type: 'object',
            description: 'This functionality requires one parameter.',
            properties: {
                symbol: {
                    type: 'string',
                    description: 'symbol is identifier for a token like USDT for Tether USD'
                },
            },
            required: ['symbol']
        }
    },
    {
        name: "TOP_TRENDING_TOKENS",
        description:
            "This function calls an api which fetchs trending tokens. These token are getting recent traction online. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: I want to know trending tokens",
    },
    {
        name: "TOP_LATEST_NEWS",
        description:
            "This function calls an api which fetchs latest crypto news. These are latest topics of discussion and news. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. Here is sample query: I want to know latest news",
    },
    
];



// {
//     name: 'CREATE_SMART_CONTRACT',
//         description: 'Create a smart contract. Only call this function in a separate chat message do not call it from a message with other text.',
//             parameters: {
//         type: 'object',
//             description: `This function will have contractName. cha Only call this function in a separate chat message do not call it from a message with other text.`,
//                 properties: {
//             contractName: {
//                 type: 'string',
//                 },
//             chainName: {
//                 type: 'string',
//                     description: 'Name of the EVM compatible chain we are deploying to. Default to Mumbai if not specified.'
//             },
//             sourceCode: {
//                 "type": "string",
//                     "description": "Source code of the smart contract. Use Solidity v0.8.20+ and ensure that it is the full source code and will compile. The source code should be formatted as a single-line string, with all line breaks and quotes escaped to be valid in a JSON context. Specifically, newline characters should be represented as '\\n', and double quotes should be escaped as '\\\"'."
//             },
//             constructorArgs: {
//                 type: 'array',
//                     items: {
//                     oneOf: [
//                         {
//                             type: 'string'
//                         },
//                         {
//                             type: 'array',
//                             items: {
//                                 type: 'string'
//                             }
//                         }
//                     ]
//                 },
//                 description: 'Arguments for the contract\'s constructor. Each argument can be a string or an array of strings. But the final constructor arguments must be an array.  Can be empty array if the constructor has no arguments.'
//             }

//         },
//         required: ['contractName', 'chainName', 'sourceCode', 'constructorArgs']
//     }
// },