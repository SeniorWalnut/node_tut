const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('index', {
		title: 'Main Page',
		isHome: true
	});
})

module.exports = router;