import { getImage } from '@/utils/CustomImagePath';
import React from 'react';

const BookReviewComment = () => {
	const resizeTextArea = (e) => {
		e.target.style.height = '40px';
		e.target.style.height = e.target.scrollHeight + 'px';
	};
	return (
		<div className='mt-10'>
			<h1>Review comments</h1>
			<div className='flex items-center mt-6'>
				<div className='mr-2'>
					<img
						src={getImage('user.png')}
						alt=''
						className='w-10 h-10'
					/>
				</div>
				<div>
					<textarea
						onInput={resizeTextArea}
						className='w-[500px] text-[15px] flex-1 mx-2 resize-none bg-[#f7f8f9] h-[40px] min-h-[40px] rounded-md input-none overflow-hidden duration-[0s]'
						placeholder='enter comment...'
					/>
				</div>
			</div>
		</div>
	);
};

export default BookReviewComment;
