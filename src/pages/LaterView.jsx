import { BookOrders } from '@/components';
import ActionOrder from '@/components/BookOrders/ActionOrder';
import DialogConfirm from '@/components/DialogConfirm';
import { Button } from '@mui/material';
import React, { useState } from 'react';

const LaterView = () => {
	const [datas, setDatas] = useState(() => {
		const laterViewData = !!localStorage.getItem('orderBooks')
			? JSON.parse(localStorage.getItem('orderBooks'))
			: [];
		return laterViewData;
	});
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleDeleteAll = () => {
		localStorage.setItem('orderBooks', JSON.stringify([]));
		setDatas([]);
		setOpen(false);
	};

	return (
		<>
			<div className='py-12 px-10'>
				<h1 className='text-2xl font-bold text-center mb-10'>Orders</h1>
				{datas && !!datas.length ? (
					<Button
						variant='contained'
						color='primary'
						className='mr-2 bg-[#1976d2]'
						onClick={handleOpen}
					>
						Delete All
					</Button>
				) : (
					<a
						href='/'
						className='text-blue-600 text-center underline'
					>
						Order book
					</a>
				)}

				<div>
					<BookOrders
						fakeDatas={datas}
						setDatas={setDatas}
					/>
				</div>
				{datas && !!datas.length && <ActionOrder setDatas={setDatas} />}
			</div>
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleDeleteAll}
			/>
		</>
	);
};

export default LaterView;
