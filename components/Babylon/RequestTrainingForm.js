import React, { useState } from 'react';
import Web3 from 'web3';
import { useAccount, useSigner } from 'wagmi'; // Assuming wagmi for wallet connection

const RequestTrainingForm = ({ contract }) => {
  const [llmModelId, setLlmModelId] = useState('');
  const [requirement, setRequirement] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reward, setReward] = useState('');
  const { data: signer } = useSigner();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedDeadline = new Date(deadline).getTime() / 1000; // Convert to timestamp
      const parsedReward = Web3.utils.toWei(reward, 'ether'); // Convert to Wei
      const tx = await contract.methods
        .requestTraining(llmModelId, requirement, parsedDeadline, parsedReward)
        .send({ from: signer.address, value: parsedReward });
      console.log('Transaction success:', tx);
    } catch (err) {
      console.error('Error requesting training:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>LLM Model ID</label>
        <input
          type="text"
          value={llmModelId}
          onChange={(e) => setLlmModelId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Requirement</label>
        <textarea
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reward (ETH)</label>
        <input
          type="number"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          required
        />
      </div>
      <button type="submit">Request Training</button>
    </form>
  );
};

export default RequestTrainingForm;
