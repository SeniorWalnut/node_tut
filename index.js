const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const app = express();
const mongoose = require('mongoose');
const { join } = require('path');

const hbs = exhbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const port = process.env.PORT || 3000;
const url = `mongodb+srv://eugene:420blazeit@cluster0-pumsp.mongodb.net/test?retryWrites=true&w=majority`

async function start(url, port) {
	try {
		await mongoose.connect(url, { useNewUrlParser: true });
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (e) {
		console.error(e);
	}
}

start(url, port);