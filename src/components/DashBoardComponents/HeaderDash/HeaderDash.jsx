import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './header-dash.module.scss';

import { HomeIcon, HomeRentIcon, MapIcon } from '@/assets/icons';
import Bar from '@/components/helpers/Bar';
import { AuthContext } from '@/context/AuthProvider';
import { getImage } from '@/utils/CustomImagePath';
import { useQuery } from '@tanstack/react-query';
import { getBookAndFeedbackReport, getBooksSold } from '@/infrastructure/dashboardActions';

const cx = classNames.bind(styles);

const HeaderDash = ({ classSvg, className, handleToggleShowSidebar }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();
	const pathname = location.pathname;
	const splitPathname = pathname.split('/');
	const slicePathName = pathname.split('/').slice(2, splitPathname.length - 1);

	const { data } = useQuery({
		queryKey: ['get-books_sold-info'],
		queryFn: () => getBooksSold(),
		staleTime: 60 * 1000,
		cacheTime: 2 * 60 * 1000,
	});

	const { data: dataBF } = useQuery({
		queryKey: ['get-book-feedback-report'],
		queryFn: () => getBookAndFeedbackReport(),
		staleTime: 60 * 1000,
		cacheTime: 2 * 60 * 1000,
	});
	
	const resBF = dataBF?.data ?? {};
	const res = data?.data || [];
	const solded = res.reduce((accumulator, currentValue) => accumulator + currentValue.solds, 0);
	const dataStats = [
		{
			title: 'Đã bán',
			sales: solded,
			icon: <MapIcon />,
			developSpeed: '65',
			color: 'bg-[linear-gradient(87deg,#f5365c,#f56036)!important]',
			timestamp: 'Kể từ tháng trước',
			incre: true,
		},
		{
			title: 'Số sách hiện có',
			sales: resBF?.books?.sales,
			icon: <HomeRentIcon />,
			developSpeed: resBF?.books?.developSpeed,
			color: 'bg-[linear-gradient(87deg,#fb6340,#fbb140)!important]',
			timestamp: 'Kể từ tháng trước',
			incre: resBF?.books?.increment,
		},
		{
			title: 'Phản hồi',
			sales: resBF?.feedbacks?.sales,
			icon: <HomeIcon className='fill-white' />,
			developSpeed: resBF?.feedbacks?.developSpeed,
			color: 'bg-[linear-gradient(87deg,#2dce89,#2dcecc)!important]',
			timestamp: 'Kể từ tháng trước',
			incre: resBF?.feedbacks?.increment,
		},
	];

	return (
		<div>
			<div className={`${cx('header_dash')} flex items-center justify-between md:justify-end mb-8`}>
				<ul className='flex items-center'>
					<li className='lg:hidden inline-block'>
						<Bar
							classSvg={classSvg}
							handleToggleShowSidebar={handleToggleShowSidebar}
							className={className}
						/>
					</li>
				</ul>
				<div className='flex items-center ml-4'>
					<p className='mr-2'>
						<img
							src={user.avatar || getImage('user.png')}
							alt='user'
							className='object-cover rounded-full object-center w-9 h-9 select-none'
						/>
					</p>
					<p className='text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px]'>
						{user.username}
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center cursor-default'>
					<p className='text-white text-[1.6rem] mr-8 font-medium capitalize'>
						{splitPathname.at(-1) || 'Default'}
					</p>
					<ul className='sm:flex hidden'>
						<li className='flex'>
							<HomeIcon className='w-5 h-5 fill-white' />
						</li>
						<li className='text-[#f6f9fc] text-md font-semibold'>
							<span className='mx-2'>-</span>Dashboards
							<span className='mx-2'>{splitPathname.at(-1) ? '-' : ''}</span>
						</li>
						{slicePathName.map((l, index) => (
							<li
								key={index}
								className='text-[#f6f9fc] text-md font-semibold capitalize'
							>
								{l}
								<span className='mx-2'>-</span>
							</li>
						))}
						<li className='text-[#dee2e6] text-md font-semibold'>{splitPathname.at(-1)}</li>
					</ul>
				</div>
				{/* <div className={cx('btn-filter')}>Filters</div> */}
			</div>
			<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
				{dataStats.map((s, index) => (
					<div
						key={index}
						className={`${cx('card-stats')} flex flex-col py-4 px-5 justify-between`}
					>
						<div className='flex items-center justify-between mb-6'>
							<div>
								<h1 className='uppercase text-sm text-[#8898aa] font-semibold font-[inherit]'>
									{s.title}
								</h1>
								<p className='text-[#32325d] font-semibold text-xl'>{s.sales}</p>
							</div>
							<div className={`${s.color} rounded-[50%] p-3`}>{s.icon}</div>
						</div>
						<ul className='flex items-center justify-between'>
							<li
								className={`${s.incre ? 'text-[#2dce89]' : 'text-red-500'}  flex items-center mr-2`}
							>
								{s.incre ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {s.developSpeed}%
							</li>
							<li className='text-[#525f7f] overflow-hidden whitespace-nowrap text-ellipsis'>
								{s.timestamp}
							</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default HeaderDash;
