import { BookOrders } from '@/components';
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const fakeDatas = [
	{
		id: 1,
		title:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae odit? Fugavoluptas necessitatibus expedita corrupti. Labore nemo sed corrupti molestias, optio saepeimilique ullam dolores debitis adipisci architecto quia.',
		author: 'author',
		releaseDate: dayjs().format('DD-MM-YYYY'),
		pages: '3000',
		type: 'horrified',
		order: 3,
	},
	{
		id: 2,
		title:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae odit? Fugavoluptas necessitatibus expedita corrupti. Labore nemo sed corrupti molestias, optio saepeimilique ullam dolores debitis adipisci architecto quia.',
		author: 'author',
		releaseDate: dayjs().format('DD-MM-YYYY'),
		pages: '1000',
		type: 'horrified',
		order: 1,
	},
];

const LaterView = () => {
	const [datas, setDatas] = useState(fakeDatas);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleDeleteAll = () => {
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
