/** @format */

import React, { useEffect, useState } from 'react';
import getData from './getData';
import TopTradedTicketCard from './TopTradedTicketCard';
//import fs from 'fs-extra';
function ActiveTradedUSTickers() {
	const [gainers, setGainers] = useState([]);
	const [losers, setLosers] = useState([]);
	const [mostActivelyTraded, setMostActivelyTraded] = useState([]);
	const tickersSampleData = './TOP_GAINER_LOSER.json';
	const apiKey = process.env.REACT_APP_ALPHAVANTAGE_KEY;
	const [lastUpdateDate, setLastUpdateDate] = useState('');
	const [loading, setLoading] = useState(true);
	const [isMaximumCall, setIsMaximumCall] = useState(false);
	const [counter, setCounter] = useState(0);
	// const [counter, setCounter] = useState(
	// 	parseInt(localStorage.getItem('refreshCount')) || 0
	// );

	// SAMPLE DATA WAS RETRIEVED FROM https://www.alphavantage.co/documentation/#intelligence
	const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
	// // Create the URL with the token parameter
	// Replace with your actual API key
	//getStockNews data
	const getTickersData = async () => {
		if (!isMaximumCall) {
			try {
				const newTickers = await getData(tickersSampleData);

				//console.log('newTickers ', newTickers);
				setLastUpdateDate(newTickers.last_updated);
				setGainers(newTickers.top_gainers);
				setLosers(newTickers.top_losers);
				setMostActivelyTraded(newTickers.most_actively_traded);
				setLoading(false);
				updateRefreshCount();
				console.log('loading response from getTicker');
				// Set loading to false when data is received
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false); // Handle errors and set loading to false
			}
			return;
		}
	};
	//refresh count
	const updateRefreshCount = () => {
		setCounter((prevCounter) => {
			const newCounter = prevCounter + 1;
			//	localStorage.setItem('refreshCount', newCounter.toString());
			return newCounter;
		});
	};

	// fetching data from API

	useEffect(() => {
		getTickersData();
		const timeout = setInterval(getTickersData, 60 * 60 * 60 * 1000);
		console.log('REFRESHING THE LOAD');
		return () => {
			clearTimeout(timeout);
		}; // clear timer
	}, []);

	//update TOP_GAINER_LOSER FILE
	useEffect(() => {
		if (counter > 24) {
			setIsMaximumCall(true);
			setLoading(true);
		}
		console.log('counter ', counter);
		console.log('loading ', loading);
	}, [counter]);

	return (
		<div
			id='activeTradedTickerComponent'
			className='row '
		>
			<h1 className='display-4 '>
				Top Gainers, Losers, and Most Actively Traded Tickers (US Market)
			</h1>
			<p style={{ color: 'blueviolet' }}>Last Update : {lastUpdateDate}</p>
			{/* most_actively_traded SECTION */}
			<div className='col'>
				<h1 className='display-6'>Most Actively Traded</h1>
				<TopTradedTicketCard
					tradedStocks={mostActivelyTraded}
					loading={loading}
					isMaximumCall={isMaximumCall}
					tagName={'mostActivelyTraded'}
				/>
			</div>

			{/* TOP GAINERS SECTION */}
			<div className='col'>
				<h1 className='display-6'>TOP GAINERS </h1>
				<TopTradedTicketCard
					tradedStocks={gainers}
					loading={loading}
					isMaximumCall={isMaximumCall}
					tagName={'topGainerTickers'}
				/>
			</div>
			{/* TOP LOSERS SECTION */}
			<div className='col'>
				<h1 className='display-6 '>TOP LOSERS </h1>
				<TopTradedTicketCard
					tradedStocks={losers}
					loading={loading}
					isMaximumCall={isMaximumCall}
					tagName={'toplosersTickers'}
				/>
			</div>
		</div>
		// end of row
	);
}

export default ActiveTradedUSTickers;
