import React from 'react';
import BookOrder from './BookOrder';

const BookOrders = ({ fakeDatas }) => {
	return (
		<div>
			{fakeDatas &&
				!!fakeDatas.length &&
				fakeDatas.map((data,index) => (
					<BookOrder
						key={index}
						data={data}
					/>
				))}

		</div>
	);
};

export default BookOrders;
