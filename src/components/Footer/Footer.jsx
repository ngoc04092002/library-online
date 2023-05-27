import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React, { memo } from 'react';

import { FacebookIcon, ZaloIcon } from '../../assets/icons';

import styles from './footer.module.scss';

import { getImage } from '@/utils/CustomImagePath';

const cx = classNames.bind(styles);

const footerIntroduce = [
	{
		title: 'Về dự án',
		intros: ['Về chúng tôi', 'Điều khoản sử dụng', 'Quy chế hoạt động', 'Liên hệ'],
	},
	{
		title: 'Quản lý thư viện sách',
		intros: ['Bán đầy đủ thể loại sách'],
	},
	{
		title: 'Dịch vụ - Quảng cáo',
		intros: ['Chương trình - khuyến mãi', 'Hướng dẫn đăng tin', 'Hướng dẫn thanh toán'],
	},
	{
		title: 'Công cụ tiện ích',
		intros: ['Dễ tìm kiếm', 'Đọc trực tuyến'],
	},
];

const Footer = () => {
	return (
		<section className='footer bg-[#dbdbdbd4] min-h-[24rem] w-full py-8 cursor-default'>
			<div className='footer-container mx-10 md:mx-20 px-2 flex items-center lg:flex-row flex-col lg:items-start'>
				<div className='flex lg:flex-col flex-wrap text-center md:text-start lg:w-1/3 w-full lg:justify-start md:justify-between justify-center flex-row footer_left text-black lg:mb-0 mb-6'>
					<ul
						className={`${cx(
							'footer-01',
						)} lg:mr-12 flex md:text-left flex-col items-center justify-center sm:justify-start md:items-start w-full sm:w-1/2`}
					>
						<li>
							<img
								src={getImage('brand.png')}
								alt='brand'
								className='object-cover object-center w-28 h-20 rounded-2xl'
							/>
						</li>
						<li className='text-sm'>
							<PhoneOutlined className='rotate-[100deg] mr-2 text-[#036803]' /> (84+) 338787233
						</li>
						<li>
							<MailOutlined className='text-[#036803] mr-2' /> NgocVV.B20CN476@stu.ptit.edu.vn
						</li>
						<li className='social-icons'>
							<a
								href='https://www.facebook.com/profile.php?id=100009696701104'
								target='_blank'
								rel='noreferrer'
							>
								<FacebookIcon />
							</a>
							<a
								href='https://www.facebook.com/profile.php?id=100009696701104'
								target='_blank'
								rel='noreferrer'
							>
								<ZaloIcon />
							</a>
						</li>
					</ul>
					<ul className={`${cx('footer-02')} w-full sm:w-1/2`}>
						<li>Dự án cho quản lý thư viện sách</li>
						<li>Được thực hiện bỏi:</li>
						<li>Vũ Văn Ngọc</li>
						<li className='font-semibold'>
							Sinh viên Trường Học Viện Công Nghệ Bưu Chính Viễn Thông
						</li>
					</ul>
				</div>
				<div className='footer_right lg:w-2/3 w-full text-black '>
					<ul className='flex flex-wrap items-baseline'>
						{footerIntroduce.map((f) => (
							<li
								key={f.title}
								className='sm:w-1/2 mb-4 w-full  text-center md:text-start'
							>
								<h3 className='font-semibold text-2xl'>{f.title}</h3>
								<ul>
									{f.intros.map((fi, index) => (
										<li key={index}>{fi}</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default memo(Footer);
