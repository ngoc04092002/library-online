import Loading from '@/components/Loading';
import { deleteOrderById, getOrders } from '@/infrastructure/dashboardActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import './order.scss';
import DialogConfirm from '@/components/DialogConfirm';
import ButtonWrapper from '@/components/helpers/ButtonWrapper';
import { getToast } from '@/utils/CustomToast';

const head = ['#', 'Tên sách', 'Tên người đùng', 'Địa chỉ', 'Số lượng'];

const Order = () => {
    const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
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

	const handlePaid = (id) => {
		mutate(id, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                setOpen(false);
				getToast('Thanh toán thanh công', 'success');
			},
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = () => {
		setOpen(true);
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
											styles='whitespace-nowrap mr-1 !bg-white border border-solid border-[#0072ff] p-2 text-[#0072ff] hover:!bg-[#0072ff] hover:text-white'
											onClick={handleConfirm}
										>
											Thanh toán
										</ButtonWrapper>
									</td>
									<DialogConfirm
										open={open}
										handleClose={handleClose}
										handleAccept={() => handlePaid(r.id)}
									/>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Order;
