import { ChatCompletionFunctions } from "openai-edge";
export const functionSchemas = [

    {
        name: "TRANSACTION_DETAILS_BY_TRANSACTION_HASH",
        description:
            "This function gets transaction information by transaction hash. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have txnHash key which is nothing but transaction hash of a transaction in blockchain.`,
            properties: {
                txnHash: {
                    type: "string",
                    description:
                        "A transaction hash is a string of letters and numbers that is generated when a cryptocurrency transaction is initiated. It is a unique identifier that is used to track the transaction on the blockchain. Every transaction that occurs on the blockchain is recorded as a block, and each block has a unique hash.",
                },
            },
            required: ["txnHash"],
        },
    },
    {
        name: "GIVE_ME_TOKEN_LIST",
        description:
            "This function gets all information of tokens. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
    },
    {
        name: "GIVE_ME_GAS_PRICE",
        description:
            "This function gets gas price information. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
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
        name: "APPROVE_ERC20_TOKEN",
        description:
            "This function gets the low level calldata which could be executed by the user to approve ERC20 token. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: 'object',
            description: 'TokenAddress is a blockchain address',
            properties: {
                tokenAddress: {
                    type: 'string',
                    description: 'TokenAddress is an address in the blockchain. In the context of blockchain, a token address represents an ERC20 token which has approval function in them'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
                },
                approvalAddress: {
                    type: 'string',
                    description: 'ApprovalAddress is an address in the blockchain. In the context of blockchain, a token amount represents any address which needs to be approved'
                },
            },
            required: ['tokenAddress', 'tokenAmount', 'approvalAddress']
        }
    },
    {
        name: "SEND_ERC20_TOKEN",
        description:
            "This function gets the low level calldata which could be executed by the user to send ERC20 token to any address. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAddress is a blockchain address',
            properties: {
                tokenAddress: {
                    type: 'string',
                    description: 'TokenAddress is an address in the blockchain. In the context of blockchain, a token address represents an ERC20 token which has approval function in them'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
                },
                tokenSymbol : {
                    type: 'string',
                    description: 'TokenSymbol is the symbol of token in the specified chain. In the context of blockchain, a token symbol represents symbol assigned to the address. Example in ETH chain native token is ETH and its wrapped token is WETH. '
                },
                receiverAddress: {
                    type: 'string',
                    description: 'ReceiverAddress is an address in the blockchain. In the context of blockchain, a receiver address represents any address which will receive ERC20 tokens'
                },
            },
            required: ['tokenAddress', 'tokenAmount', 'receiverAddress']
        }
    },
    {
        name: "WRAP_TOKEN",
        description:
            "This function gets the low level calldata which could be executed by the user to send ERC20 token. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
                },
            },
            required: ['tokenAmount']
        }
    },
    //   {
    //     name: "CROSS_CHAIN",
    //     description:
    //         "This function gets the low level calldata which could be executed by the user to send ERC20 token. It returns message and data. Only call this function in a separate chat message can be called with other texts",
    //     parameters: {
    //         type: 'object',
    //         description: 'TokenAmount is amount of token in form of wei.',
    //         properties: {
    //             tokenAmount: {
    //                 type: 'string',
    //                 description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
    //             },
    //             tokenSymbol : {
    //                 type: 'string',
    //                 description: 'TokenSymbol is the symbol of native token in the specified chain. In the context of blockchain, a token symbol represents symbol assigned to the address.'
    //             },
    //              destinationChain : {
    //                 type: 'string',
    //                 description: 'destinationChain is the symbol of native token in the specified chain. In the context of blockchain, a token symbol represents symbol assigned to the address.'
    //             },
    //         },
    //         required: ['tokenAmount', 'tokenSymbol',['destinationChain']]
    //     }
    // },
    {
        name: "UNWRAP_TOKEN",
        description:
            "This function gets the low level calldata which could be executed by the user to send ERC20 token. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
                },
            },
            required: ['tokenAmount']
        }
    },
    {
        name: "SWAP_ERC20_TOKEN",
        description:
            "This function gets the low level calldata which could be executed by the user to swap an ERC20 token to another ERC20. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                fromTokenSymbol: {
                    type: 'string',
                    description: 'fromTokenSymbol is the symbol of token in the specified chain which is needed to be swapped. In the context of blockchain, a token symbol represents symbol assigned to the address.'
                },
                toTokenSymbol: {
                    type: 'string',
                    description: 'ToTokenSymbol is the symbol of token in the specified chain in which the token is swapped into. In the context of blockchain, a token symbol represents symbol assigned to the address.'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved. It can be a native token on the chain. Thus require the value in exact token decimals.'
                },
                slippage: {
                    type: 'string',
                    description: 'Slippage is the minimum amount of token received . In the context of blockchain, its denoted in terms of BIPS where 1% is 100.'
                },
            },
            required: ['fromTokenSymbol','toTokenSymbol','tokenAmount','slippage']
        }
    },
    {
        name: "ENSO_SWAP",
        description:
            "This function gets the low level calldata which could be executed by the user to swap an ERC20 token to another ERC20 using enso protocol. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                fromTokenSymbol: {
                    type: 'string',
                    description: 'fromTokenSymbol is the symbol of token in the specified chain which is needed to be swapped. In the context of blockchain, a token symbol represents symbol assigned to the address.'
                },
                toTokenSymbol: {
                    type: 'string',
                    description: 'ToTokenSymbol is the symbol of token in the specified chain in which the token is swapped into. In the context of blockchain, a token symbol represents symbol assigned to the address.'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved. It can be a native token on the chain. Thus require the value in exact token decimals.'
                },
                slippage: {
                    type: 'string',
                    description: 'Slippage is the minimum amount of token received . In the context of blockchain, its denoted in terms of BIPS where 1% is 100.'
                },
            },
            required: ['fromTokenSymbol','toTokenSymbol','tokenAmount','slippage']
        }
    },
    {
        name: "LIMIT_ORDER",
        description:
            "This function gets the low level calldata which could be executed by the user to set a limit order to sell a token at a given price. It returns message and data. Only call this function in a separate chat message can be called with other texts",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                fromToken: {
                    type: 'string',
                    description: 'FromToken is an address in the blockchain. In the context of blockchain, a token address represents an ERC20 token which has approval function in them'
                },
                toToken: {
                    type: 'string',
                    description: 'ToToken is an address in the blockchain. In the context of blockchain, a token address represents an ERC20 token which has approval function in them'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved'
                },
                slippage: {
                    type: 'string',
                    description: 'Slippage is the minimum amount of token received . In the context of blockchain, its denoted in terms of BIPS where 1% is 100.'
                },
                setPrice: {
                    type: 'string',
                    description: 'SetPrice is the price of the fromToken at which the order will be executed. In the context of blockchain, its denoted in terms of toToken amount and in its decimals'
                },
            },
            required: ['tokenAmount','fromToken','toToken','slippage','setPrice']
        }
    },
    {
        name: "CHAINLINK_CCIP",
        description:
            "This function gets the low level calldata which could be executed by the user to transfer or bridge token using chainlink ccip from one chain to another chain. It returns message and data. Only call this function in a separate chat message can be called with other texts. Example prompt: Transfer 0.01 CCIP-BnM to Base Sepolia. As you can see here my token symbol is CCIP-BnM, my token amount is 10000000000000000 and toChain is base sepolia.",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                tokenSymbol: {
                    type: 'string',
                    description: 'tokenSymbol is the symbol of token in the specified chain which is needed to be transferred. In the context of blockchain, a token symbol represents symbol assigned to the address.'
                },
                // fromChain: {
                //     type: 'string',
                //     description: 'fromChain is the name of chain of the blockchain network from which the token is getting transferred . In the context of blockchain, a chain represents its assigned name.It can be mainnet or testnet.'
                // },
                toChain: {
                    type: 'string',
                    description: 'toChain is the name of chain of the blockchain network to which the token is getting transferred . In the context of blockchain, a chain represents its assigned name. It can be mainnet or testnet. Returns the value in small or lower case.'
                },
                tokenAmount: {
                    type: 'string',
                    description: 'TokenAmount is the amount of token in the format of wei . In the context of blockchain, a token amount represents an ERC20 number which needs to be approved. It can be a native token on the chain. Thus require the value in exact token decimals. Convert it to wei'
                },
            },
            required: ['tokenSymbol','fromChainId','toChainId','tokenAmount']
        }
    },
    {
        name: "DEPLOY_STRATEGY",
        description:
            "This function gets the low level calldata which could be executed by the user to deploy a strategy on mode network. It returns message and data. Only call this function in a separate chat message can be called with other texts. Example prompt: I want to create a vault with layerbank strategy on mode network.",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                chain: {
                    type: 'string',
                    description: 'chain is the name of chain of the blockchain network from which the token is getting transferred . In the context of blockchain, a chain represents its assigned name. It can be mainnet or testnet. Returns the value in small or lower case.'
                },
            },
            required: ['chain']
        }
    },
    {
        name: "INTERACT_STRATEGY",
        description:
            "This function gets the low level calldata which could be executed by the user to interact with a strategy on mode network. It returns message and data. Only call this function in a separate chat message can be called with other texts. Example prompt: I want to deposit into a vault with address .",
        parameters: {
            type: 'object',
            description: 'TokenAmount is amount of token in form of wei.',
            properties: {
                chain: {
                    type: 'string',
                    description: 'chain is the name of chain of the blockchain network from which the token is getting transferred . In the context of blockchain, a chain represents its assigned name. It can be mainnet or testnet. Returns the value in small or lower case.'
                },
            },
            required: ['chain']
        }
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

