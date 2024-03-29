import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonWrapper from '../helpers/ButtonWrapper';
import { BackDropContext } from '@/pages/Home';
import dayjs from 'dayjs';
import DialogBookOrder from '../DialogBookOrder';
import Comments from '../Comments';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getBookById } from '@/infrastructure/dashboardActions';
import Loading from '../Loading/Loading';
import { getToast } from '@/utils/CustomToast';
import { initValueBookDetail } from '@/constants/initialValueBook';
import Evaluate from '../helpers/Evaluate';
import HeadTitle from '@/hooks/Head';
import { AuthContext } from '@/context/AuthProvider';
import { convertToVND } from '@/utils/CustomCurrency';

const BookDetail = () => {
	HeadTitle('Book Detail');
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const [orderValue, setOrderValue] = useState(initValueBookDetail);
	const [open, setOpen] = useState(false);
	const [selectStar, setSelectStar] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: [`book/${id}`, id],
		queryFn: () => getBookById(id),
		staleTime: 60 * 1000,
		cacheTime: 2 * 60 * 1000,
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
			alert('Số lượng phải lớn hơn 0');
			return;
		}
		orderValue.books = res;
		orderValue.name = user.username;
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
				localNames.push(user.username);
				const names = new Set(localNames);
				localStorage.setItem('name', JSON.stringify(Array.from(names)));
				getToast('Đặt thành công', 'success');
				setOrderValue(initValueBookDetail);
				setOpen(false);
				toggleBackDrop();
			},
		});
	};

	const changeOrder = (e) => {
		setOrderValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleClose = () => {
		toggleBackDrop();
		setOpen(false);
	};

	const handleClickOrder = () => {
		if (!Object.keys(user).length) {
			getToast('Bạn phải đăng nhập', 'warn');
			return;
		}
		setOpen(false);
		toggleBackDrop();
	};

	const handleOpenConfirm = () => {
		console.log(user, orderValue);
		if (Object.values(orderValue).includes('')) {
			alert('Vui lòng điền đầy đủ');
			return;
		}
		setOpen(true);
	};

	return (
		<>
			<div className='py-20 px-12'>
				<div className='w-full text-end'>
					<ButtonWrapper
						isLoading={loadingOrder}
						onClick={handleClickOrder}
					>
						Đặt sách
					</ButtonWrapper>
				</div>
				<div>
					<div className="flex items-center mb-8 border border-solid border-[#e8e8e8] p-4">
						<figure className='w-[30%]'>
							<img
								src={res.src}
								alt=''
								style={{ width: '100%', height: '300px' }}
							/>
						</figure>
						<div className='ml-8 w-[70%]'>
							<h1 className='text-2xl font-bold mb-4 text-[#337ab7]'>{res.title}</h1>
							<ul>
								<li className='mb-3'>
									Tác giả: <span>{res.author}</span>
								</li>
								<li className='mb-3'>
									Thể loại: <span className='text-[#337ab7]'>{res.type}</span>
								</li>
								<li className='mb-3'>
									Số trang: <span>{res.pages}</span>
								</li>
								<li className='mb-3'>
									Số lượng bán: <span>{res.quantitySold}</span>
								</li>
								<li className='mb-3'>
									Giá bán: <span>{convertToVND(res.price)}</span>
								</li>
								<li className='mb-3'>
									Ngày phát hành: <span>{dayjs(res.releaseDate).format('DD-MM-YYYY')}</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='mt-4'>{res.des}</div>
				</div>
				<Evaluate
					setSelectStar={setSelectStar}
					selectStar={selectStar}
					bookId={res.id}
				/>
				<Comments
					datas={res}
					selectStar={selectStar}
				/>
			</div>
			{showBackDrop && !open && (
				<DialogBookOrder
					handleClick={handleOpenConfirm}
					value={orderValue}
					handleChange={changeOrder}
				/>
			)}
			{showBackDrop && (
				<DialogConfirm
					open={open}
					handleClose={handleClose}
					handleAccept={handleOrder}
				/>
			)}
		</>
	);
};

export default BookDetail;
