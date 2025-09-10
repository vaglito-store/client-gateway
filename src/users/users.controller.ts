import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Inject,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_users' }, createUserDto);
  }

  @Get()
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersClient.send({ cmd: 'find_all_users' }, paginationDto);
  }

  @Get(':id')
  async findUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.usersClient.send({ cmd: 'find_one_user' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
    /*     try {
      const product = await firstValueFrom(
        this.usersClient.send({ cmd: 'find_one_user' }, { id: id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    } */
  }

  @Patch(':id')
  updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return `Update user with #${id} id`;
  }

  @Delete(':id')
  deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Delete user with #${id} id`;
  }
}
