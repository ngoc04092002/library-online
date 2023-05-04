import React from 'react';

import LineChart from '@/components/chart/linechart/LineChart';

const DashBoardMain = () => {
	return (
		<>
			<div className='w-full bg-[#172b4d] rounded-lg mb-8'>
				<LineChart />
			</div>
		</>
	);
};

export default DashBoardMain;
