/** @format */

import React from 'react';
import TimeStampeFormater from './TimeStampeFormater';
function FeedCard(props) {
	const feed = props.feed;
	// console.log(
	// 	'TimeStampeFormater(feed.time_published) ',
	// 	TimeStampeFormater(feed.time_published)
	// );

	return (
		<div>
			<div>
				<a
					href={feed.url}
					target='_blank'
					rel='noopener noreferrer'
					className='underline-link'
				>
					<h1 className='display-4'>{feed.title}</h1>
				</a>
				<p>Authors: {feed.authors}</p>
				<p>{TimeStampeFormater(feed.time_published)}</p>
				<figure>
					<img
						src={feed.banner_image}
						alt='...'
					></img>
				</figure>
			</div>
			<div>
				<span>
					<h1 className='display-6'>{feed.summary}</h1>
				</span>
				<span>
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
				</span>
			</div>
		</div>
	);
}

export default FeedCard;
