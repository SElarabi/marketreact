/** @format */

import React, { useState, useEffect } from 'react';

import getData from './getData';

function FindTicker() {
	const [value, setValue] = useState('');
	const [stock, setStock] = useState({});
	const [testData, setTestData] = useState([]);
	// State to control dropdown visibility
	const [showDropdown, setShowDropdown] = useState(false);
	const [description, setDescription] = useState('...');
	const stocksUS = './STOCK_LIST_US.json';
	const stocksXNYC = './STOCK_LIST_XNYC.json';
	const stocksXNAS = './STOCK_LIST_XNAS.json';
	// enter key handler
	const verifyUserInput = () => {
		console.log('input ', value);
		const newStock = testData.find(
			(item) => item.displaySymbol.toLowerCase() === value.toLowerCase()
		);
		console.log('newStock ', newStock);
		if (newStock) {
			setStock(newStock);
			setDescription(newStock.description);
			console.log('newStock.description ', newStock.description);

			return handleStockDescription(newStock);
		} else {
			setStock({});
			setDescription('...');
		}
	};
	//set state for input value
	const handleSelectChange = (event) => {
		setValue(event.target.value);
	};

	// collect data from API function
	const collectData = async () => {
		const data = await getData(stocksUS);
		setTestData(data);

		// console.log('Stock_Ticker_list_DATA', data);
	};
	//First start up fetching data from API and update EVERY XX MIN
	useEffect(() => {
		collectData();
	}, []);
	//update Description field
	useEffect(() => {
		handleStockDescription(stock);
	}, [value, description]);

	// Filter the items that match the input value
	const filteredData = testData.filter((item) =>
		item.displaySymbol.toLowerCase().includes(value.toLowerCase())
	);

	// Description args
	const handleStockDescription = (stock) => {
		return (
			<div id='descriptionDetail'>
				{value.toLocaleUpperCase() === stock.symbol ? (
					<span>
						<p>{stock.displaySymbol}</p>
						<p>{stock.description}</p>
						<p>TYPE : {stock.type}</p>
						<p>EXCHANGE :{stock.mic}</p>
					</span>
				) : (
					<p>{`.....`}</p>
				)}
			</div>
		);
	};

	// Function to handle selecting an item from the dropdown
	const handleDropdownSelect = (selectedValue) => {
		// Hide the dropdown when an item is selected
		setShowDropdown(false);
		setValue(selectedValue);
	};

	// Render the autocomplete dropdown if there is a value, matching data, and the dropdown should be shown
	const renderAutocompleteDropdown = () => {
		if (value && filteredData.length > 0 && showDropdown) {
			return (
				<div
					className='autocomplete-dropdown'
					id='autocompleteDropdown'
				>
					{filteredData.map((item) => (
						<div>
							<div
								className='autocomplete-item'
								key={item.symbol.toLowerCase}
								onClick={() => {
									handleDropdownSelect(item.displaySymbol);
									setDescription(item.description);
									setStock(item);
								}}
							>
								{item.symbol}
							</div>
							<span>
								<p>{item.description}</p>
							</span>
						</div>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<>
			{/* input_auto_Complete */}
			{/* <div id='input_auto_Complete'></div> */}

			<span style={{ color: 'white' }}>
				<p>STOCK </p>
			</span>
			<input
				// className='autocomplete'
				type='text'
				id='searchInput'
				placeholder='Search...'
				value={value}
				onClick={() => setShowDropdown(true)} // Show the dropdown when the input field is clicked
				onChange={(e) => {
					setValue(e.target.value);
					// Show the dropdown when the input value changes
					setShowDropdown(true);
					setValue(e.target.value);
				}}
				onKeyDown={(e) => {
					setShowDropdown(false);
					// Hide the dropdown when Enter key is pressed
					if (e.key === 'Enter') {
						verifyUserInput();
					}
				}}
				onSelect={handleSelectChange}
			/>
			{renderAutocompleteDropdown()}

			{/* <!-- Span Description --------------------------> */}
			{!showDropdown && (
				<>
					<span
						id='stockDescription'

						// className='d-block p-2 opacity-75 autocomplete '
					>
						<p>Description </p>
					</span>
					<div className='border border-success  description'>
						{stock && handleStockDescription(stock)}
					</div>
				</>
			)}
		</>

		//
	);
}

export default FindTicker;
