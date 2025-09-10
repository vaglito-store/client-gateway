import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE, env } from 'src/config';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.user_ms_host,
          port: env.user_ms_port,
        },
      },
    ]),
  ],
})
export class UsersModule {}
