const router = require('express').Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
	const orders = await Order.find({
		'user.userId': req.user._id
	}).populate('user.userId')

	res.render('orders', {
		isOrder: true,
		title: 'Orders',
		orders: orders.map(o => {
			return {
				...o._doc,
				price: o.courses.reduce((total, c) => total + c.course.price * c.count, 0)
			}
		})
	});
});

router.post('/', async (req, res) => {
	try {
		const user = await req.user
			.populate('cart.items.courseId')
			.execPopulate()

		const courses = user.cart.items.map(c => {
			return {count: c.count, course: {...c.courseId._doc}}
		});

		const order = new Order({
			user: {
				name: req.user.name,
				userId: req.user
			},
			courses
		});

		await order.save();
		await req.user.clearCart();
		res.redirect('/orders');
	} catch (e) {
		console.error(e)
	}
});



module.exports = router;
