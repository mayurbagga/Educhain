import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import TermsPolicy from "@/components/TermsPolicy/TermsPolicy";
import NewTokenList from "@/components/NewTokenList/NewTokenList";
import FormCard from "@/components/Babylon/Babylon";

const TermsPolicyPage = () => {

  const contractAddress = "0x0c26bFB952af70829C91ada9f2e860e70225C810";
  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "llmIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "llmModelLink",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "requirement",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "llmRequest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fineTunedModelId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "datasetId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fineTuneHostedScript",
          "type": "string"
        }
      ],
      "name": "llmSubmitted",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "LlmIndex",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "llmModelId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "requirement",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        }
      ],
      "name": "acceptTraining",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "giveReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "llmModelId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "requirement",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "requestTraining",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "retrieveTrainingUser",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "userAcceptTime",
              "type": "uint256"
            }
          ],
          "internalType": "struct LLMTrainingRequest.TrainingUserRequest",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "fineTunedModelId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "datasetId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fineTuneHostedScript",
          "type": "string"
        }
      ],
      "name": "submitTraining",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userTrainingAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "userAcceptTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
  return (
    <>
      <PageHead title="Token List" />

      <main className="page-wrapper rbt-dashboard-page">
        <Context>
          <div className="rbt-panel-wrapper">
            <HeaderDashboard display="d-none" />
            <PopupMobileMenu />
            <LeftpanelDashboard />

            <NewTokenList />
          </div>

          {/* <FormCard contractAddress={contractAddress} abi={abi}></FormCard> */}

        </Context>
      </main>
    </>
  );
};

export default TermsPolicyPage;
