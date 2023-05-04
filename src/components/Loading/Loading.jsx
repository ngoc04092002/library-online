import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const Loading = ({ styles }) => {
	return (
		<div className='w-full text-center'>
			<LoadingOutlined className={`${styles} text-4xl text-white`} />
		</div>
	);
};

export default Loading;
