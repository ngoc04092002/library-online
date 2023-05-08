import React from 'react';
import { getImage } from '@/utils/CustomImagePath';


const Comment = () => {
	return (
		<div className='flex items-center mt-4'>
			<div>
				<img
					src={getImage('user.png')}
					alt=''
					className='w-14 h-10'
				/>
			</div>
			<div className='ml-2'>
				<p className='w-fit p-2 text-[15px] mx-2 bg-[#f7f8f9] rounded-md '>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, aperiam voluptatum
					fugit dolores, placeat dignissimos quod et totam libero voluptatem earum asperiores
					obcaecati reiciendis repudiandae quas eveniet sit rerum. Labore.
				</p>
			</div>
		</div>
	);
};

export default Comment;
