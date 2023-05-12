import { getRating } from '@/infrastructure/reviewAction';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Evaluate = ({ bookId, selectStar, setSelectStar }) => {
	const startFive = Array(5).fill(<StarOutlined className='text-[30px] opacity-50' />);
	const handleSelectStar = (value) => {
		setSelectStar(value);
	};

	const { data } = useQuery({
		queryKey: ['get-rating', bookId],
		queryFn: () => getRating(bookId),
		staleTime: 60 * 1000,
		cacheTime: 2 * 60 * 1000,
	});
	const res = data?.data || {};
	const ratingData = Object.values(res);

	return (
		<div className='flex items-center mt-8'>
			<ul className='flex items-center'>
				{startFive.map((st, i) => (
					<li
						onClick={() => handleSelectStar(i + 1)}
						key={i}
						className={`${
							selectStar >= i + 1 ? 'text-[yellow]' : ''
						} mr-2 !ml-0 list-none cursor-pointer hover:text-[yellow] transition-none duration-75 relative`}
					>
						{selectStar >= i + 1 ? <StarFilled className='text-[30px] text-[yellow]' /> : st}
						<span className='absolute bottom-[-80%] left-[37%] color-main'>
							{!!ratingData[i] && ratingData[i]}
						</span>
					</li>
				))}
			</ul>
			<p className='ml-4 opacity-50 text-lg'>Star Rating For the Article</p>
		</div>
	);
};

export default Evaluate;
