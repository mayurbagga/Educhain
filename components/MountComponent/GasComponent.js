import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosHelper from '@/data/rest/axios';
import ChatLoader from '../Loading/ChatLoader';

const ETHEREUM_GAS_PRICE_QUERY_PARAMS = {
    provider: 'blockpi',
    network: 'ethereum',
    action: 'GAS_PRICE',
};
// const ETHEREUM_GAS_PRICE_QUERY_PARAMS = {
//     provider: 'covalent',
//     network: 'eth-mainnet',
//     action: 'GAS_PRICE',
// };
const BSC_GAS_PRICE_QUERY_PARAMS = {
    provider: 'blockpi',
    network: 'bsc',
    action: 'GAS_PRICE',
};
const AVALANCHE_GAS_PRICE_QUERY_PARAMS = {
    provider: 'covalent',
    network: 'avalanche-mainnet',
    action: 'GAS_PRICE',
};
const POLYGON_GAS_PRICE_QUERY_PARAMS = {
    provider: 'covalent',
    network: 'matic-mainnet',
    action: 'GAS_PRICE',
};
const OPBNB_GAS_PRICE_QUERY_PARAMS = {
    provider: 'covalent',
    network: 'bnb-opbnb-mainnet',
    action: 'GAS_PRICE',
};

export const getNetworkName = async (network = '') => {
    network = network.toLowerCase();
    if (network.includes('eth')) {
        return ETHEREUM_GAS_PRICE_QUERY_PARAMS;
    }
    if (network.includes('bsc')) {
        return BSC_GAS_PRICE_QUERY_PARAMS;
    }
    if (network.includes('avalanche')) {
        return AVALANCHE_GAS_PRICE_QUERY_PARAMS;
    }
    if (network.includes('polygon')) {
        return POLYGON_GAS_PRICE_QUERY_PARAMS;
    }
    if (network.includes('op')) {
        return OPBNB_GAS_PRICE_QUERY_PARAMS;
    }
    throw new Error('UNSUPPORTED_NETWORK');
};

export const GasComponent = ({ data: action }) => {
    const [gasPrice, setGasPrice] = useState({
        wei: '',
        gwei: '',
        network: '',
    });
    const [loading, setLoading] = useState(false);
    const getGasPrice = async () => {
        try {
            setLoading(true);
            const {
                provider,
                network,
                action: methodAction,
            } = await getNetworkName(action?.network);
            const payload = { action: methodAction, provider, query: { network } };
            console.log('🚀 ~ getGasPrice ~ payload:', payload);
            const { data } = await axiosHelper(
                `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/data-api/`,
                'POST',
                null,
                payload
            );
            setGasPrice(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getGasPrice();
    }, [action]);
    return (
        <div
            key={'gas-price'}
            className='card mt-2 bg-dark'
        >
            {
                loading ?
                    <ChatLoader />
                    :
                    Object.keys(gasPrice).length ?
                        <div className='chat-content p-4'>
                            <h6 className='mb--10'>Here is gas price:</h6>
                            <p>Network: {gasPrice?.network}</p>
                            <p>Gas in WEI: {gasPrice?.wei}</p>
                            <p>Gas in GWEI: {gasPrice?.gwei}</p>
                        </div> :
                        <div className='card-body text-center h3 pb-0 mb-0 theme-gradient'>No Data Found</div>
            }
        </div>
    );
};
