import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('author').exec();
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const book = new this.bookModel(bookData);
    return book.save();
  }

  async delete(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, bookData: Partial<Book>): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, bookData, { new: true }).exec();
  }
}
