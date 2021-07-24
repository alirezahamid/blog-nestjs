import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServise: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userServise.create(user);
  }
  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userServise.findOne(params.id);
  }
  @Get()
  findAll(): Observable<User[]> {
    return this.userServise.findAll();
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userServise.deleteOne(Number(id));
  }
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userServise.updateOne(Number(id), user);
  }
}
