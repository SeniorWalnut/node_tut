const router = require('express').Router();

router.get('/login', async (req, res) => {
	res.render('auth/login', {
		title: 'Authorization',
		isLogin: true
	})
});

module.exports = router;