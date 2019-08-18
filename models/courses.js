const fs = require('fs');
const uuid = require('uuid/v4');
const { join } = require('path');

class Course {
	constructor(title, price, img) {
		this.title = title;
		this.price = price;
		this.img = img;
		this.id = uuid();
	}

	toJSON() {
		return JSON.stringify({
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id
		})
	}

	async save() {
		const courses = await Course.getAll();
		courses.push(this.toJSON());
		
		return new Promise((res, rej) => {
			fs.writeFile(
				join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				(err) => {
					if (err) rej(err);
					else res();
				}
			)
		})
	}

	static getAll() {
		return new Promise((res, rej) => {
			fs.readFile(
				join(__dirname, '..', 'data', 'courses.json'),
				'utf-8',
				(err, data) => {
					if (err) throw new rej(err);
					else {
						let fetched = JSON.parse(data);
						res(fetched);
					}
				} 
			)
		});
	}

	static async getById(id) {
		const courses = await Course.getAll();
		return courses.find(c => c.id === id);
	}

	static async update(course) {
		let courses = await Course.getAll();

		// console.log(courses);
		const idx = courses.findIndex(c => c.id === course.id);
		courses[idx] = course;

		return new Promise((res, rej) => {
			fs.writeFile(
				join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				(err) => {
					if (err) rej(err);
					else res();
				}
			)
		})
	}
} 

module.exports = Course;