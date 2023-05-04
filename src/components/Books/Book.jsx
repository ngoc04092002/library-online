import React from 'react';

const Book = ({ data }) => {
	return (
		<a href={`/book/${data.id}`}>
			<div className='p-3 shadow-006 rounded-md vertical-2 h-[310px]'>
				<div>
					<img
						src={data.src}
						alt=''
						className='w-full h-[200px] object-cover'
					/>
				</div>
				<div>
					<h1 className='text-md font-semibold vertical-2'>{data.title}</h1>
					<p>{data.author}</p>
				</div>
			</div>
		</a>
	);
};

export default Book;
