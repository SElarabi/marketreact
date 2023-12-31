/** @format */

import { React, useState, useEffect } from 'react';
import getData from './getData';

import isToday from 'date-fns/isToday/index';

const MarketNews = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const [isScrolling, setIsScrolling] = useState(false);

	const [topNews, setTopNews] = useState([
		{
			category: 'top news',
			datetime: '',
			headline: 'Loading .............',
			id: '',
			image: '',
			related: '',
			source: '',
			summary: '',
			url: '',
		},
	]);
	const apiKey = process.env.REACT_APP_ALPHAVANTAGE_KEY;
	const [marketNews, setMarketNews] = useState([]);
	const currentDate = new Date();
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};
	const isToday = currentDate.toLocaleDateString(undefined, options);

	// Create the URL with the token parameter
	const dataSrc = {
		// Define the API endpoint and parameters
		baseUrl: 'https://finnhub.io/api/v1',
		endpoint: '/news',
		category: 'general',
		apikey: apiKey,
	};
	// Create the URL with the token parameter
	// Replace with your actual API key
	const stocksDataTestURL = './storage.json';
	let toadyNewsURL = `https://finnhub.io/api/v1/news/?category=general&token=cks15g1r01qstsqsmda0cks15g1r01qstsqsmdag`;
	// `${ dataSrc.baseUrl }${ dataSrc.endpoint }?category=${ dataSrc.category }&token=${ dataSrc.apikey }`;

	// collect data from API function
	const collectData = async () => {
		// const data = await getData(stocksDataTestURL);
		const data = await getData(toadyNewsURL);
		console.log('collectedData :', data);
		setTopNews(data);
	};
	//  fetch for new data every 60min
	useEffect(() => {
		// console.log('DATA render FINHUB FETCH ');
		const timeNews = setInterval(() => {
			collectData();
		}, 60 * 60 * 60 * 1000);
		// Initialize data call
		collectData();
		return () => {
			clearTimeout(timeNews); // clear timer
		};
	}, []);

	// scrolling function
	const ScrollingText = (anyNews) => {
		if (!isScrolling) {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % anyNews.length);
		}
	};
	//updates scrolling text span .
	useEffect(() => {
		ScrollingText(topNews);

		const interval = setInterval(() => {
			setIsScrolling(!isScrolling);
		}, 10000);
		// Change the duration to control when text changes
		return () => {
			clearInterval(interval);
		};
	}, [isScrolling]);

	return (
		<>
			<span style={{ textTransform: 'uppercase', color: 'red' }}>{isToday} </span>
			<span style={{ textTransform: 'uppercase', color: '#0ab3c2' }}>
				{topNews[currentIndex].category} TODAY{': '}
			</span>
			<div
				id='scrollingText'
				className='scrollingText'
			>
				<span style={{ textTransform: 'uppercase', color: 'red' }}>
					{topNews[currentIndex].source}
				</span>
				:
				{/* <span style={{ textTransform: 'uppercase', color: 'red' }}>
					{currentText}
				</span> */}
				{topNews[currentIndex].headline} :
				<span style={{ textTransform: 'uppercase', color: '#0ab3c2' }}>
					...
					{topNews[currentIndex].summary}
				</span>
			</div>
			;
		</>
	);
};

export default MarketNews;
