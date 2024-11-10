import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import Button from '../ui/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaClipboardList, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

import axios from "axios";

const FormCard = ({ contractAddress, abi }) => {
  const [formData, setFormData] = useState({
    // llmModelId: '',
    // requirement: '',
    // deadline: '',
    // reward: '',
    // indexId: '', // Add indexId field for acceptTraining
  });

  const { isConnected, address } = useAccount();
  const [signer, setSigner] = useState(null);

  const [openRequest, setOpenRequest] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);

  useEffect(() => {
    if (isConnected && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();
      setSigner(newSigner);
    }
  }, [isConnected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    if (!signer) {
      console.error('No signer available');
      return;
    }

    try {
      const rewardValue = formData.reward.toString().trim();
      if (isNaN(rewardValue) || rewardValue === '') {
        console.error('Invalid reward value');
        return;
      }
      const rewardInWei = ethers.utils.parseEther(rewardValue);

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.requestTraining(
        formData.llmModelId,           // LLM Model ID
        formData.requirement,          // Requirement
        formData.deadline,             // Deadline (Timestamp)
        rewardInWei,                   // Reward (in wei)
        { value: rewardInWei }         // Reward sent with the transaction
      );

      await tx.wait();
      console.log('Request Transaction successful:', tx);
      setOpenRequest(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // You can now handle the file, e.g., store it in formData or upload it to a server.
    console.log(file);
    setFormData({
      ...formData,
      llmScript: file, // Add the file to formData
      user: address
    });
  };
  
  const handleSubmitAccept = async (e) => {
    e.preventDefault();

    if (!signer) {
      console.error('No signer available');
      return;
    }

    try {
      const indexId = parseInt(formData.indexId); // The indexId is passed for acceptTraining
      if (isNaN(indexId) || indexId <= 0) {
        console.error('Invalid indexId');
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.acceptTraining(indexId);  // Only the indexId is passed

      await tx.wait();
      console.log('Accept Transaction successful:', tx);
      setOpenAccept(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

const handleSubmitSubmit = async (e) => {
    e.preventDefault();

    if (!signer) {
      console.error('No signer available');
      return;
    }

    try {
      const indexId = parseInt(formData.indexId);
      const fineTunedModelId = formData.fineTunedModel_Id;
      const datasetId = formData.dataset_Id;
      const fineTuneHostedScript = formData.fineTuneHostedScript;

      if (isNaN(indexId) || indexId <= 0) {
        console.error('Invalid indexId');
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.submitTraining(
        indexId,                // Pass indexId as the first parameter
        fineTunedModelId,       // Pass fineTunedModelId as the second parameter
        datasetId,              // Pass datasetId as the third parameter
        fineTuneHostedScript    // Pass fineTuneHostedScript as the fourth parameter
      );

      await tx.wait();
      console.log('Submit Transaction successful:', tx);

      console.log(formData);

      const r = await axios.post("http://localhost:4040/llm/submitTraining", formData,{
        headers: { 'Content-Type': 'multipart/form-data' }});
      console.log(r.data);

      setOpenSubmit(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };
  const handleClickOpen = (action) => {
    if (action === 'request') {
      setOpenRequest(true);
    } else if (action === 'accept') {
      setOpenAccept(true);
    } else if (action === 'submit') {
      setOpenSubmit(true);
    }
  };

  const handleClose = (action) => {
    if (action === 'request') {
      setOpenRequest(false);
    } else if (action === 'accept') {
      setOpenAccept(false);
    } else if (action === 'submit') {
      setOpenSubmit(false);
    }
  };

  return (
    <div className="rbt-main-content mb--0 mr--0">
      <div className="rbt-daynamic-page-content center-width">
        <div className="content-page pb--50">
          <div className="chat-box-list">
            <div className="crypto-table">
              <div className="text-center" style={{ marginTop:"150px"}}>
                <Button
                style={{marginRight:"10px"}}
                  btnClass="btn btn-secondry border-gradient color-white p-3 mt-4 mr-4 fs-4"
                  title="Training Request"
                  onClick={() => handleClickOpen('request')}
                />
                <Button
                 style={{marginRight:"10px"}}
                  btnClass="btn btn-secondry border-gradient color-white p-3 mt-4 fs-4 ml-4"
                  title="Accept Training"
                  onClick={() => handleClickOpen('accept')}
                />
                <Button
                 style={{marginRight:"10px"}}
                  btnClass="btn btn-secondry border-gradient color-white p-3 mt-4 fs-4 ml-4"
                  title="Submit Training"
                  onClick={() => handleClickOpen('submit')}
                />
              </div>
              

              {/* Request Training Dialog */}
              <Dialog open={openRequest} onClose={() => handleClose('request')} maxWidth="md" fullWidth>
                <DialogContent style={{ backgroundColor: '#070710' }}>
                  <div className="form-card-container" style={{ padding: '20px', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#070710' }}>
                    <h2 className="text-lg font-semibold text-center mb-4" style={{ color: '#FFF' }}>Training Request</h2>
                    <form onSubmit={handleSubmitRequest}>
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="llmModelId">LLM Model ID</label>
                        <input
                          type="text"
                          id="llmModelId"
                          name="llmModelId"
                          value={formData.llmModelId}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter LLM Model ID"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="requirement">Requirement</label>
                        <input
                          type="text"
                          id="requirement"
                          name="requirement"
                          value={formData.requirement}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter requirement"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="deadline">Deadline</label>
                        <input
                          type="number"
                          id="deadline"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter deadline timestamp"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="reward">Reward (in Ether)</label>
                        <input
                          type="number"
                          id="reward"
                          name="reward"
                          value={formData.reward}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter reward amount in Ether"
                          required
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 mr-10"
                          title="Submit"
                          type="submit"
                        />
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 ml-24"
                          title="Close"
                          onClick={() => handleClose('request')}
                        />
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Accept Training Dialog */}
              <Dialog open={openAccept} onClose={() => handleClose('accept')} maxWidth="md" fullWidth>
                <DialogContent style={{ backgroundColor: '#070710' }}>
                  <div className="form-card-container" style={{ padding: '20px', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#070710' }}>
                    <h2 className="text-lg font-semibold text-center mb-4" style={{ color: '#FFF' }}>Accept Training</h2>
                    <form onSubmit={handleSubmitAccept}>
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="indexId">Index ID</label>
                        <input
                          type="number"
                          id="indexId"
                          name="indexId"
                          value={formData.indexId}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter index ID"
                          required
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 mr-10"
                          title="Submit"
                          type="submit"
                        />
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 ml-24"
                          title="Close"
                          onClick={() => handleClose('accept')}
                        />
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Submit Training Dialog */}
              <Dialog open={openSubmit} onClose={() => handleClose('submit')} maxWidth="md" fullWidth>
                <DialogContent style={{ backgroundColor: '#070710' }}>
                  <div className="form-card-container" style={{ padding: '20px', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#070710' }}>
                    <h2 className="text-lg font-semibold text-center mb-4" style={{ color: '#FFF' }}>Submit Training</h2>
                      <form onSubmit={handleSubmitSubmit}>
    
                      <div className="mb-4">
                        <input
                          type="number"
                          id="indexId"
                          name="indexId"
                          value={formData.indexId}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter Index ID"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          id="fineTunedModel_Id"
                          name="fineTunedModel_Id"
                          value={formData.fineTunedModel_Id}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter Fine-Tuned Model ID"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          id="dataset_Id"
                          name="dataset_Id"
                          value={formData.dataset_Id}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter Dataset ID"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          id="fineTuneHostedScript"
                          name="fineTuneHostedScript"
                          value={formData.fineTuneHostedScript}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg focus:outline-none"
                          style={{ color: '#FFF', borderColor: '#777' }}
                          placeholder="Enter Fine-Tune Hosted Script"
                          required
                        />
                      </div>
                      <div className="mb-4">
                      <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fileUpload">
                        Upload File
                      </label>
                      <input
                        type="file"
                        id="llmScript"
                        name="llmScript"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 rounded-lg focus:outline-none"
                        style={{ color: '#FFF', borderColor: '#777' }}
                        required
                      />
                    </div>
                      <div className="text-center">
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 mr-10"
                          title="Submit"
                          type="submit"
                        />
                        <Button
                          btnClass="btn btn-secondry bg-gradient color-white p-3 mt-4 fs-4 ml-24"
                          title="Close"
                          onClick={() => handleClose('submit')}
                        />
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
