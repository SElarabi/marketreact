/** @format */

import React from 'react';
import { useEffect } from 'react';

function TopTradedTicketCard({
	tradedStocks,
	loading,
	isMaximumCall,
	tagName,
}) {
	useEffect(() => {
		console.log('RENDERING TOP TRADED TICKERS');
	}, []);
	return (
		<div
			className='table-container'
			id={tagName}
		>
			{loading ? (
				isMaximumCall ? (
					<p>
						Not Authorized:!!! Exceeded Limit of Number data calls,TRY AGAIN LATER
					</p>
				) : (
					<p>Loading...</p>
				)
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>VOLUME</th>
							<th scope='col'>Equity</th>
							<th scope='col'>Price</th>
							<th scope='col'>Change $</th>
						</tr>
					</thead>
					<tbody>
						{tradedStocks.map((stock, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td className='td_volume'>{stock.volume}</td>
								<td className='td_ticker'>{stock.ticker}</td>
								<td className='td_price'>{stock.price}</td>
								<td className='td_changeAmount'>{stock.change_amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default TopTradedTicketCard;
