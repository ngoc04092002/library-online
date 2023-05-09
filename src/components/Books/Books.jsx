import { getAllBooks } from '@/infrastructure/dashboardActions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import Book from './Book';
import { Pagination } from '..';

const pageSize = 8;

const Books = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getAllBooks(),
		staleTime: 30 * 1000,
		cacheTime: 60 * 1000,
	});
	if (isLoading) return <Loading />;
	const res = data?.data;
	const totalCount = res?.length || 0;
	const fisrtPage = (currentPage-1)*pageSize;
	const endPage = currentPage*pageSize;

	return (
		<>
			<div className='grid cus-screen:grid-cols-4 grid-cols-3 gap-4'>
				{res &&
					res.length &&
					res.slice(fisrtPage,endPage).map((r) => (
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
