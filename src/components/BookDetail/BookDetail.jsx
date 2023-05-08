import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonWrapper from '../helpers/ButtonWrapper';
import Evaluate from '../Evaluate';
import { BackDropContext } from '@/pages/Home';
import dayjs from 'dayjs';
import DialogBookOrder from '../DialogBookOrder';
import BookReviewComment from '../BookReviewComment/BookReviewComment';
import Comments from '../Comments';
import DialogConfirm from '../DialogConfirm/DialogConfirm';

const BookDetail = () => {
	const { id } = useParams();
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const [orderValue, setOrderValue] = useState('');
	const [open, setOpen] = useState(false);

	console.log(id);

	const handleOrder = () => {
		console.log(id, orderValue);
		setOpen(false);
		toggleBackDrop();
		setOrderValue('');
	};

	const changeOrder = (e) => {
		setOrderValue(e.target.value);
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};
	const handleOpenConfirm = () => {
		setOpen(true);
	};

	return (
		<>
			<div className='py-12 px-12'>
				<div className='w-full text-end'>
					<ButtonWrapper onClick={toggleBackDrop}>Đặt sách</ButtonWrapper>
				</div>
				<div>
					<h1 className='text-2xl font-bold mb-4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae odit? Fuga
						voluptas necessitatibus expedita corrupti. Labore nemo sed corrupti molestias, optio
						saepe similique ullam dolores debitis adipisci architecto quia.
					</h1>
					<ul>
						<li>
							author: <span>author</span>
						</li>
						<li>
							type: <span>type</span>
						</li>
						<li>
							pages: <span>3000</span>
						</li>
						<li>
							quantity sold: <span>3000</span>
						</li>
						<li>
							release date: <span>{dayjs().format('DD-MM-YYYY')}</span>
						</li>
					</ul>
					<figure>
						<img
							src='https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/07/attachment_78895234.png?auto=format&q=60&fit=max&w=930'
							alt=''
							style={{ width: '100%', height: '600px' }}
						/>
					</figure>
					<div className='mt-4'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus exercitationem
						incidunt debitis rerum, placeat deserunt soluta provident aspernatur dignissimos
						quibusdam veniam itaque, reiciendis alias amet perferendis optio sit? Saepe, dicta. Nemo
						ab inventore consectetur ut, nam dicta voluptate labore fuga dolor ipsa impedit
						necessitatibus, vero, dignissimos dolorem maxime saepe quasi ipsum. Nemo quam tempore
						laudantium corporis expedita eum cumque nesciunt! At laborum natus saepe asperiores amet
						voluptatibus quaerat modi culpa libero enim nesciunt corrupti perspiciatis repellat,
						voluptas excepturi sed, nihil delectus rerum sunt veniam atque. Cupiditate accusantium
						sit veritatis officiis? Inventore ullam, ratione, repudiandae harum sapiente temporibus
						dolores vel saepe dolorum suscipit, excepturi placeat impedit? Neque asperiores
						recusandae officia nobis. Non ab officia dolorum facilis illo velit magni, a delectus.
						Et illo fuga, doloremque consequuntur distinctio non consequatur nostrum eum ducimus
						dolorum deleniti labore id voluptatibus tempora, accusamus hic numquam placeat illum.
						Distinctio tempore voluptates voluptatum laboriosam temporibus placeat exercitationem!
						Quasi optio sequi aspernatur alias excepturi porro nesciunt! Minus recusandae quam
						libero nesciunt aliquid. Et pariatur doloribus omnis quos, sint nemo! Eius officia
						repellendus voluptas tempora? Eum repellendus fugit quos. Itaque, quam, iure harum
						incidunt maxime eos praesentium dolores cumque commodi vero, voluptatibus ut dicta ex
						similique perferendis odit nesciunt. Iusto facilis quos sapiente velit! Sapiente iure
						provident nisi nesciunt. Architecto maiores perferendis voluptates qui quia quos nemo
						eveniet voluptatibus animi, repudiandae labore asperiores recusandae! Esse cumque
						laboriosam inventore sunt autem! Tenetur, neque eligendi odit quidem molestiae nobis
						blanditiis dolorem. Veritatis ducimus recusandae doloribus magni dignissimos animi
						eveniet quisquam odit fugiat obcaecati eaque, impedit nihil est ullam. Ea sint nulla
						vero sunt, molestiae maiores eius, aliquam aliquid, accusamus doloremque vel! Soluta cum
						ullam vero laborum dolorem at ipsam error magni esse in quae, incidunt sint eum, fuga
						obcaecati voluptate nobis nemo delectus laudantium numquam fugiat? Reiciendis ex ullam
						modi amet?
					</div>
				</div>
				<Evaluate />
				<BookReviewComment />
				<Comments />
			</div>
			{showBackDrop && !open && (
				<DialogBookOrder
					handleClick={handleOpenConfirm}
					value={orderValue}
					handleChange={changeOrder}
				/>
			)}
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleOrder}
			/>
		</>
	);
};

export default BookDetail;
