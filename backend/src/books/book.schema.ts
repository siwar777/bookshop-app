import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  editor: string;

  @Prop()
  year: number;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  author: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);