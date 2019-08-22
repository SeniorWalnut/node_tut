const { Router } = require('express');
const Course = require('../models/courses');
const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('add', {
		title: 'Add Course',
		isAdd: true
	});
});

router.post('/', async (req, res) => {
	const course = new Course({
		title: req.body.title,
		price: req.body.price,
		img: req.body.img,
		userId: req.user
	})

	try {
		await course.save();
		res.redirect('/courses');
	} catch (e) {
		console.error(e);
	}

});

module.exports = router;