/** @format */

export default function TickerCard(props) {
	const stock = props.selectedStock;
	if (!stock) {
		return null; // Handle the case when 'value' is not defined
	}
	// console.log('selectedstock from tickerCard ', stock);

	return (
		// Description
		<div className='container shadow-lg'>
			<div className='row'>
				<div className='col'>
					<span className='d-block p-2 opacity-75 shadow-lg'>
						<h5 className='card-title display-6'>Description</h5>

						<div className='border border-success p-2 mb-2'>
							<article></article>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
}
