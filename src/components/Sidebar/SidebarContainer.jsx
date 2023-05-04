import React from 'react';

import Sidebar from './Sidebar';

const SidebarContainer = ({ active, handleActive, setActive }) => {
	return (
		<div>
			<Sidebar
				active={active}
				handleActive={handleActive}
				setActive={setActive}
			/>
		</div>
	);
};

export default SidebarContainer;
