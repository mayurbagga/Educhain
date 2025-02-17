import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useChat } from "ai/react";
import sal from "sal.js";
import { nanoid } from "../../lib/utils";
import { FaLaptopCode, FaUserTie } from "react-icons/fa";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import { useAccount } from "wagmi";

import Image from "next/image";
import Form from "@/pages/Form";
import user from "../../public/images/team/team-01.jpg";
import { useChatComponentHandler } from "@/context/ChatComponentHandler";
import { searchDataSchemas } from "@/lib/functions/searchDataSchema";
import MountComponent from "../MountComponent/MountComponent";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Button from "../ui/Button";
import StaticbarDashboard from "../Common/StaticbarDashboard";
// import RightPanel from './Rightpanel';
import axiosHelper from "@/data/rest/axios";
import RightPanel from "./RightPanel";
import axios from 'axios';

const COMPONENT_MOUNT_ACTIONS = [
  "GIVE_ME_GAS_PRICE",
  "FETCH_TOP_GAINER_TOKENS",
  "FETCH_TOP_LOSER_TOKENS",
  "FETCH_BLOCKCHAIN_LIST",
  "TRANSACTION_DETAILS_BY_TRANSACTION_HASH",
  "GIVE_ME_TOP_TOKEN_LIST",
  "GIVE_ME_BLOCK_DETAILS_BY_BLOCK_NUMBER",
  "FETCH_POOL_LIQUIDITY_SCORE",
  "FETCH_TOKEN_SCORE_BY_TOKEN_ADDRESS_AND_NETWORK",
  "FETCH_DEX_INFORMATION",
  "BLOCKSCOUT_TRANSACTION_INFORMATION",
  "BLOCKSCOUT_MARKET_CAP_INFORMATION",
  "BLOCKSCOUT_STATS",
  "FETCH_SYMBOL_INFORMATION",
  "FETCH_VERIFIED_SMART_CONTRACTS_COUNTERS",
  "TOP_TRENDING_TOKENS"
];

const DEFAULT_PROMPT_MESSAGES = [
   // Category: Learn (New)
   {
    prompt: "Explain the basics of blockchain technology.",
    example: "Explain the basics of blockchain technology.",
    category: "Learn",
  },
  {
    prompt: "What is Web3, and how is it different from Web2?",
    example: "What is Web3, and how is it different from Web2?",
    category: "Learn",
  },
  {
    prompt: "How do smart contracts work on the blockchain?",
    example: "How do smart contracts work on the blockchain?",
    category: "Learn",
  },
  {
    prompt: "What is a decentralized application (dApp)?",
    example: "What is a decentralized application (dApp)?",
    category: "Learn",
  },
  {
    prompt: "Can you explain what DeFi (Decentralized Finance) is?",
    example: "Can you explain what DeFi (Decentralized Finance) is?",
    category: "Learn",
  },
  {
    prompt: "How does a cryptocurrency wallet work?",
    example: "How does a cryptocurrency wallet work?",
    category: "Learn",
  },
  {
    prompt: "What are public and private keys in blockchain?",
    example: "What are public and private keys in blockchain?",
    category: "Learn",
  },
  {
    prompt: "What is a token in blockchain, and how is it different from a coin?",
    example: "What is a token in blockchain, and how is it different from a coin?",
    category: "Learn",
  },
  {
    prompt: "How does staking work, and how can I participate?",
    example: "How does staking work, and how can I participate?",
    category: "Learn",
  },
  {
    prompt: "Explain the concept of gas fees in Ethereum.",
    example: "Explain the concept of gas fees in Ethereum.",
    category: "Learn",
  },
  {
    prompt: "What is an NFT (Non-Fungible Token)?",
    example: "What is an NFT (Non-Fungible Token)?",
    category: "Learn",
  },
  {
    prompt: "How do blockchain nodes work, and why are they important?",
    example: "How do blockchain nodes work, and why are they important?",
    category: "Learn",
  },
  {
    prompt: "What is consensus in blockchain, and what are its types?",
    example: "What is consensus in blockchain, and what are its types?",
    category: "Learn",
  },
  {
    prompt: "What is a DAO (Decentralized Autonomous Organization)?",
    example: "What is a DAO (Decentralized Autonomous Organization)?",
    category: "Learn",
  },
  {
    prompt: "How can I deploy my own smart contract?",
    example: "How can I deploy my own smart contract?",
    category: "Learn",
  },
  {
    prompt: "Explain the concept of tokenomics.",
    example: "Explain the concept of tokenomics.",
    category: "Learn",
  },
  {
    prompt: "What is yield farming in DeFi?",
    example: "What is yield farming in DeFi?",
    category: "Learn",
  },
  {
    prompt: "How does blockchain ensure security and transparency?",
    example: "How does blockchain ensure security and transparency?",
    category: "Learn",
  },
  {
    prompt: "What are some popular blockchains for dApp development?",
    example: "What are some popular blockchains for dApp development?",
    category: "Learn",
  },
  {
    prompt: "Explain the role of liquidity pools in DeFi.",
    example: "Explain the role of liquidity pools in DeFi.",
    category: "Learn",
  },

  // Category: Finance
  {
    prompt: "Gas Price",
    example: "Give me the gas price of the BSC network for performing fast transaction",
    category: "Finance",
  },
  {
    prompt: "Please give me the pool liquidity score for token 0x05299b297cfd60188b759edadfeb7b48e212dedf on the BSC network",
    example: "Please give me the pool liquidity score for token 0x05299b297cfd60188b759edadfeb7b48e212dedf on the BSC network",
    category: "Finance",
  },
  {
    prompt: "Please give me the pool liquidity score for token 0x02fb4e9c9ed8f35f56c833566fbb53ecfedaebc2 on the opBNB network",
    example: "Please give me the pool liquidity score for token 0x02fb4e9c9ed8f35f56c833566fbb53ecfedaebc2 on the opBNB network",
    category: "Finance",
  },

  // Category: Info
  {
    prompt: "Transaction Details",
    example: "Give me details for transaction hash 0x2e1fbc191c7e87a345a9e8693005280afc5cb60624ca10e08c4cdededf2c5d3b on BSC network",
    category: "Info",
  },
  {
    prompt: "Block Details",
    example: "Give me block details for block number 39295392 on BSC network",
    category: "Info",
  },

  // Category: Token
  {
    prompt: "Give me top token list",
    example: "Give me top token list",
    category: "Token",
  },
  {
    prompt: "I want to know trending tokens",
    example: "I want to know trending tokens",
    category: "Token",
  },

  // Category: News
  {
    prompt: "I want to know latest news",
    example: "I want to know latest news",
    category: "News",
  },

 
];


