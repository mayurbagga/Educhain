import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = ({ newsTitle, createdAt, newsUrl, source }) => {
  return (
    <div className="news-card">
      <h3 className="news-title">{newsTitle}</h3>
      <p className="news-source">{source}</p>
      <p className="news-date">{new Date(createdAt).toLocaleDateString()}</p>
      <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a>
    </div>
  );
};

const TopLatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_WEB_THREE_AGENT_NODE_APP}/api/v1/data-api/`, {
          action: 'TOP_LATEST_NEWS',
        });
        if (response.data.success) {
          setNews(response.data.data);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        setError('An error occurred while fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="news-container">
      {news.map((item, index) => (
        <NewsCard
          key={index}
          newsTitle={item.newsTitle}
          createdAt={item.createdAt}
          newsUrl={item.newsUrl}
          source={item.source}
        />
      ))}
    </div>
  );
};

export default TopLatestNews;
