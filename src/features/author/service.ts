import AuthorModel from './mongo';

class AuthorService {
    public async findAllAuthors() {
        return AuthorModel.find({}).exec();
    }

    public async findAuthor(id: string) {
        return AuthorModel.findById(id).exec();
    }

    public async createAuthor(args) {
        return AuthorModel.create(args);
    }

    public async deleteAuthor(id: string) {
        const author = await this.findAuthor(id);

        if (author) {
          await AuthorModel.findByIdAndDelete(id).exec();

          return true;
        }

        return false;
    }
}

const authorService = {
    name: 'author',
    factory: function(user) {
        return new AuthorService();
    }
}

export default authorService;