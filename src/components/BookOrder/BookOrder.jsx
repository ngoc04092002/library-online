import React, { useContext } from 'react';
import ButtonWrapper from '../helpers/ButtonWrapper/ButtonWrapper';
import { CloseOutlined } from '@ant-design/icons';
import { BackDropContext } from '@/pages/Home';

const BookOrder = () => {
	const { toggleBackDrop } = useContext(BackDropContext);
	return (
		<div className='p-3 absolute bg-white w-[400px] z-[10000] top-7 left-1/2 -translate-x-1/2'>
			<ul className='flex items-center justify-between mb-3'>
				<li>Order</li>
				<li
					className='cursor-pointer'
					onClick={toggleBackDrop}
				>
					<CloseOutlined className='text-lg' />
				</li>
			</ul>
			<div className='mb-3'>
				{' '}
				<input
					type='number'
					name='quantity'
					placeholder='enter quantity'
                    className='border border-solid border-[#ccc]'
				/>
			</div>
			<ButtonWrapper styles='float-right !mb-0'>Order</ButtonWrapper>
		</div>
	);
};

export default BookOrder;
