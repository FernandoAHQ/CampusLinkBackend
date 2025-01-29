import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async findAll() {
    try {
      const articles = await this.articleRepository.find({
        where: { active: true },
        select: ['id', 'title', 'created_at', 'tags', 'image_url'],
      });
            return {
        status: 'success',
        message: 'Articles fetched.',
        data: articles,
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const article = await this.articleRepository.findOneBy({ id });
      if (!article) {
        return {
          status: 'error',
          message: 'Article not found.',
        };
      }
      return {
        status: 'success',
        message: 'Article fetched.',
        data: article,
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  async create(createArticleDto: CreateArticleDto) {
    try {
      const newArticle = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(newArticle);
      return {
        status: 'success',
        message: 'Article created successfully.',
        data: newArticle,
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const updateResult = await this.articleRepository.update(id, updateArticleDto);
      if (updateResult.affected === 0) {
        return {
          status: 'error',
          message: 'Article not found.',
        };
      }
      return {
        status: 'success',
        message: 'Article updated successfully.',
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await this.articleRepository.delete(id);
      if (deleteResult.affected === 0) {
        return {
          status: 'error',
          message: 'Article not found.',
        };
      }
      return {
        status: 'success',
        message: 'Article deleted successfully.',
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
