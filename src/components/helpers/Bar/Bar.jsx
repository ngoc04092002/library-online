import React from 'react';

import { LineIcon } from '@/assets/icons';

const Bar= ({ classSvg, className, handleToggleShowSidebar }) => {
	return (
		<div
			onClick={handleToggleShowSidebar}
			className={className}
		>
			<LineIcon classSvg={classSvg} />
			<LineIcon />
			<LineIcon classSvg={classSvg} />
		</div>
	);
};

export default Bar;
