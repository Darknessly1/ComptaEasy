import React, { useState, useEffect } from 'react';

const NewsCard = ({ title, description, imageUrl, sourceUrl }) => (
  <div className="overflow-hidden bg-gray-200/50 p-6 rounded-md shadow-md">
    <img className="mb-4 rounded-md w-full h-32 object-cover no-blur" src={imageUrl} alt={title} />
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block"
    >
      Read More
    </a>
  </div>
);

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = 'bc2e9b072f734d5798f6022eec1d9d74';
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      })
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-8">World Economy News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((newsItem, index) => (
          <NewsCard
            key={index}
            title={newsItem.title}
            description={newsItem.description}
            imageUrl={newsItem.urlToImage}
            sourceUrl={newsItem.url}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
