import { model, Schema } from 'mongoose'

const orderSchema = new Schema(
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

  { timestamps: true }
);

export default ('Order', orderSchema)