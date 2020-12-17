import { TaskStatus } from '../taskStatus.enum';
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }

  transform(value: any) {
    value = value.toUpperCase();

    if(!this.isStatusValid(value)){
      throw new BadRequestException(`"${value}" is an invalid status`)
    }

    return value
  }
}