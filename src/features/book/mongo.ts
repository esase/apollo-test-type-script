import * as mongoose from 'mongoose';

export interface IBook extends mongoose.Document {
  id: mongoose.Schema.Types.ObjectId;
  title: string; 
  authorId: string; 
};

export const BookSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  authorId: {
    type: String, 
    required: true
  }
});

const BookModel = mongoose.model<IBook>('Book', BookSchema);

export default BookModel;