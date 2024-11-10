import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { FaDownload } from 'react-icons/fa6';
import { ImDownload2 } from 'react-icons/im';
import { FaCode } from 'react-icons/fa6';
import { SiBnbchain } from 'react-icons/si';
import { toast } from 'react-toastify';

import sal from 'sal.js';
import Markdown from 'react-markdown';
import { toBase64 } from 'openai/core';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import { saveAs } from 'file-saver';
import Button from '../ui/Button';
import axios from 'axios';
import BuildMessage from './BuildMessage';
import ContractDeploySuccess from './ContractDeploySuccess';
import Loader from './Loader';
import {
  okaidia,
  oneDark,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import exampleJson from './example.json'
import { useAccount } from 'wagmi';
import { useDeployContract, useWaitForTransactionReceipt } from "wagmi";


const SELECT_OPTION = [
  { label: 'Smart Contract', value: 'SMART_CONTRACT' },
  { label: 'Cross Chain Token', value: 'CROSS_CHAIN_TOKEN' },
];
const LOADER_DEFAULT_STATE = {
  action: 'default',
  loading: false,
};
const PROMPT_DEFAULT_STATE = {
  contractType: 'SMART_CONTRACT',
  prompt: 'I want to create a hook based on whitelist',
};
const DEPLOYED_CONTRACT_DEFAULT_STATE = {
  success: false,
  abi: [],
  contract: '',
  transactionHash: '',
  contractType: '',
};
const HookContractBuilder = () => {
  const [_web3, _setWeb3] = useState('');
  const [loader, setLoader] = useState(LOADER_DEFAULT_STATE);
  const [contractBuilderForm, setContractBuilderForm] =
    useState(PROMPT_DEFAULT_STATE);
  const [deployedContractInfo, setDeployedContractInfo] = useState(
    DEPLOYED_CONTRACT_DEFAULT_STATE
  );
  const [chatGPTRawResponse, setChatGPTRawResponse] = useState(null);
  // const [chatGPTRawResponse, setChatGPTRawResponse] = useState("Sure, here is a simple smart contract written in Solidity that stores a value. This contract follows the best security practices such as using the latest compiler version and making the state variable private.\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.7;\n\ncontract StoreValue {\n    uint256 private value;\n\n    event ValueChanged(uint256 newValue);\n\n    function setValue(uint256 _value) public {\n        value = _value;\n        emit ValueChanged(_value);\n    }\n\n    function getValue() public view returns (uint256) {\n        return value;\n    }\n}\n```\n\nThis contract has a private state variable `value` and two functions `setValue` and `getValue`. The `setValue` function allows you to set the value of the `value` variable and emits an event `ValueChanged` whenever the value is changed. The `getValue` function allows you to view the current value of the `value` variable.");
  const [ chatGPTCodeResponse, setChatGPTCodeResponse ] = useState( '' );
  const {address}= useAccount()
  // const { deployContract } = useDeployContract();
  const {
    deployContract,
    data: deployHash,
    error,
    isError,
    isPending,
    isSuccess,
  } = useDeployContract();
    const [constructorArgs, setConstructorArgs] = useState([]);

    useEffect(() => {
    const nConstructor = chatGPTRawResponse?.n_constructor || 0;
    // Initialize an array of empty strings for each argument
    setConstructorArgs(Array(nConstructor).fill(''));
  }, [chatGPTRawResponse]);


  //  const { address } = useAccount();
   const deployTheContract = async () => {
    setLoader((prev) => ({
      ...prev,
      action: 'deploy-contract',
      loading: true,
    }));
    try {
      await deployContract({
   
        abi: chatGPTRawResponse.abi,
        bytecode: chatGPTRawResponse.bytecode,
        args: constructorArgs,
        // args:["0x969D90aC74A1a5228b66440f8C8326a8dA47A5F9"]
      } );

     
    } catch (error) {
      console.error(error);
      toast.error('Failed to deploy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoader((prev) => ({
        ...prev,
        action: 'default',
        loading: false,
      }));
      // setChatGPTRawResponse(null);
    }
  };

  // Display toasts based on the state of the transaction
  useEffect(() => {
    if (isPending) {
      toast.info('Transaction is pending...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    if (isSuccess) {
      toast.success('Successfully deployed!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    if (isError) {
      toast.error(`Deployment failed: ${error?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isPending, isSuccess, isError, error]);
//  const deployTheContract = async () => {
 

//     try
//     {
          
//       await deployContract({
   
//         abi: chatGPTRawResponse.abi,
//         bytecode: chatGPTRawResponse.bytecode,
//         args: constructorArgs,
//       } );
      
//        toast.success('Successfully deployed!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     } catch (err) {
//       console.error("Deployment error:", err);
//     }
    
//   };

   const handleInputChange = (index, value) => {
    const newArgs = [...constructorArgs];
    newArgs[index] = value; // Update the specific argument
    setConstructorArgs(newArgs);
  };



  const extractCodeBlocks = () => {
    const codeBlocks = [];
    const regex = /```(.*?)\n([\s\S]*?)```/g;
    let match;

    // console.log("chatGPTRawResponse.solidity_code =====>>>>>",chatGPTRawResponse?.solidity_code)

    while ((match = regex.exec(chatGPTRawResponse?.solidity_code)) !== null) {
      codeBlocks.push({ language: match[1], value: match[2] });
    }

    return codeBlocks;
  };

  const resetStates = () => {
    setLoader(LOADER_DEFAULT_STATE);
    setContractBuilderForm(PROMPT_DEFAULT_STATE);
    setDeployedContractInfo(DEPLOYED_CONTRACT_DEFAULT_STATE);
    setChatGPTRawResponse('');
    setChatGPTCodeResponse('');
  };
  const getChatGptResponse = async () => {
    setLoader((prev) => ({
      ...prev,
      action: 'generate',
      loading: true,
    }));
    setChatGPTRawResponse('');
    try {
      // const { data } = await axios.post('https://hooks.potp.xyz/invoke', {
      //   template: 'SMART_CONTRACT',
      //   query: {
      //     userAddress: a,
      //     prompt: contractBuilderForm.prompt,
      //   },
      // } );
        const paraM = {
          userAddress: address,
          prompt: contractBuilderForm.prompt
        };

        // const data = await axios.post('https://hooks.potp.xyz/invoke', paraM, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // });

      
              const response = await fetch('/api/invoke', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paraM),
              });

    const data =  await response.json();
    console.log('Response from API:', data);

      console.log("data ====>>>>>>",data)
      setChatGPTRawResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader((prev) => ({
        ...prev,
        action: 'default',
        loading: false,
      }));
    }
  };

  const getCodeOnlyFromChatGPTResponse = () => {
    const code = extractCodeBlocks(); //chatGPTRawResponse.substring(chatGPTRawResponse.indexOf('```solidity') + 11, chatGPTRawResponse.lastIndexOf('```'))
    const result = code?.length ? code[0]['value'] : '';
    return result;
  };

  const downloadSourceCode = () => {
    // setIsLoading(true)
    try {
      // const code = getCodeOnlyFromChatGPTResponse();
      const code = chatGPTRawResponse?.solidity_code
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'contract.sol');
    } catch (error) {
    } finally {
      // setIsLoading(false)
    }
  };

  const openInRemix = async () => {
    try {
      const code = chatGPTRawResponse?.solidity_code
      const base = toBase64(code);
      const link = `https://remix.ethereum.org/?#code=${base}&autoCompile=true&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js`;
      window.open(link, '_blank');
    } catch (error) {
      console.log({ error });
    }
  };

  const downloadHardHatProject = async () => {
    // setIsLoading(true)
    try {
      const code = chatGPTRawResponse?.solidity_code
      console.log("code from downloadHardHatProject =====>>>")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/hardhat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sourceCode: code, contractType: contractBuilderForm.contractType }),
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hardhat-project.zip';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setIsLoading(false)
    }
  };

  // const deployContractTxnCall = async (abi, bytecode) => {
  //   try {
  //     const accounts = await _web3.eth.getAccounts();
  //     const networkId = await _web3.eth.net.getId();
  //     const contract = new _web3.eth.Contract(abi);
  //     let transactionHash = '';
  //     // Deploy the contract
  //     const deployedContract = await contract
  //       .deploy({
  //         data: bytecode,
  //       })
  //       .send({
  //         from: accounts[0],
  //         gas: '3000000', // Adjust gas value according to your contract
  //         gasPrice: '1000000000', // Adjust gas price according to your preferences
  //         // gas: '3000000', // Adjust gas value according to your contract
  //       })
  //       .on('transactionHash', (hash) => {
  //         transactionHash = hash;
  //         // You can save the transaction hash if needed
  //       })
  //       .on('receipt', (receipt) => {
  //         console.log('Receipt:', receipt);
  //       })
  //       .on('confirmation', (confirmationNumber, receipt) => {
  //         console.log('Confirmation number:', confirmationNumber);
  //       })
  //       .on('error', (error) => {
  //         console.error('Error:', error);
  //       });
  //     setDeployedContractInfo((prev) => ({
  //       ...prev,
  //       success: true,
  //       contract: deployedContract.options.address,
  //       transactionHash,
  //       contractType: 'SMART_CONTRACT'
  //     }));
  //     setChatGPTRawResponse(null);
  //     return deployedContract.options.address;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

 



  useEffect(() => {
    sal();
  }, []);

  useEffect(() => {
    const initializeWeb3 = async () => {
      // Modern DApp browsers like MetaMask inject a web3 instance
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          _setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied account access');
        }
      }
      // Legacy dApp browsers
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        let myWeb3 = new Web3(web3Instance);

        _setWeb3(myWeb3);
        // const oldProvider = web3.currentProvider; // keep a reference to metamask provider
      } else {
        console.log('No web3 instance detected');
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    if (chatGPTRawResponse?.length) {
      const code = getCodeOnlyFromChatGPTResponse();
      setChatGPTCodeResponse(code);
    }
  }, [chatGPTRawResponse]);




  return (
    <>
      <div className='rbt-main-content mr--0 mt--30'>
        <div className='rbt-daynamic-page-content'>
          <div className='rbt-dashboard-content'>
            <div className='content-page'>
              <div className='chat-box-list'>
                <div className='rainbow-generartor-section rainbow-section-gap'>
                  <div
                    className='section-title text-center sal-animate'
                    data-sal='slide-up'
                    data-sal-duration='700'
                    data-sal-delay='100'
                  >
                    <h4 className='subtitle '>
                      <span className='theme-gradient'>Web3Agent</span>
                    </h4>
                    <h3 className='title w-600 mb--10'>
                      A v4 hook Generator
                    </h3>
                    <p className='description b3'>
                      leveraging generative AI where users can select a pair, introduce a prompt,
                      <br />
                      get the hook generated, deployed and verified in a couple clicks.
                    </p>
                  </div>
                  <div className='genarator-section'>
                    <div className='row border-gradient  p-4'>
                      <div className='col-4'>
                        <div className='row'>
                          {/* <div className='col-12 mb-3 d-grid'>
                            <label
                              htmlFor='contract-select'
                              className='form-label'
                            >
                              Constructor Args
                            </label>
                            <div className='border-gradient'>
                              
                            </div>
                          </div> */}
                          {constructorArgs.map((arg, index) => (
                            <div key={index} className='col-12 mb-3 d-grid'>
                              <label htmlFor={`contract-arg-${index}`} className='form-label'>
                                Constructor Arg {index + 1}
                              </label>
                              <div className='border-gradient'>
                                <input
                                  id={`contract-arg-${index}`}
                                  style={{ backgroundColor: '#0F1021' }}
                                  className='fs-4'
                                  value={arg} // Set the value from the state
                                  onChange={(e) => handleInputChange(index, e.target.value)} // Handle the change for this specific argument
                                  placeholder={`Enter constructor argument ${index + 1}`}
                                />
                              </div>
                            </div>
                          ))}
                          <div className='col-12 d-grid'>
                            <label
                              htmlFor='contract-textarea'
                              className='form-label mt-3 '
                            >
                              Enter the Prompt Text
                            </label>
                            <div className='border-gradient'>
                              <textarea
                                style={{ minHeight: '400px' }}
                                className='fs-4'
                                id='contract-textarea'
                                rows='6'
                                value={contractBuilderForm.prompt}
                                onChange={(e) => {
                                  setContractBuilderForm((prev) => ({
                                    ...prev,
                                    prompt: e.target.value,
                                  }));
                                }}
                              ></textarea>
                            </div>
                            <Button
                              btnClass={
                                'btn btn-secondry border-gradient color-white p-3 mt-4 fs-4'
                              }
                              title='Generate Contract'
                              onClick={getChatGptResponse}
                              loading={
                                loader.action === 'generate' && loader.loading
                              }
                              disabled={
                                loader.action === 'generate' && loader.loading
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-8'>
                        <div className='row'>
                          {loader.loading &&
                            loader.action !== 'deploy-contract' && (
                              <div className='col-12'>
                                <Loader show={loader.loading} />
                              </div>
                            )}
                         {!chatGPTRawResponse?.solidity_code?.length && !loader?.loading ? (
                            <div className='col-12'>
                              <BuildMessage />
                            </div>
                          ) : (
                              <div className='col-12 border-gradient'>
                              
                                <pre  style={{ backgroundColor: '#0F1021', maxHeight:"500px", overflowY:"auto", padding: '20px', borderRadius: '5px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                                  { chatGPTRawResponse.solidity_code }
                                </pre>

                            </div>
                          )}
                           {!!chatGPTRawResponse?.solidity_code?.length && (
                            <>
                              <div className='col-12 mt-3'>
                                {/* {(extractCodeBlocks() || []).map(
                                  (block, index) => (
                                    <SyntaxHighlighter
                                      key={index}
                                      language={block.language || 'text'}
                                      style={oneDark}
                                    // style={{minHeight:"600px"}}
                                    >
                                      {block.value}
                                    </SyntaxHighlighter>
                                  )
                                )} */}
                                {/* <Markdown remarkPlugins={[remarkGfm]}
                                                                children={chatGPTRawResponse}
                                                                components={{
                                                                    code(props) {
                                                                        const { children, className, node, ...rest } = props;
                                                                        const match = /language-(\w+)/.exec(className || '');
                                                                        return match ? (
                                                                            <SyntaxHighlighter
                                                                                {...rest}
                                                                                PreTag="div"
                                                                                children={String(children).replace(/\n$/, '')}
                                                                                language={match[1]}
                                                                            // style={a11yDark}
                                                                            />
                                                                        ) : (
                                                                            <code {...rest} className={className}>
                                                                                {children}
                                                                            </code>
                                                                        );
                                                                    }
                                                                }} /> */}
                              </div>
                              <div className='col-12 row'>
                                <div className='col-3 d-grid'>
                                  <Button
                                    btnClass={
                                      'btn p-3 btn-secondry border-gradient color-white my-4 fs-4'
                                    }
                                    title='Contract'
                                    onClick={downloadSourceCode}
                                    icon={FaDownload}
                                    iconclassName='text-white fs-3'
                                  />
                                </div>
                                <div className='col-3 d-grid'>
                                  <Button
                                    btnClass={
                                      'btn p-3 btn-secondry border-gradient color-white my-4 fs-4'
                                    }
                                    title='Hardhat'
                                    onClick={downloadHardHatProject}
                                    icon={ImDownload2}
                                    iconclassName='text-white fs-3'
                                  />
                                </div>
                                <div className='col-3 d-grid'>
                                  <Button
                                    btnClass={
                                      'btn p-3 btn-secondry border-gradient color-white my-4 fs-4'
                                    }
                                    title='Remix'
                                    onClick={openInRemix}
                                    icon={FaCode}
                                    iconclassName='text-white fs-3'
                                  />
                                </div>
                                <div className='col-3 d-grid'>
                                  <Button
                                    btnClass={
                                      'btn p-3 btn-secondry border-gradient color-white my-4 fs-4'
                                    }
                                    title='Deploy'
                                    onClick={deployTheContract}
                                    icon={SiBnbchain}
                                    iconclassName='text-white fs-3'
                                    loading={
                                      loader.action === 'deploy-contract' &&
                                      loader.loading
                                    }
                                    disabled={
                                      loader.action === 'deploy-contract' &&
                                      loader.loading
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HookContractBuilder;
