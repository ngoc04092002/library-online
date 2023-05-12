import React from 'react';

const Item = ({ item }) => {
	return (
		<a
			href={`/book/${item.id}`}
			className='flex items-center w-full mb-3 hover:bg-[#cccccc57]'
		>
			<div className='w-[20%] h-[100px]'>
				<img
					src={item.src}
					alt=''
					className='w-full h-full'
				/>
			</div>
			<div className='w-[80%] pl-2'>
				<h1 className='vertical-1 font-bold text-md'>{item.title}</h1>
				<p className='text-sm '>{item.author}</p>
				<p className='vertical-3'>{item.des}</p>
			</div>
		</a>
	);
};

export default Item;
