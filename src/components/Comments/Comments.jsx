import React, { useContext, useState } from 'react';
import Comment from './Comment';
import BookReviewComment from '../BookReviewComment';
import { AuthContext } from '@/context/AuthProvider';

const Comments = ({ datas, selectStar }) => {
	const { reviewList, ...rest } = datas;
	const { user } = useContext(AuthContext);
	const [reviews, setReviews] = useState(() => {
		if (!!reviewList) {
			return reviewList;
		}
		return [];
	});

	return (
		<>
			{!!Object.keys(user).length && (
				<BookReviewComment
					book={rest}
					setReviews={setReviews}
					selectStar={selectStar}
				/>
			)}
			<div className='mt-8'>
				{reviews &&
					reviews.map((r) => (
						<Comment
							key={r.id}
							data={r}
							setReviews={setReviews}
						/>
					))}
			</div>
		</>
	);
};

export default Comments;
