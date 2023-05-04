import React from 'react';

import Loading from '@/components/Loading/Loading';

const ButtonWrapper = ({ children, styles, isLoading = false, onClick }) => {
	return (
		<button
			disabled={isLoading}
			className={`${
				isLoading ? 'bg-[#ccc]' : 'bg-[#01adba]'
			} select-none cursor-pointer mb-4 px-4 py-2 font-semibold text-white hover:bg-[#1cbcc7] min-w-[100px] ${styles}`}
			onClick={() => onClick?.()}
		>
			{isLoading ? <Loading styles='text-sm' /> : children}
		</button>
	);
};

export default ButtonWrapper;
