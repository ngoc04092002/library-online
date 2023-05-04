import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

const Search = () => {
	return (
		<div className='flex flex-1 items-center border-[1px] border-solid rounded-md border-[#657786] mx-7'>
			<input
				className='w-full h-9 caret-[#01adba] p-1 rounded-md'
				type='text'
				placeholder='Từ khóa, Đường, Quận, Dự án hoặc địa danh ...'
			/>
			<SearchOutlined className='text-lg p-1 text-[#657786] cus-shadow' />
		</div>
	);
};

export default Search;
