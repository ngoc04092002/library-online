import React from 'react';

function getStatusColor(status) {
	switch (status) {
		case 1:
			return 'border-[hsl(36,100%,50%)] !text-[hsl(36,100%,50%)] hover:!bg-[hsl(36,100%,50%)]';
		case 2:
			return 'border-[#00ff00] !text-[#00ff00] hover:!bg-[#00ff00]';
		default:
			return 'border-[#0072ff] !text-[#0072ff] hover:!bg-[#0072ff]';
	}
}

const StatusOrder = ({ status }) => {
	return (
		<span
			className={`cursor-pointer w-full whitespace-nowrap mr-1 !bg-white border border-solid ${getStatusColor(
				status,
			)} p-2  hover:!text-white`}
		>
			{status === 0 && 'Đang lựa'}
			{status === 1 && 'Đang giao'}
			{status === 2 && 'Đã giao'}
		</span>
	);
};

export default StatusOrder;
