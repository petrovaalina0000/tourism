import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  create(entity: Order): Promise<InsertResult> {
    return this.orderRepository.insert(entity);
  }

  edit(entity: Order): Promise<UpdateResult> {
    return this.orderRepository.update(
      {
        id: entity?.id,
      },
      entity,
    );
  }

  find(user: number): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['tour'],
      where: { user: { id: user } },
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete({ id: id });
  }
}
