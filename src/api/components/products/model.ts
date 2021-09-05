import { model, Schema } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
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

export default ("Product", productSchema)