import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Bans } from './models/bans.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH,
      entities: [Bans],
    }),
    TypeOrmModule.forFeature([Bans]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
