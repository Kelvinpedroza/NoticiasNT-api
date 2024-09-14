import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from '../db/entities/comments.entity';

@Module({
  controllers: [CommentsController],
  imports: [TypeOrmModule.forFeature([CommentsEntity])],
  exports: [CommentsService],
  providers: [CommentsService],
})
export class CommentsModule {}
