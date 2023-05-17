import React from 'react';

import Search from './Search';

const SeachContainer = ({ isTippy = false }) => {
	return (
		<section className='flex flex-1'>
			<Search isTippy={isTippy} />
		</section>
	);
};

export default SeachContainer;
