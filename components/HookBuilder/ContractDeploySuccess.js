import React from 'react'
import Button from '../ui/Button'
import { GrPowerReset } from "react-icons/gr";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";

export default function ContractDeploySuccess({ data, reset }) {
    const shortenString = (str, count = 5) => `${str.slice(0, count)}...${str.slice(-count)}`;
    const copyToClipboard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '320px',
            minHeight: "600px"
            // backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)'
        }}
            className='rounded border-gradient'
        >
            <div className='h4 text-white'>Congratulations, contract successfully deployed 🎉</div>
            {data?.contractType === 'SMART_CONTRACT' && (
                !!data?.contract?.length &&
                <div
                    className='h6 text-white'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                    Address: {shortenString(data?.contract, 14)}
                    <MdContentCopy
                        title='Click to Copy'
                        style={{ cursor: 'pointer', width: '3rem', height: '3rem', color: 'darkmagenta' }}
                        onClick={() => copyToClipboard(data?.contract)}
                    />
                </div>

            )}
            {data?.contractType === 'SMART_CONTRACT' && (
                !!data?.transactionHash?.length &&
                <div
                    className='h6 text-white text-center'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                    Transaction hash: {shortenString(data?.transactionHash, 10)}
                    <MdContentCopy
                        title='Click to Copy'
                        style={{ cursor: 'pointer', width: '3rem', height: '3rem', color: 'darkmagenta' }}
                        onClick={() => copyToClipboard(data?.transactionHash)}
                    />
                </div>
            )}
            {data?.contractType === 'CROSS_CHAIN_TOKEN' && (
                <div
                    className='h6 text-white text-center'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        flexDirection: 'column',
                    }}>
                    <div>Owner: {data?.data?.owner || '-'}</div>
                    <div>Index: {data?.data?.index || '-'}</div>
                    <div>L1 Token Address: {data?.data?.l1_token_address || '-'}</div>
                    <div>L2 Token Address: {data?.data?.l2_token_address || '-'}</div>
                </div>
            )}
            <Button btnClass={"btn btn-secondry border-gradient color-white p-3 mt-4 fs-4"} title="Start New" onClick={reset} icon={GrPowerReset} iconclassName="text-white fs-3" />
        </div>
    )
}
