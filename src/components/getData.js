/** @format */
import axios from 'axios'; // Import Axios
export default async function getData(url) {
	const newURL = url;

	// console.log('I GOT DATA');
	async function fetchData(url) {
		try {
			const response = await axios.get(url);

			const data = await response.data;
			// console.log('got this data to return ', await data);

			return data;

			// return await response.data;
		} catch (error) {
			console.error('Error:', error);
		}
	}
	return await fetchData(newURL);
}
// if (!response.ok) {
// 				throw new Error('Network response was not ok');
// 			} else