const SearchData = ({ id, initialMessages }) => {
  const { address: userAccountAddress } = useAccount();
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const { action, setAction } = useChatComponentHandler();
  const [userChatHistory, setUserChatHistory] = useState([]);
  const [showCommandPan, setShowCommandPan] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    // Scrolls to the bottom of the container when component mounts or updates
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });
  useEffect(() => {
    getChatHistory();
  }, []);
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const deleteChatHistory = async (chat) => {
    const { _id } = chat;
    const {
      data: { data },
    } = await axiosHelper(
      `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/chat-history/${_id}`,
      "DELETE",
      null,
      null
    );
    console.log("👉🏻 Line 130 : ", data);
    getChatHistory();
  };
  const getChatHistory = async () => {
    try {
      const {
        data: { data },
      } = await axiosHelper(
        `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/chat-history?userAccountAddress=${userAccountAddress}&type=SEARCH_DATA`,
        "GET",
        null,
        null
      );
      setUserChatHistory(data);
    } catch (error) {
      console.error(error)
    }
  };
  const handleSaveChatHistoryClick = async () => {
    try {
      if (!messages?.length) {
        throw new Error("NO_CHAT_TO_SAVE");
      }
      const { data } = await axiosHelper(
        `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/chat-history`,
        "POST",
        null,
        { messages, wallet_address: userAccountAddress, type: "SEARCH_DATA" }
      );
      getChatHistory();
    } catch (error) {
      console.error(error);
    }
  };
  const resetToDefault = () => {
    setMessage("");
    setAction((prev) => ({
      ...prev,
      type: "",
      data: {},
    }));
    setMessages([]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      handleSendMessage(message);
      console.log(message);
      setMessage("");
    } else {
      alert("Please enter a message.");
    }
  };

  const handleKeyPress = (event) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  const getCategoryNames = () => {
    let category = DEFAULT_PROMPT_MESSAGES.map((item) => item.category).filter(
      function (v, i, self) {
        return i == self.indexOf(v);
      }
    );
    return ["All"].concat(category);
  };

  const functionCallHandler = async (chatMessages, functionCall) => {
    console.log("🚀 ~ functionCallHandler ~ chatMessages:", chatMessages);
    console.log("🚀 ~ functionCallHandler ~ functionCall:", functionCall);
    const name = functionCall?.name;
    if (COMPONENT_MOUNT_ACTIONS.includes(name)) {
      const args = JSON.parse(functionCall.arguments);
      console.log("🚀 ~ functionCallHandler ~ args:", args);
      const temp = {
        id: nanoid(),
        name,
        role: "system",
        content: name,
        data: {
          ...args,
          type: name,
          id: nanoid(),
        },
      };
      setMessages([...chatMessages, temp]);
    }
    // if ( functionCall.name === 'TOP_TRENDING_TOKENS' )
    // {
    //   console.log( "executing trending tokens ...." )
           
    //   try {
    //      const apiResponse = await axios.post(
    //     `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/data-api/`,
    //     {
    //       action: "TOP_TRENDING_TOKENS"

    //     }
    //     )
    //           console.log("api response data FOR trending =====>>>>>>", apiResponse.data);

    //   } catch (error) {
    //     console.log("error data-api call ====>>>>",error)
    //   }

     

    
    //   const functionResponse = {
    //     messages: [
    //       ...chatMessages,
    //       {
    //         id: nanoid(),
    //         name: 'TOP_TRENDING_TOKENS',
    //         role: 'function',
    //         content: message,
    //       },
    //     ],
    //     functions: functionSchemas,
    //   };

    //   console.log("funcion response =======>>>>>>", functionResponse)
    //   return functionResponse;
    // }
  };

  const {
    messages,
    setMessages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
  } = useChat({
    // api: "http://localhost:3001/api/chat",
    experimental_onFunctionCall: functionCallHandler,
    initialMessages,
    id,
    body: {
      id,
    },
    onResponse(response) {
      if (response.status === 401) {
        console.log(response.statusText);
        // toast.error(response.statusText);
      }
    },
  });

  const handleSendMessage = async () => {
    // Push the new message to the messages array
    scrollToBottom();
    await append(
      {
        id,
        content: message,
        role: "user",
      },
      { functions: searchDataSchemas }
    );
  };

  useEffect(() => {
    sal();
  }, []);

  const scrollToBottom = (chat, action) => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };
  const chatAction = (chat, action) => {
    console.log("👉🏻 Line 411 : ", chat, action);

    switch (action) {
      case "SELECT": {
        setMessages(chat.messages);
        break;
      }
      case "DELETE": {
        deleteChatHistory(chat);
      }
      case "RESET": {
        resetToDefault();
      }
      default: {
        console.log("UNKNOWN_ACTION_REQUEST");
      }
    }
  };
  return (
    <>
      {console.log("👉🏻 Line 403 : ", userChatHistory)}
      <RightPanel
        data={userChatHistory}
        chatAction={(chat, action) => {
          chatAction(chat, action);
        }}
      />
      <div className="rbt-main-content">
        <div className="rbt-daynamic-page-content">
          <div className="rbt-dashboard-content">
            <div className="content-page">
              <div className="chat-box-list">
                <div className="rainbow-generartor-section rainbow-section-gap">
                  <div
                    className="section-title text-center sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="700"
                    data-sal-delay="100"
                  >
                    <h4 className="subtitle ">
                      <span className="theme-gradient">Web3Agent</span>
                    </h4>
                    <h2 className="title w-600 mb--10">
                    AI-Powered Web3 Learning Assistant
                    </h2>
                    <p className="description b1">
                    An AI-driven feature to simplify learning Web3 concepts, offering instant answers to key topics like blockchain, DeFi, NFTs, and smart contracts. 
                    
                      <br />
                      Perfect for users looking to expand their Web3 knowledge.
                    </p>
                  </div>
                  <div className="genarator-section">
                    {messages
                      .filter((item) => item?.content?.length)
                      .map((chat, index) =>
                        chat.role === "user" ? (
                          <div
                            key={index}
                            className="chat-box author-speech bg-flashlight mt--20"
                          >
                            <div className="inner">
                              <div className="chat-section">
                                <div className="author border border-2 border-success">
                                  <FaUserTie className="text-success" />
                                </div>
                                <div className="chat-content">
                                  <h6 className="title">You</h6>
                                  <p>{chat.content}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="chat-box author-speech bg-flashlight"
                          >
                            <div className="inner">
                              <div className="chat-section">
                                <div className="author border border-2 border-primary">
                                  <FaLaptopCode className="text-primary" />
                                </div>
                                <div className="chat-content">
                                  <h6 className="title">Web3 Agent</h6>
                                  {console.log("👉🏻 Line 223 : ", chat)}
                                  {COMPONENT_MOUNT_ACTIONS.includes(
                                    chat?.content
                                  ) ? (
                                    <MountComponent data={chat} />
                                  ) : (
                                    <Markdown
                                      remarkPlugins={[remarkGfm]}
                                      children={chat.content}
                                      components={{
                                        code(props) {
                                          const {
                                            children,
                                            className,
                                            node,
                                            ...rest
                                          } = props;
                                          const match = /language-(\w+)/.exec(
                                            className || ""
                                          );
                                          return match ? (
                                            <SyntaxHighlighter
                                              {...rest}
                                              PreTag="div"
                                              children={String(
                                                children
                                              ).replace(/\n$/, "")}
                                              language={match[1]}
                                            // style={a11yDark}
                                            />
                                          ) : (
                                            <code
                                              {...rest}
                                              className={className}
                                            >
                                              {children}
                                            </code>
                                          );
                                        },
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="rbt-static-bar">
              <div ref={containerRef} onKeyDown={handleKeyPress}>
                <Tooltip
                  id="my-tooltip"
                  className="custom-tooltip tooltip-inner"
                />
                <div className="new-chat-form">
                  <div
                    className="offcanvas offcanvas-bottom rounded bg-dark"
                    tabIndex="-1"
                    id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel"
                    style={{ position: "relative" }}
                  >
                    <div className="offcanvas-header p-4 border-bottom border-secondary">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasExampleLabel"
                      >
                        Query Commands
                      </h5>
                      <button
                        type="button"
                        className="btn-close bg-light"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body" style={{ height: '50vh' }}>
                      <div
                        className="border-bottom border-secondary pb-4"
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: 20,
                          overflow: 'auto'
                        }}
                      >
                        {getCategoryNames()?.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => setSelectedCategory(item)}
                            title={item}
                            // btnclassName={"btn p-3 btn-secondry border-gradient color-white my-4 fs-4"}
                            btnClass={`btn btn-outline-white color-white p-2 ${selectedCategory === item
                              ? "btn-outline-success"
                              : "btn-outline-secondary"
                              }`}
                            style={{ minWidth: "100px" }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "start",
                          alignItems: "start",
                        }}
                      >
                        {DEFAULT_PROMPT_MESSAGES.map(
                          (item, index) =>
                            (selectedCategory === "All" ||
                              selectedCategory === item.category) && (
                              <div
                                onClick={() => setMessage(item.example)}
                                data-bs-dismiss="offcanvas"
                                key={index}
                                className="py-2 text-light cursor-pointer text-start"
                              >
                                <i className="feather-terminal px-2"></i>
                                {item.example}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  className="new-chat-form border-gradient"
                  onSubmit={handleSubmit}
                >
                  <div className="left-icons">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setShowCommandPan(true)}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                      style={{
                        cursor: "pointer",
                        color: "white",
                        fontSize: "17px",
                      }}
                    >
                      <i className="feather-command"></i>
                    </button>
                  </div>
                  <textarea
                    rows="1"
                    placeholder="Send a message..."
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyPress}
                  />
                  <div className="right-icons">
                    <button
                      type="button"
                      className="form-icon icon-send"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Save Chat"
                      onClick={() => handleSaveChatHistoryClick()}
                    >
                      <i className="feather-bookmark"></i>
                    </button>
                    <button
                      type="submit"
                      className="form-icon icon-send"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Send message"
                    >
                      <i className="feather-send"></i>
                    </button>
                    <button
                      type="button"
                      className="form-icon icon-send"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Clear query"
                      onClick={() => resetToDefault()}
                    >
                      <i className="feather-refresh-ccw"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="rbt-static-bar">
              <form
                className='new-chat-form border-gradient'
                onSubmit={handleSubmit}
              >
                <div className='left-icons'>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setShowCommandPan(true)}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                    style={{
                      cursor: 'pointer',
                      color: "white",
                      fontSize: "17px"
                    }}
                  >
                    <i className='feather-command'></i>
                  </button>
                </div>
                <textarea
                  rows='1'
                  placeholder='Send a message...'
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyPress}
                />
                <div className='right-icons'>
                  <button
                    type='submit'
                    className='form-icon icon-send'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content='Send message'
                  >
                    <i className='feather-send'></i>
                  </button>
                  <button
                    type='button'
                    className='form-icon icon-send'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content='Clear query'
                    onClick={() => resetToDefault()}
                  >
                    <i className='feather-refresh-ccw'></i>
                  </button>
                </div>
              </form>

              <p className="b3 small-text">
                Web3Agent can make mistakes. Consider checking important information.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  promptContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    // padding: '20px',
    flexWrap: "wrap",
  },
  col: {
    display: "flex",
    justifyContent: "center",
  },
  promptCard: {
    backgroundColor: "#1a1a1a",
    borderColor: "#D11EE5",
    borderWidth: "1px",
    borderStyle: "solid",
    width: "100%",
    maxWidth: "300px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    textAlign: "left",
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
  },
  imgContainer: {
    marginRight: "15px",
  },
  img: {
    borderRadius: "5px",
  },
  promptText: {
    // marginBottom: '5px',
    fontSize: "1.5rem",
  },
  exampleText: {
    fontSize: "1rem",
  },
};

export default SearchData;
