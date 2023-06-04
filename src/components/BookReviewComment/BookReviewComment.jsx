import { getImage } from '@/utils/CustomImagePath';
import React, { useContext, useState } from 'react';
import ButtonWrapper from '../helpers/ButtonWrapper/ButtonWrapper';
import { useMutation } from '@tanstack/react-query';
import { createReview, saveRating } from '@/infrastructure/reviewAction';
import { getToast } from '@/utils/CustomToast';
import { AuthContext } from '@/context/AuthProvider';

const BookReviewComment = ({ book, setReviews, selectStar }) => {
	const { user } = useContext(AuthContext);
	const [value, setValue] = useState('');
	const resizeTextArea = (e) => {
		e.target.style.height = '40px';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (data) => {
			const res = createReview(data);
			return res;
		},
	});

	const { mutate: mutateRating} = useMutation({
		mutationFn: (data) => {
			const res = saveRating(data);
			return res;
		},
	});

	const handleClickReview = () => {
		const orderValue = {
			des: value,
			bookEntity: book,
			clientEntity: {
				id: user?.id,
			},
		};
		mutate(orderValue, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				getToast('Đánh giá thành công', 'success');
				setValue('');
				setReviews((prev) => [...prev, r.data]);
			},
		});

		const formRating = {
			bookRating: book,
			clientEntity: {
				id: user?.id,
				username:user?.username
			},
			star: selectStar
		}

		mutateRating(formRating, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			}
		});
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div className='mt-10'>
			<h1>Bình luận đánh giá</h1>
			<div className='flex items-center mt-6'>
				<div className='mr-2 h-10 w-10'>
					<img
						src={getImage('user.png')}
						alt=''
						className='w-full'
					/>
				</div>
				<div className='w-fit flex'>
					<textarea
						onInput={resizeTextArea}
						className='w-[500px] text-[15px] flex-1 mx-2 resize-none bg-[#f7f8f9] h-[40px] min-h-[40px] rounded-md input-none overflow-hidden duration-[0s]'
						placeholder='Đánh giá của bạn...'
						onChange={handleChange}
						value={value}
					/>
				</div>
				<ButtonWrapper
					isLoading={isLoading}
					styles='!mb-0 rounded'
					onClick={handleClickReview}
				>
					Đánh giá
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default BookReviewComment;
