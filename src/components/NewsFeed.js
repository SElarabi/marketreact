/** @format */

import React, { useEffect, useState } from 'react';
import getData from './getData';
import FeedCard from './FeedCard';
import TickerSentiment from './TickerSentiment';

function NewsFeed() {
	const [data, setData] = useState('');
	const [feeds, setFeeds] = useState([]);
	const newsFeedDataTestURL = './NEWS_FEED_LIST.json';

	// API end point
	const feedNewsApi =
		'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo';

	//getStockNews data
	const getFeednewsData = async () => {
		const newFeedsData = await getData(newsFeedDataTestURL);
		// const newFeedsData = await getData(feedNewsApi);
		setData(newFeedsData);

		setFeeds(newFeedsData.feed);

		//add timer for refreshin news avery hours
	};
	useEffect(() => {
		const timeNews = setInterval(() => {
			getFeednewsData();
		}, 60 * 60 * 60 * 1000);
		getFeednewsData();
		return () => {
			clearTimeout(timeNews); // clear timer
		};
	}, []);
	// Use a useEffect to log the updated feeds state
	useEffect(() => {}, [feeds]);
	return (
		<div
			id='feeds'
			className='row justify-content-center  align-items-start'
		>
			{feeds.length !== 0 && (
				<div className='col-8 mb-4 '>
					<h1 className='display-5 bg-primary'>MARKET FINANCE & TOPICS</h1>
					<div style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
						<ul className='list-group'>
							{feeds.map((feed, index) => (
								<li
									key={index}
									className='list-group-item my-2'
								>
									<FeedCard feed={feed} />
								</li>
							))}
						</ul>
					</div>
				</div>
			)}

			<div className='col-4 mb-4 d-flex flex-column '>
				<div style={{ marginTop: '0' }}>
					<h1 className='display-5 bg-primary'>MARKET SENTIMENT AND RELEVANCE</h1>
					<p>
						<span style={{ textDecoration: 'underline', color: 'blue' }}>
							Sentiment_score_definition:
						</span>
						{`x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish`}
					</p>
					<p>
						<span style={{ textDecoration: 'underline', color: 'red' }}>
							Relevance_score_definition:
						</span>
						{`0 < x <= 1, with a higher score indicating higher relevance.`}
					</p>
				</div>
				{feeds.length !== 0 && (
					<div style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
						<ul className='list-group'>
							{feeds.map((feed, index) => (
								<li
									key={index}
									className='list-group-item my-2'
								>
									<TickerSentiment feed={feed} />
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default NewsFeed;
