import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product'
				}
			}
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true }
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false
		},
		deliveredAt: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);

const Order = model('Order', orderSchema);

export default Order;
