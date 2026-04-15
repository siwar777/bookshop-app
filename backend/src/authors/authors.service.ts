import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    const author = new this.authorModel(authorData);
    return author.save();
  }

  async delete(id: string): Promise<any> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}