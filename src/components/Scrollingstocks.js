/** @format */

import React from 'react';

function Scrollingstocks() {
	const currentDate = new Date();
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};
	const isToday = currentDate.toLocaleDateString(undefined, options);
	return (
		<>
			<div
				id='newsFeed'
				className='scrollingText'
			>
				<span style={{ textTransform: 'uppercase', color: '#0ab3c2' }}>
					TODAY{': '}
				</span>
				<span style={{ textTransform: 'uppercase', color: 'red' }}>{isToday} </span>
			</div>
		</>
	);
}

export default Scrollingstocks;
