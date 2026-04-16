import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; email: string; password: string }) {
    return this.authService.register(body.username, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Post(':userId/favourites/:bookId')
  addFavourite(@Param('userId') userId: string, @Param('bookId') bookId: string) {
    return this.authService.addFavourite(userId, bookId);
  }

  @Delete(':userId/favourites/:bookId')
  removeFavourite(@Param('userId') userId: string, @Param('bookId') bookId: string) {
    return this.authService.removeFavourite(userId, bookId);
  }

  @Get(':userId/favourites')
  getFavourites(@Param('userId') userId: string) {
    return this.authService.getFavourites(userId);
  }
}
