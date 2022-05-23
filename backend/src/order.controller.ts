import {
  Controller,
  Request,
  Put,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Post, HttpCode
} from "@nestjs/common";
import { OrderService } from './order.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Put('order')
  @HttpCode(200)
  tours(@Request() req, @Body() body) {
    const user = req.user;
    return this.orderService.create({ ...body, user: user?.id });
  }

  @UseGuards(JwtAuthGuard)
  @Post('order/:id')
  @HttpCode(200)
  edit(@Param('id') id: number, @Body() body) {
    return this.orderService.edit({ ...body, id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  userTours(@Request() req) {
    const user = req.user;
    return this.orderService.find(user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('order/:id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
