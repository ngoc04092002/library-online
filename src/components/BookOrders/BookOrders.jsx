import React from 'react';
import BookOrder from './BookOrder';

const BookOrders = ({ fakeDatas, setDatas }) => {
	console.log(fakeDatas);
	return (
		<div>
			{fakeDatas &&
				!!fakeDatas.length &&
				fakeDatas.map((data,index,datas) => (
					<BookOrder
						resetData={setDatas}
						key={index}
						book={data}
						books={datas}
					/>
				))}

		</div>
	);
};

export default BookOrders;
