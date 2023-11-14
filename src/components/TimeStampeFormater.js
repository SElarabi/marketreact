/** @format */

import React from 'react';

function TimeStampeFormater(timeStamp) {
	const timeStp = timeStamp;

	const year = timeStp.slice(0, 4);
	const month = timeStp.slice(4, 6);
	const day = timeStp.slice(6, 8);
	const hour = timeStp.slice(9, 11);
	const minute = timeStp.slice(11, 13);
	const second = timeStp.slice(13, 15);

	const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	};
	const readableDate = date.toLocaleString('en-US', options);

	// console.log(readableDate);

	return readableDate;
}

export default TimeStampeFormater;
