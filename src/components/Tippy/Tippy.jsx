import React from 'react';
import NotFoundItem from '../helpers/NotFoundItem';

import styles from './tippy.module.scss';
import classNames from 'classnames/bind';
import Item from './Item';
import { useQuery } from '@tanstack/react-query';
import { filterBook } from '@/infrastructure/dashboardActions';
import Loading from '../Loading';

const cx = classNames.bind(styles);

const Tippy = ({ value = '' }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['filter-book', value],
		queryFn: () => filterBook({ s: value }),
		staleTime: 30 * 1000,
		cacheTime: 60 * 1000,
	});
	const res = data?.data || [];

	return (
		<div className={`${cx('tippy_container')} absolute bg-white top-[42px] left-0 w-full p-2 tippy`}>
			{isLoading ? (
				<Loading />
			) : !res.length ? (
				<NotFoundItem />
			) : (
				res.map((r) => (
					<Item
						key={r.id}
						item={r}
					/>
				))
			)}
		</div>
	);
};

export default Tippy;
