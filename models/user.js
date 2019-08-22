const { Schema, model } = require('mongoose');

const User = new Schema({
	email: {
		type: String,
		required: true
	},	
	name: {
		type: String,
		required: true
	},
	cart: {
		items: [
			{
				count: {
					type: Number,
					required: true,
					default: 1
				},
				courseId: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					required: true
				}
			}
		]
	}
});

User.methods.addToCart = async function(course) {
	const items = [...this.cart.items];
	const idx = items.findIndex(c => c.courseId.toString() === course._id.toString());
	if (idx >= 0 ) {
		items[idx].count++;
	} else {
		items.push({
			count: 1,
			courseId: course._id
		});
	}

	this.cart = {items};
	await this.save();
}

module.exports = model('User', User);