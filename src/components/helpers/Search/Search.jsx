import Tippy from '@/components/Tippy';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const Search = ({isTippy = false}) => {
	const [search, setSearch] = useState('');
	const [value] = useDebounce(search, 2500);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const div = document.querySelector('.tippy');
		if(!value){
			div.style.display = 'none';
		}
		if (!div) {
			return;
		}
		function targetElement(e) {
			const className = e.target.className;
			if (typeof className === 'string' && !className.includes('tippy')){
				div.style.display = 'none';
			}
		}
		const input = document.querySelector('input');
		// const mainBody = document.querySelector('.body-main');

		input.addEventListener('focus', () => {
			div.style.display = 'block';
		});

		window.addEventListener('click', targetElement);
		return () => {
			window.removeEventListener('click', targetElement);
		};
	}, []);

	return (
		<div className='flex flex-1 items-center border-[1px] border-solid rounded-md border-[#657786] mx-7 relative'>
			<input
				className='w-full h-9 caret-[#01adba] p-1 rounded-md tippy-input'
				type='text'
				placeholder='Tìm sách ...'
				value={search}
				onChange={handleChange}
			/>
			<SearchOutlined className='text-lg p-1 text-[#657786] cus-shadow' />
			{!!isTippy && <Tippy value={value} />}
		</div>
	);
};

export default Search;
