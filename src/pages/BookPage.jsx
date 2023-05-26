import { Books } from '@/components';
import HeadTitle from '@/hooks/Head';
import React from 'react';

const BookPage = () => {
	HeadTitle('Home');
	return (
		<div className='py-20 px-10'>
			<Books />
		</div>
	);
};

export default BookPage;
