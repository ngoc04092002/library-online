import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DialogBookOrder from '../DialogBookOrder/DialogBookOrder';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '@/infrastructure/dashboardActions';
import Loading from '../Loading';
import { getToast } from '@/utils/CustomToast';
import { BackDropContext } from '@/pages/Home';

const BookOrder = ({ data }) => {
	const queryClient = useQueryClient();
	const [orderValue, setOrderValue] = useState(1);
	const [del, setDel] = useState(false);
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const [open, setOpen] = useState(false);
	const { mutate, isLoading } = useMutation({
		mutationFn: (data) => {
			const res = updateOrder(data);
			return res;
		},
	});

	useEffect(()=>{
		if(!showBackDrop){
			setOpen(false);
			setDel(false);
		}
	},[showBackDrop]);


	if (!data) return;
	const { books: book, quantity, id } = data;

	const handleOpen = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		toggleBackDrop();
		setOpen(false);
		setDel(true);
	};

	const handleClose = () => {
		toggleBackDrop();
		setOpen(false);
		setDel(false);
	};
	const handleOpenConfirm = (e) => {
		e.stopPropagation();
		setOpen(true);
		setDel(false);
	};

	const changeOrder = (e) => {
		if (+e.target.value <= quantity) {
			setOrderValue(e.target.value);
		}
	};

	const handleDelete = () => {
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
					toggleBackDrop();
					setOpen(false);
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
			{!open && showBackDrop && del && (
				<div className='inset-0 absolute bg-backdrop'>
					<DialogBookOrder
						text='Delete order'
						value={orderValue}
						handleChange={changeOrder}
						handleClick={handleOpenConfirm}
					/>
				</div>
			)}

			{showBackDrop && !del && (
				<DialogConfirm
					open={open}
					handleClose={handleClose}
					handleAccept={handleDelete}
				/>
			)}
		</>
	);
};

export default BookOrder;
