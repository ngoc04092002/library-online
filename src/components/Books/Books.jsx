import { getAllBooks } from '@/infrastructure/dashboardActions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Loading/Loading';
import Book from './Book';

const Books = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get-all-feedback'],
		queryFn: () => getAllBooks(),
		staleTime: 10 * 60 * 1000,
		cacheTime: 20 * 60 * 1000,
	});
	if (isLoading) return <Loading />;
	const res = data?.data;
	console.log(res);
	return (
		<div className='grid cus-screen:grid-cols-4 grid-cols-3 gap-4'>
			{res && res.length && res.map((r) => <Book data={r} />)}
		</div>
	);
};

export default Books;
