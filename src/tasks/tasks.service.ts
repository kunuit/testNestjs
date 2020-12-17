import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/getTasks-filter.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './taskStatus.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { throwError } from 'rxjs';
import { NOTFOUND } from 'dns';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}
  
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto)
  }

  async getTaskById(id: number): Promise<Task> {
      const found = await this.taskRepository.findOne(id)
      
      if(!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`)
      }
      return found
    }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if(result.affected === 0 ){
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }
}
