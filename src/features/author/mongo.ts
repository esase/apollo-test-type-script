import * as mongoose from 'mongoose';

export interface IAuthor extends mongoose.Document {
  id: mongoose.Schema.Types.ObjectId;
  name: string; 
};

export const AuthorSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }
});

const AuthorModel = mongoose.model<IAuthor>('Author', AuthorSchema);

export default AuthorModel;