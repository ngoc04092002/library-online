import Loading from '@/components/Loading';
import { deleteOrderById, getOrders, updateBooksSold } from '@/infrastructure/dashboardActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import './order.scss';
import DialogConfirm from '@/components/DialogConfirm';
import ButtonWrapper from '@/components/helpers/ButtonWrapper';
import { getToast } from '@/utils/CustomToast';
import { BackDropContext } from '../Home';

const head = ['#', 'Tên sách', 'Tên người đùng', 'Địa chỉ', 'Số lượng'];

const Order = () => {
	const queryClient = useQueryClient();
	const { toggleBackDrop, showBackDrop } = useContext(BackDropContext);
	const [open, setOpen] = useState(false);
	const [select, setSelect] = useState(0);
	const { data, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: () => getOrders(),
		staleTime: 3 * 30 * 1000,
		cacheTime: 4 * 60 * 1000,
	});
	const res = data?.data || [];

	const { mutate, isLoading: loadingRemove } = useMutation({
		mutationFn: (data) => {
			const res = deleteOrderById(data);
			return res;
		},
	});

	const { mutate: mutatePaid } = useMutation({
		mutationFn: (data) => {
			const res = updateBooksSold(data);
			return res;
		},
	});

	const handlePaid = (id) => {
		const order = res.filter((r) => r.id === id);
		const d = new Date();
		const month = d.getMonth() + 1;
		const year = d.getFullYear();

		const formPaid = {
			bookId: order[0].books.id,
			month,
			year,
			solds: order[0].quantity,
		};
		console.log(formPaid);
		mutatePaid(formPaid, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				mutate(id, {
					onError: (res) => {
						if (typeof res.response?.data === 'string') {
							getToast(res.response?.data, 'error');
						}
						getToast('', 'network bad');
					},
					onSuccess: (r) => {
						getToast('Thanh toán thanh công', 'success');
						queryClient.invalidateQueries({ queryKey: ['orders'] });
						setOpen(false);
						toggleBackDrop();
					},
				});
				queryClient.invalidateQueries({ queryKey: ['get-books_sold-info'] });
			},
		});
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};

	const handleConfirm = (id) => {
		toggleBackDrop();
		setOpen(true);
		setSelect(id);
	};

	return (
		<div className='bg-white mb-10'>
			{isLoading ? (
				<Loading styles='!color-main' />
			) : (
				<table
					id='customers'
					className='table'
				>
					<thead className='p-3'>
						<tr>
							{head.map((h) => (
								<th
									key={h}
									scope='col'
									style={{ whiteSpace: 'nowrap' }}
								>
									{h}
								</th>
							))}
							<th
								scope='col'
								style={{ width: '12%' }}
							>
								Lựa chọn
							</th>
						</tr>
					</thead>
					<tbody className='p-3'>
						{res &&
							!!res.length &&
							res.map((r) => (
								<tr key={r.id}>
									<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>
										<a
											href={`/book/${r.books.id}`}
											style={{ whiteSpace: 'nowrap' }}
											className='hover:color-main'
										>
											Tới xem
										</a>
									</td>

									<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>{r.books.title}</td>
									<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>{r.name}</td>
									<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>{r.address}</td>
									<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>{r.quantity}</td>
									<td className='mt-2'>
										<ButtonWrapper
											isLoading={loadingRemove}
											styles='whitespace-nowrap mr-1 !bg-white border border-solid border-[#0072ff] p-2 !text-[#0072ff] hover:!bg-[#0072ff] hover:!text-white'
											onClick={() => handleConfirm(r.id)}
										>
											Thanh toán
										</ButtonWrapper>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
			<DialogConfirm
				open={open && showBackDrop}
				handleClose={handleClose}
				handleAccept={() => handlePaid(select)}
			/>
		</div>
	);
};

export default Order;
