import Tippy from '@/components/Tippy';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

const Search = () => {
	const [search, setSearch] = useState('');
	const [value] = useDebounce(search, 2500);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className='flex flex-1 items-center border-[1px] border-solid rounded-md border-[#657786] mx-7 relative'>
			<input
				className='w-full h-9 caret-[#01adba] p-1 rounded-md'
				type='text'
				placeholder='Từ khóa, Đường, Quận, Dự án hoặc địa danh ...'
				value={search}
				onChange={handleChange}
			/>
			<SearchOutlined className='text-lg p-1 text-[#657786] cus-shadow' />
			{!!value && <Tippy value={value} />}
		</div>
	);
};

export default Search;
