import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, findAllParameters } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { v4 as uuid, v4 } from 'uuid'
import { CommentsEntity } from 'src/db/entities/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

  changedComment: CreateCommentDto
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>
  ) { }


  async create(createCommentDto: CreateCommentDto) {

    const newComment = new CommentsEntity();
    newComment.userName = createCommentDto.userName;
    newComment.description = createCommentDto.description;
    newComment.rating = createCommentDto.rating;
    try {
      new Date(createCommentDto.created_at);
    } catch (error) {
      throw new BadRequestException('Invalid date format for created_at');
    }
    const createComent = await this.commentsRepository.save(newComment)
    console.log(createComent)
    
    return this.mapEntityToDto(createComent);
  }


  async findAll(params: findAllParameters): Promise<CreateCommentDto[]> {
    const comments = await this.commentsRepository.find()
    return comments
  }


  async findOneComment(id: string): Promise<CreateCommentDto | null> {

    const findComment = await this.commentsRepository.findOne({
      where: { id }
    })

    if (!findComment) {
      throw new NotFoundException(`Comentario não encontrado 404`)
    }

    return findComment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<UpdateCommentDto> {
    this.changedComment = await this.findOneComment(id)
    this.changedComment.description = updateCommentDto.description
    this.changedComment.rating = updateCommentDto.rating
    return await this.commentsRepository.save(this.changedComment);
  }

  async remove(id: string) {
    return  this.commentsRepository.delete(id) ;
  }

  private mapEntityToDto(comentEntity:CommentsEntity): CreateCommentDto {
    return {
      id: comentEntity.id,
      description: comentEntity.description,
      rating: comentEntity.rating,
      userName: comentEntity.userName,
      created_at: comentEntity.created_at,
      deleted_at: comentEntity.deleted_at

    }

  } 
}
