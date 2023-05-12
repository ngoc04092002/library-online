import React, { useState } from 'react';
import Comment from './Comment';
import BookReviewComment from '../BookReviewComment';

const Comments = ({ datas, selectStar }) => {
	const { reviewList, ...rest } = datas;
	const [reviews, setReviews] = useState(() => {
		if (!!reviewList) {
			return reviewList;
		}
		return [];
	});
	return (
		<>
			<BookReviewComment
				book={rest}
				setReviews={setReviews}
				selectStar={selectStar}
			/>
			<div className=''>
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
