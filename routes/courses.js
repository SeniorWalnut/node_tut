const { Router } = require('express');
const Course = require('../models/courses');
const router = Router();

router.get('/', async (req, res) => {
	const courses = await Course.find();
	res.render('courses', {
		isCourses: true,
		title: 'All courses',
		courses
	});
})

router.get('/:id', async (req, res) => {
	const course = await Course.findById(req.params.id);
	res.render('course', {
		layout: 'empty',
		course
	})
})

router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/');
	}

	const course = await Course.findById(req.params.id);

	res.render('course-edit', {
		title: `Edit ${course.title}`,
		course
	})
})

router.post('/edit', async (req, res) => {
	const { id } = req.body;
	delete req.body.id;
	await Course.findByIdAndUpdate(req.body.id, req.body);
	res.redirect('/courses')
})


router.post('/remove', async (req, res) => {
	try {
		await Course.deleteOne({_id: req.body.id});
		res.redirect('/courses');
	} catch (e) {
		console.error(e);
	}
});
module.exports = router;