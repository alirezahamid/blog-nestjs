import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServise: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | any> {
    return this.userServise.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<any> {
    return this.userServise.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
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
