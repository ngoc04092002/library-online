import React, { useContext } from 'react';
import ButtonWrapper from '../helpers/ButtonWrapper/ButtonWrapper';
import { CloseOutlined } from '@ant-design/icons';
import { BackDropContext } from '@/pages/Home';

const listField = [
	{
		label: 'quantity',
		placeholder: 'Nhập số lượng',
	},
	{
		label: 'name',
		placeholder: 'Nhập tên',
	},
	{
		label: 'address',
		placeholder: 'Nhập địa chỉ',
	},
	{
		label: 'tel',
		placeholder: 'Nhập số điện thoại',
	},
];

const DialogBookOrder = ({ text = 'Order', handleClick, value, handleChange }) => {
	const { toggleBackDrop } = useContext(BackDropContext);
	return (
		<div className='p-3 absolute bg-white w-[400px] z-[10000] top-7 left-1/2 -translate-x-1/2'>
			<ul className='flex items-center justify-between mb-3'>
				<li>{text}</li>
				<li
					className='cursor-pointer'
					onClick={toggleBackDrop}
				>
					<CloseOutlined className='text-lg' />
				</li>
			</ul>
			<div className='mb-3'>
				{' '}
				{text === 'Order' ? (
					listField.map((f, index) => {
						return (
							<input
								key={index}
								onChange={handleChange}
								value={value[f.label]}
								type={index === 0 ? 'number' : 'text'}
								name={f.label}
								placeholder={f.placeholder}
								className='w-full mb-2 border border-solid border-[#ccc]'
							/>
						);
					})
				) : (
					<input
						onChange={handleChange}
						value={value}
						type='number'
						name='quantity'
						placeholder='enter quantity'
						className='w-full border border-solid border-[#ccc]'
					/>
				)}
			</div>
			<ButtonWrapper
				onClick={handleClick}
				styles='float-right !mb-0'
			>
				{text}
			</ButtonWrapper>
		</div>
	);
};

export default DialogBookOrder;
