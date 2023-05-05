import React from 'react';
import { useParams } from 'react-router-dom';
import ButtonWrapper from '../helpers/ButtonWrapper';

const BookDetail = () => {
	const { id } = useParams();
	console.log(id);
	return (
		<div className='py-12 px-12'>
			<div className='w-full text-end'>
				<ButtonWrapper>Đặt sách</ButtonWrapper>
			</div>
		</div>
	);
};

export default BookDetail;
