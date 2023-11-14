/** @format */

import React from 'react';
import TimeStampeFormater from './TimeStampeFormater';

function TickerSentiment({ feed }) {
	const sentiment = feed.ticker_sentiment;

	// Function to perform a Google search for the clicked word
	function searchGoogle(word) {
		const searchUrl = `https://www.google.com/search?q=${word}`;
		window.open(searchUrl, '_blank', 'noopener noreferrer');
		console.log('SEARCH ME ON GOOGLE');
	}

	function searchMe(ticker) {
		console.log('YOU JUST CLICKED ME', typeof ticker);
		const word = ticker + ' ' + 'stock';
		searchGoogle(word);
	}
	return (
		<div className='sentiBlock  justify-content-center d-flex flex-column'>
			{sentiment.map((senti, index) => (
				<span key={index}>
					<h1 className='display-6'>
						TICKER :
						<span
							className='searchable'
							onClick={() => searchMe(senti.ticker)}
						>
							{senti.ticker}
						</span>
					</h1>
					<h1
						className='display-6'
						style={{ color: 'seagreen' }}
					>
						Relevance Score : {senti.relevance_score}
					</h1>
					<h1 className='display-6'>
						Ticker Sentiment : {senti.ticker_sentiment_label}
					</h1>
					<h1
						className='display-6'
						style={{ color: 'blueviolet' }}
					>
						Ticker Sentiment Score : {senti.ticker_sentiment_score}
					</h1>
					<p>
						{feed.source}:
						<a
							href={feed.url}
							target='_blank'
							rel='noopener noreferrer'
							className='underline-link'
						>
							<p>{feed.source_domain}</p>
						</a>
					</p>

					<p style={{ textDecoration: 'underline' }}>
						{TimeStampeFormater(feed.time_published)}
					</p>
				</span>
			))}
		</div>
	);
}

export default TickerSentiment;
