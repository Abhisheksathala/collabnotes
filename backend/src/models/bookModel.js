import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true },
);

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;
