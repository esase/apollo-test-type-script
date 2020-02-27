import BookModel from './mongo';

class BookService {
    public async findAllBooks(authorId?:string) {
        if (authorId) {
            return BookModel.find({
                authorId
            }).exec();
        }
        return BookModel.find({}).exec();
    }

    public async findBook(id: string) {
        return BookModel.findById(id).exec();
    }

    public async createBook(args) {
        return BookModel.create(args);
    }

    public async deleteBook(id: string) {
        const book = await this.findBook(id);

        if (book) {
          await BookModel.findByIdAndDelete(id).exec();

          return true;
        }

        return false;
    }
}

const bookService = {
    name: 'book',
    factory: function(user) {
        return new BookService();
    }
}

export default bookService;