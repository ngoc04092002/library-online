import { MenuOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Search from '../helpers/Search';

import HeaderDetail from './HeaderDetail';

import { AuthContext } from '@/context/AuthProvider';
import { getImage } from '@/utils/CustomImagePath';

const menuNavBar = [
	{ title: 'Xem sau', to: 'view-later' },
	{ title: 'Góp ý kiến', to: 'feedback' },
];

const Header = ({ handleActive }) => {
	const { user } = useContext(AuthContext);
	const [show, setShow] = useState(false);

	const handleShowNavInfo = (e) => {
		const class_name = e.target.className;

		if (typeof class_name === 'string' && class_name.includes('dynamic')) {
			setShow(!show);
		}
	};

	const handleUnShow = () => {
		setShow(false);
	};

	return (
		<section className='header bg-white fixed z-[1000] h-14 left-0 top-0 right-0 drop-shadow-lg px-10 md:px-[7rem] w-full select-none'>
			<div className='header-container h-full flex items-center'>
				<div className='navbar_logo w-12 h-12'>
					<Link to='/'>
						<img
							src={getImage('branch.png')}
							alt='branch store'
						/>
					</Link>
				</div>
				<Search />

				<MenuOutlined
					onClick={handleActive}
					className='cus-screen:hidden block text-xl cursor-pointer'
				/>
				<div className='navbar-menu flex-1 d-rtl cus-screen:flex hidden'>
					{menuNavBar.map((d) => (
						<Link
							key={d.to}
							className='px-3 hover:color-main'
							to={d.to}
						>
							{d.title}
						</Link>
					))}
				</div>
				<div className='navbar-user items-center cus-screen:flex hidden'>
					{Object.values(user).length > 0 ? (
						<div
							className={`dynamic flex mr-4 items-end cursor-pointer ${
								show && 'bg-[#e6fafa]'
							} rounded-2xl py-1 px-1 relative`}
							onClick={handleShowNavInfo}
						>
							<img
								className='dynamic w-7 h-7 object-cover rounded-full'
								src={(Object.keys(user).length && user.avatar) || getImage('user.png')}
								alt='user'
							/>
							<span className='dynamic pl-1 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[67px]'>
								{user?.username}
							</span>
							{show && <HeaderDetail handleUnShow={handleUnShow} />}
						</div>
					) : (
						<Link
							to='sign-in'
							className='pr-4'
						>
							Đăng nhập
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default Header;
