import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { Tour } from './tour.entity';
import { TourController } from './tour.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  providers: [TourService],
  controllers: [TourController],
})
export class TourModule {}
