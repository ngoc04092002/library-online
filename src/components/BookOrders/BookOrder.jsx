import { Button } from '@mui/material';
import React, { memo, useState } from 'react';
import DialogBookOrder from '../DialogBookOrder/DialogBookOrder';
import DialogConfirm from '../DialogConfirm/DialogConfirm';

const BookOrder = ({ book, resetData, books }) => {
	const [orderValue, setOrderValue] = useState(0);
	const [showBackDrop, setShowBackDrop] = useState(false);
	const [open, setOpen] = useState(false);

	if (!book) return;

	const handleOpen = () => {
		setShowBackDrop(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenConfirm = () => {
		setShowBackDrop(false);
		setOpen(true);
	};

	const changeOrder = (e) => {
		if (+e.target.value <= book.order) {
			setOrderValue(e.target.value);
		}
	};

	const handleDelete = () => {
		const newBookData = books.map((b) => {
			if (b.id === book.id) {
				const quantity = +b.order - +orderValue;
				if (quantity === 0) {
					return null;
				} else {
					b.order = quantity;
					return b;
				}
			}
			return b;
		});
		const omitNullData = newBookData.filter((b) => b !== null);

		localStorage.setItem('orderBooks', JSON.stringify(omitNullData));
		setOpen(false);
		setShowBackDrop(false);
		setOrderValue(0);
		resetData(omitNullData);
	};
	return (
		<>
			<div className='flex items-center rounded-md overflow-hidden justify-between shadow-006 p-3 mb-4'>
				<a
					href={`/book/${book.id}`}
					className='flex items-center'
				>
					<div className=''>
						<img
							src={book.src}
							alt=''
							className='w-[500px] h-56'
						/>
					</div>
					<div className='px-4'>
						<h1 className='text-lg font-bold mb-4'>{book.title}</h1>
						<ul>
							<li>
								author: <span>{book.author}</span>
							</li>
							<li>
								type: <span>{book.type}</span>
							</li>
							<li>
								pages: <span>{book.pages}</span>
							</li>
							<li>
								release date: <span>{book.releaseDate}</span>
							</li>
							<li>
								quantity sold: <span>{book.quantitySold}</span>
							</li>
							<li>
								order quantity: <span className='color-main'>{book.order}</span>
							</li>
						</ul>
					</div>
				</a>
				<div>
					<Button
						variant='contained'
						color='primary'
						className='mr-2 bg-[#1976d2]'
						onClick={handleOpen}
					>
						Delete
					</Button>
				</div>
			</div>
			{showBackDrop && (
				<div className='inset-0 absolute bg-backdrop'>
					<DialogBookOrder
						text='Delete order'
						value={orderValue}
						handleChange={changeOrder}
						handleClick={handleOpenConfirm}
						handleBackDrop={() => setShowBackDrop(false)}
					/>
				</div>
			)}

			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleDelete}
			/>
		</>
	);
};

export default memo(BookOrder);
