import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string): Promise<any> {
    const existing = await this.userModel.findOne({ $or: [{ username }, { email }] });
    if (existing) throw new ConflictException('Username or email already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, password: hashed });
    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      username: user.username,
      userId: user._id,
    };
  }

  async addFavourite(userId: string, bookId: string): Promise<any> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: bookId } },
    );
    return { message: 'Added to favourites' };
  }

  async removeFavourite(userId: string, bookId: string): Promise<any> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favourites: bookId } },
    );
    return { message: 'Removed from favourites' };
  }

  async getFavourites(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).populate('favourites');
    return user?.favourites || [];
  }
}