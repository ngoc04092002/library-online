import { getAllBooks } from '@/infrastructure/dashboardActions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import Book from './Book';
import { Pagination } from '..';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { types } from '@/constants/initialValueBook';
import { useSearchParams } from 'react-router-dom';
import NotFoundItem from '../helpers/NotFoundItem';

const pageSize = 8;

const Books = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const type = searchParams.get('type');
	const year = searchParams.get('year');
	const [value, setValue] = useState({
		type: '',
		year: '',
	});
	const { data, isLoading } = useQuery({
		queryKey: ['books', type, year],
		queryFn: () => getAllBooks({ type, year }),
		staleTime: 30 * 1000,
		cacheTime: 60 * 1000,
	});

	const handleChange = (e) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFilter = () => {
		searchParams.set('type', value.type);
		searchParams.set('year', value.year);
		setSearchParams(searchParams);
	};

	if (isLoading) return <Loading />;
	const res = data?.data;
	const totalCount = res?.length || 0;
	const fisrtPage = (currentPage - 1) * pageSize;
	const endPage = currentPage * pageSize;

	return (
		<>
			<div className='mb-8 flex items-center'>
				<FormControl className='w-1/4'>
					<InputLabel id='type'>Thể loại</InputLabel>
					<Select
						labelId='type'
						id='type'
						value={value['type']}
						label='type'
						name='type'
						onChange={handleChange}
					>
						{types.map((t) => (
							<MenuItem
								key={t}
								value={t}
							>
								{t}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					id='year'
					label='Năm phát hàng'
					type='number'
					name='year'
					value={value['year']}
					onChange={handleChange}
					className='w-1/4 !mx-2'
				/>
				<Button
					variant='contained'
					onClick={handleFilter}
				>
					Lọc
				</Button>
			</div>
			{!res && <NotFoundItem />}
			<div className='grid cus-screen:grid-cols-4 grid-cols-3 gap-4'>
				{res &&
					!!res.length &&
					res.slice(fisrtPage, endPage).map((r) => (
						<Book
							key={r.id}
							data={r}
						/>
					))}
			</div>
			<div className='w-full mt-12 flex justify-center'>
				<Pagination
					className='pagination-bar'
					currentPage={currentPage}
					totalCount={totalCount}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		</>
	);
};

export default Books;
