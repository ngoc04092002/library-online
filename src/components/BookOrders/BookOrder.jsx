import { Button } from '@mui/material';
import React, { useState } from 'react';
import DialogBookOrder from '../DialogBookOrder/DialogBookOrder';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '@/infrastructure/dashboardActions';
import Loading from '../Loading';
import { getToast } from '@/utils/CustomToast';

const BookOrder = ({ data }) => {
	const queryClient = useQueryClient();
	const [orderValue, setOrderValue] = useState(1);
	const [showBackDrop, setShowBackDrop] = useState(false);
	const [open, setOpen] = useState(false);
	const { mutate, isLoading } = useMutation({
		mutationFn: (data) => {
			const res = updateOrder(data);
			return res;
		},
	});

	if (!data) return;
	const { books: book, quantity, id } = data;

	const handleOpen = () => {
		setShowBackDrop(true);
	};

	if (open || showBackDrop) {
		document.body.style.overflowY = 'hidden';
	} else {
		document.body.style.overflowY = 'overlay';
	}

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenConfirm = () => {
		setShowBackDrop(false);
		setOpen(true);
	};

	const changeOrder = (e) => {
		if (+e.target.value <= quantity) {
			setOrderValue(e.target.value);
		}
	};

	const handleDelete = () => {
		setOpen(false);
		setShowBackDrop(false);
		mutate(
			{ id, quantity: +orderValue },
			{
				onError: (res) => {
					if (typeof res.response?.data === 'string') {
						getToast(res.response?.data, 'error');
					}
					getToast('', 'network bad');
				},
				onSuccess: (r) => {
					setOrderValue(0);
					queryClient.invalidateQueries({ queryKey: [`orders-name`] });
					queryClient.invalidateQueries({ queryKey: [`orders`] });
					getToast('order success', 'success');
				},
			},
		);
	};
	return (
		<>
			<div className='flex sm:flex-row flex-col items-center rounded-md overflow-hidden justify-between shadow-006 p-3 mb-4'>
				<a
					href={`/book/${book.id}`}
					className='flex items-center w-full'
				>
					<div className='sm:w-[300px] w-1/2'>
						<img
							src={book.src}
							alt=''
							className='w-full h-56'
						/>
					</div>
					<div className='px-4 sm:w-[67%] w-1/2'>
						<h1 className='text-lg font-bold mb-4 break-all'>{book.title}</h1>
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
								order quantity: <span className='color-main'>{quantity}</span>
							</li>
						</ul>
					</div>
				</a>
				<Button
					variant='contained'
					color='primary'
					className='mr-2 sm:!mt-0 !mt-4 sm:!w-fit !w-full bg-[#1976d2]'
					onClick={handleOpen}
					disabled={isLoading}
				>
					{isLoading ? <Loading /> : 'Delete'}
				</Button>
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

export default BookOrder;
