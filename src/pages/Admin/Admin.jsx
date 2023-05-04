import { TableBooks } from '@/components';
import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';

const Admin = () => {
	const isOutlet = useOutlet();
	return <div className='w-full'>{isOutlet ? <Outlet /> : <TableBooks />}</div>;
};

export default Admin;
