import { model, Schema } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},

		phone: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},

		role: {
			type: String,
			enum: ['ADMIN', 'USER', 'DRIVER'],
			default: 'USER'
		},

		phoneOtp: String
	},
	{ timestamps: true }
);

const User = model('User', userSchema);

export default User;
