import { model, Schema } from 'mongoose'

const deliverySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

    },

    quantity: {
        type: Number,
        required: true,
        trim: true,
  
      },

      address: {
        type: String,
        required: true,
        trim: true,
  
      }, 
      status: {
        type : String,
        enum:["ONWAY", "DELIVERED", "PICKUP", "CANCELLED"],
        default: "ONWAY"
      },

  { timestamps: true }
);

const Delivery = model('Delivery', deliverySchema)

export default Delivery