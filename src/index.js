/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FindTicker from './components/FindTicker';
import MarketNews from './components/MarketNews';
import NewsFeed from './components/NewsFeed';
import ActiveTradedUSTickers from './components/ActiveTradedUSTickers';

// Market news updates
const rootScrollingText = ReactDOM.createRoot(
	document.getElementById('scrollingNewsContainer')
);
rootScrollingText.render(<MarketNews />);

// // Stock and description
// const rootFindTicker = ReactDOM.createRoot(
// 	document.getElementById('findTicker')
// );
// rootFindTicker.render(<FindTicker />);

// MostActively traded US ticker
const rootActiveTickers = ReactDOM.createRoot(
	document.getElementById('ActiveTickersContainer')
);
rootActiveTickers.render(<ActiveTradedUSTickers />);

//News Feed updates
const rootNewsFeedStock = ReactDOM.createRoot(
	document.getElementById('NewsFeedSectionContainer')
);
rootNewsFeedStock.render(<NewsFeed />);
