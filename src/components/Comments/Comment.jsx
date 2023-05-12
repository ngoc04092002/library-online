import React, { useContext } from 'react';
import { getImage } from '@/utils/CustomImagePath';
import { getTimeAgo } from '@/utils/FormatTime';
import { AuthContext } from '@/context/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { removeReview } from '@/infrastructure/reviewAction';
import { getToast } from '@/utils/CustomToast';

const Comment = ({ data, setReviews }) => {
	const { user } = useContext(AuthContext);
	const isOwner = user?.id === data?.clientEntity?.id;

	const { mutate } = useMutation({
		mutationFn: (data) => {
			const res = removeReview(data);
			return res;
		},
	});

	const handleDelete = () => {
		mutate(data.id, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				getToast('Delete success', 'success');
				setReviews((prev) => {
					const newReview = prev.filter((p) => p.id !== data.id);
					return newReview;
				});
			},
		});
	};

	return (
		<div className='flex items-center mt-4'>
			<div className='w-10 h-10'>
				<img
					src={getImage('user.png')}
					alt=''
					className='w-full'
				/>
			</div>
			<div className='ml-2 w-fit'>
				<p
					className={`w-fit p-2 text-[15px] mx-2  rounded-md ${
						isOwner ? 'bg-main text-white' : 'bg-[#f7f8f9]'
					}`}
				>
					{data.des}
				</p>
				<div className='flex items-center'>
					<p className='mx-2 text-sm font-bold'>{getTimeAgo(data.createdAt)}</p>
					{isOwner && (
						<p
							className='mx-2 text-sm font-bold cursor-pointer hover:color-main'
							onClick={handleDelete}
						>
							{' '}
							Delete
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
