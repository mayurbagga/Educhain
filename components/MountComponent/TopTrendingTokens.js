import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Table from '../Table/Table';
import TableThead from '../Table/TableThead';
import TableRow from '../Table/TableRow';
import ChatLoader from '../Loading/ChatLoader';

export const TopTrendingTokens = ({ data: action }) => {
    const [gainerTokens, setGainerTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    const getGainerTokensDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/data-api/`,
                { action: "TOP_TRENDING_TOKENS" }
            );
            console.log("API response data for trending tokens:", data);
            setGainerTokens(data?.data?.[0] || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (action?.type === 'TOP_TRENDING_TOKENS') {
            getGainerTokensDetails();
        }
    }, [action]);

    const thead = () => {
        const headers = [
            { label: "#" },
            { label: "Name" },
            { label: "Symbol" },
            { label: "Market Cap" },
            { label: "Trading Volume" },
            { label: "Rank" },
            { label: "Price" },
            { label: "Price Change(%)" },
            { label: "Image" },
        ];
        return <TableThead headers={headers} theadClass="px-6 py-2 border" />;
    };

    const tbody = () => {
        return (
            <>
                {gainerTokens.map((token, index) => (
                    <TableRow key={index}>
                        <td className="whitespace-nowrap px-6 py-2">
                            {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.tokenName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.tokenSymbol}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.marketCap}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.tradingVolume}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.marketCapRank}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.currentPrice.toFixed(4)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            {token.priceChangePercentage.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                            <img src={token.imageUrl} alt={token.tokenName} width="32" height="32" />
                        </td>
                    </TableRow>
                ))}
            </>
        );
    };

    return (
        <div className='card mt-2 bg-dark'>
            {loading ? (
                <ChatLoader />
            ) : !gainerTokens.length ? (
                <div className='card-body text-center h3 pb-0 mb-0 theme-gradient'>No Data Found</div>
            ) : (
                <>
                    <div className='card-body text-center h3 pb-2 mb-1 theme-gradient'>Top Trending Tokens</div>
                    <div style={{ maxHeight: '60vh' }} className='table-responsive'>
                        <Table renderThead={thead()} renderTbody={tbody()} />
                    </div>
                </>
            )}
        </div>
    );
};
