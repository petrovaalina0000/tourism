import { Controller, Request, Put, Body, UseGuards, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Put('order')
  tours(@Request() req, @Body() body) {
    const user = req.user;
    return this.orderService.create({ ...body, user: user?.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  userTours(@Request() req) {
    const user = req.user;
    return this.orderService.find(user?.id);
  }
}
