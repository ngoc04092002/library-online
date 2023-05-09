import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonWrapper from '../helpers/ButtonWrapper';
import Evaluate from '../Evaluate';
import { BackDropContext } from '@/pages/Home';
import dayjs from 'dayjs';
import DialogBookOrder from '../DialogBookOrder';
import BookReviewComment from '../BookReviewComment/BookReviewComment';
import Comments from '../Comments';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getBookById } from '@/infrastructure/dashboardActions';
import Loading from '../Loading/Loading';
import { getToast } from '@/utils/CustomToast';
import { initValueBookDetail } from '@/constants/initialValueBook';

const BookDetail = () => {
	const { id } = useParams();
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const [orderValue, setOrderValue] = useState(initValueBookDetail);
	const [open, setOpen] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: [`book/${id}`, id],
		queryFn: () => getBookById(id),
		staleTime: 2 * 60 * 1000,
		cacheTime: 5 * 60 * 1000,
	});

	const { mutate, isLoading: loadingOrder } = useMutation({
		mutationFn: (data) => {
			const res = createOrder(data);
			return res;
		},
	});

	if (isLoading) return <Loading />;
	const res = data.data;

	const handleOrder = () => {
		if (orderValue.quantity <= 0) {
			alert('quantity must be greater than 0');
			return;
		}
		orderValue.books = res;
		setOpen(false);
		toggleBackDrop();
		mutate(orderValue, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				if (!r.data) {
					getToast('Please again', 'error');
					return;
				}
				const localNames = localStorage.getItem('name')
					? JSON.parse(localStorage.getItem('name'))
					: [];
				localNames.push(orderValue.name);
				const names = new Set(localNames);
				localStorage.setItem('name', JSON.stringify(Array.from(names)));
				setOrderValue(initValueBookDetail);
				getToast('order success', 'success');
			},
		});
	};

	const changeOrder = (e) => {
		setOrderValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value.trim(),
		}));
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};
	const handleOpenConfirm = () => {
		if (Object.values(orderValue).includes('')) {
			alert('Please enter in full');
			return;
		}
		setOpen(true);
	};

	return (
		<>
			<div className='py-12 px-12'>
				<div className='w-full text-end'>
					<ButtonWrapper
						isLoading={loadingOrder}
						onClick={toggleBackDrop}
					>
						Order Book
					</ButtonWrapper>
				</div>
				<div>
					<h1 className='text-2xl font-bold mb-4'>{res.title}</h1>
					<ul>
						<li>
							author: <span>{res.author}</span>
						</li>
						<li>
							type: <span>{res.type}</span>
						</li>
						<li>
							pages: <span>{res.pages}</span>
						</li>
						<li>
							quantity sold: <span>{res.quantitySold}</span>
						</li>
						<li>
							release date: <span>{dayjs(res.releaseDate).format('DD-MM-YYYY')}</span>
						</li>
					</ul>
					<figure>
						<img
							src={res.src}
							alt=''
							style={{ width: '100%', height: '600px' }}
						/>
					</figure>
					<div className='mt-4'>{res.des}</div>
				</div>
				<Evaluate />
				<BookReviewComment />
				<Comments />
			</div>
			{showBackDrop && !open && (
				<DialogBookOrder
					handleClick={handleOpenConfirm}
					value={orderValue}
					handleChange={changeOrder}
				/>
			)}
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleOrder}
			/>
		</>
	);
};

export default BookDetail;
