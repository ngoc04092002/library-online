import Loading from '@/components/Loading';
import {
	deleteOrderById,
	getOrders,
	updateBooksSold,
	updateStatus,
} from '@/infrastructure/dashboardActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import './order.scss';
import DialogConfirm from '@/components/DialogConfirm';
import ButtonWrapper from '@/components/helpers/ButtonWrapper';
import { getToast } from '@/utils/CustomToast';
import { BackDropContext } from '../Home';
import { RedoOutlined } from '@ant-design/icons';
import { StatusOrder } from '@/components';

const head = ['#', 'Tên sách', 'Tên người đùng', 'Địa chỉ', 'Trạng thái', 'Số lượng'];

const Order = () => {
	const queryClient = useQueryClient();
	const [loadingRefesh, setLoadingRefesh] = useState(false);
	const { toggleBackDrop, showBackDrop } = useContext(BackDropContext);
	const [open, setOpen] = useState(false);
	const [isPaid, setIsPaid] = useState(false);
	const [select, setSelect] = useState(0);
	const { data, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: () => getOrders(),
	});
	const res = data?.data || [];

	const { mutate, isLoading: loadingRemove } = useMutation({
		mutationFn: (data) => {
			const res = deleteOrderById(data);
			return res;
		},
	});

	const { mutate: mutateOrder, isLoading: loadingOrder } = useMutation({
		mutationFn: (ids) => {
			const res = updateStatus(2, ids);
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

		if (!isPaid) {
			mutate(
				{ id, quantity: order[0].quantity },
				{
					onError: (res) => {
						if (typeof res.response?.data === 'string') {
							getToast(res.response?.data, 'error');
						}
						getToast('', 'network bad');
					},
					onSuccess: (r) => {
						getToast('Hủy thanh công', 'success');
						queryClient.invalidateQueries({ queryKey: ['orders'] });
						setOpen(false);
						toggleBackDrop();
					},
				},
			);
			queryClient.invalidateQueries({ queryKey: ['get-books_sold-info'] });
			return;
		}
		const d = new Date();
		const month = d.getMonth() + 1;
		const year = d.getFullYear();

		const formPaid = {
			bookId: order[0].books.id,
			month,
			year,
			solds: order[0].quantity,
		};
		mutatePaid(formPaid, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				mutateOrder([id], {
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
						setIsPaid(false);
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

	const handleConfirm = (id, ispaid) => {
		toggleBackDrop();
		setIsPaid(ispaid);
		setOpen(true);
		setSelect(id);
	};

	const handleRefresh = () => {
		setLoadingRefesh(true);
		setTimeout(() => {
			setLoadingRefesh(false);
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}, 1000);
	};

	return (
		<div className='bg-white mb-10 pt-1 p-2 rounded shadow-lg'>
			<div
				onClick={handleRefresh}
				className='mb-2 p-3 cursor-pointer w-fit rounded flex items-center hover:bg-[#e2e2e2]'
			>
				{loadingRefesh ? (
					<Loading styles='!color-main !text-sm' />
				) : (
					<div className='flex items-center'>
						<RedoOutlined /> Refresh
					</div>
				)}
			</div>
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
							res.map((r) => {
								return (
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
										<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>
											<StatusOrder status={r.status} />
										</td>
										<td style={{ wordBreak: 'break-word', maxWidth: '22%' }}>{r.quantity}</td>
										<td className='mt-2'>
											<ButtonWrapper
												isLoading={loadingOrder}
												styles='whitespace-nowrap !w-full mr-1 !bg-white border border-solid border-[#0072ff] p-2 !text-[#0072ff] hover:!bg-[#0072ff] hover:!text-white'
												onClick={() => handleConfirm(r.id, true)}
											>
												Thanh toán
											</ButtonWrapper>
											<ButtonWrapper
												isLoading={loadingRemove}
												styles='whitespace-nowrap !w-full mr-1 !bg-white border border-solid border-[#ff0000] p-2 !text-[#ff0000] hover:!bg-[#ff0000] hover:!text-white'
												onClick={() => handleConfirm(r.id, false)}
											>
												Hủy
											</ButtonWrapper>
										</td>
									</tr>
								);
							})}
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
