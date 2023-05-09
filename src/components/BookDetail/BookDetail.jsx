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
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/infrastructure/dashboardActions';
import Loading from '../Loading/Loading';
import { getToast } from '@/utils/CustomToast';

const BookDetail = () => {
	const { id } = useParams();
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const [orderValue, setOrderValue] = useState(1);
	const [open, setOpen] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: [`book/${id}`, id],
		queryFn: () => getBookById(id),
		staleTime: 10 * 60 * 1000,
		cacheTime: 20 * 60 * 1000,
	});

	if (isLoading) return <Loading />;
	const res = data.data;

	const handleOrder = () => {
		const { id,des, title, author,src, releaseDate, pages, type,quantitySold } = res;
		const orderData = {
			id,
			title,
			des,
			src,
			quantitySold,
			author,
			releaseDate: dayjs(releaseDate).format('YYYY-MM-DD'),
			pages,
			type,
			order: orderValue,
		};
		const getorders = localStorage.getItem('orderBooks');
		const orders = !!getorders ? JSON.parse(getorders) : [];
		let have = false;
		const newOrderDatas = orders.map((b) => {
			if (b.id === id) {
				const quantity = +b.order + +orderValue;
				b.order = quantity;
				have = true;
				return b;
			}
			return b;
		});
		if (!have) {
			newOrderDatas.push(orderData);
		}

		localStorage.setItem('orderBooks', JSON.stringify(newOrderDatas));
		setOpen(false);
		toggleBackDrop();
		setOrderValue('');
		getToast('order success', 'success');
	};

	const changeOrder = (e) => {
		const amountOrder = e.target.value;
		if(amountOrder>0){
			setOrderValue(e.target.value);
		}
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};
	const handleOpenConfirm = () => {
		setOpen(true);
	};

	return (
		<>
			<div className='py-12 px-12'>
				<div className='w-full text-end'>
					<ButtonWrapper onClick={toggleBackDrop}>Đặt sách</ButtonWrapper>
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
