import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useQuery } from '@tanstack/react-query';
import { getBooksSold } from '@/infrastructure/dashboardActions';
import Loading from '@/components/Loading';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const LineChart = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get-books_sold-info'],
		queryFn: () => getBooksSold(),
		staleTime: 60 * 1000,
		cacheTime: 2 * 60 * 1000,
	});
	if (isLoading) return <Loading />;
	const res = data?.data;

	const statistical = months.map((m) => {
		const r = res.filter((r) => r.month === m);
		console.log(r);
		if (!!r.length) {
			return r[0].solds;
		}
		return 0;
	});

	
	const config = {
		data: {
			labels: months,
			datasets: [
				{
					label: 'Tháng',
					backgroundColor: '#f8fdff',
					borderColor: '#f8fdff',
					fill: false,
					data: statistical,
				},
			],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: 'Biểu đồ sách đã bán',
				},
			},
			// scales:{

			// }
		},
	};
	return (
		<Line
			className='p-3 rounded-lg '
			data={config.data}
			options={config.options}
			style={{ minHeight: '550px' }}
		/>
	);
};

export default LineChart;
