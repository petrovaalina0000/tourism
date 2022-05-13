import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private tourRepository: Repository<Tour>,
  ) {}

  find(): Promise<Tour[]> {
    return this.tourRepository.find();
  }
}
