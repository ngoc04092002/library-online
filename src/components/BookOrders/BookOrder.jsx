import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DialogBookOrder from '../DialogBookOrder/DialogBookOrder';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '@/infrastructure/dashboardActions';
import Loading from '../Loading';
import { getToast } from '@/utils/CustomToast';
import { BackDropContext } from '@/pages/Home';
import { convertToVND } from '@/utils/CustomCurrency';

const BookOrder = ({ data }) => {
	const queryClient = useQueryClient();
	const [haveAdd, setHaveAdd] = useState(false);
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

	useEffect(() => {
		if (!showBackDrop) {
			setOpen(false);
			setDel(false);
		}
	}, [showBackDrop]);

	if (!data) return;
	const { books: book, quantity, id } = data;

	const handleOpen = (isAdd) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setHaveAdd(() => isAdd);
		setOpen(() => false);
		setDel(() => true);
		toggleBackDrop();
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
		if ((!haveAdd && +quantity - +e.target.value < 0) || +e.target.value < 0) {
			return;
		}
		setOrderValue(e.target.value);
	};

	const handleDelete = () => {
		mutate(
			{ id, quantity: +orderValue, haveAdd },
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
					getToast(`${haveAdd ? 'Thêm':'Hủy'} thành công`, 'success');
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
								Tác giá: <span>{book.author}</span>
							</li>
							<li>
								Thể loại: <span>{book.type}</span>
							</li>
							<li>
								Số trang: <span>{book.pages}</span>
							</li>
							<li>
								Ngày phát hành: <span>{book.releaseDate}</span>
							</li>
							<li>
								Số lượng bán: <span>{book.quantitySold}</span>
							</li>
							<li>
								Giá bán: <span>{convertToVND(book.price)}</span>
							</li>
							<li>
								Số lượng đã đặt: <span className='color-main'>{quantity}</span>
							</li>
						</ul>
					</div>
				</a>
				<div className='flex flex-col items-center'>
					<Button
						variant='contained'
						color='primary'
						className='mr-2 whitespace-nowrap !mb-4 sm:!mt-0 !mt-4 sm:!w-fit !w-full !bg-[#f03c3c]'
						onClick={() => handleOpen(false)}
						disabled={isLoading}
					>
						{isLoading ? <Loading /> : 'Hủy đặt'}
					</Button>
					<Button
						variant='contained'
						color='primary'
						className='mr-2 sm:!mt-0 !mt-4 sm:!w-fit !w-full bg-[#1976d2]'
						onClick={() => handleOpen(true)}
						disabled={isLoading}
					>
						{isLoading ? <Loading /> : 'Thêm'}
					</Button>
				</div>
			</div>
			{!open && showBackDrop && del && (
				<div className='inset-0 absolute bg-backdrop'>
					<DialogBookOrder
						text={haveAdd ? 'Thêm số lượng' : 'Hủy số lượng'}
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
