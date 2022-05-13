import { Controller, Request, Get } from '@nestjs/common';
import { TourService } from './tour.service';

@Controller()
export class TourController {
  constructor(private tourService: TourService) {}

  @Get('tours')
  tours(@Request() req) {
    return this.tourService.find();
  }
}
