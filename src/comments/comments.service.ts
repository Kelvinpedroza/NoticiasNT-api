import { Injectable } from '@nestjs/common';
import { CreateCommentDto, findAllParameters } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private comments: CreateCommentDto[] = [];

  create(createCommentDto: CreateCommentDto) {
    return this.comments.push(createCommentDto);
  }

  findAll(params: findAllParameters): CreateCommentDto[] {
    return
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
