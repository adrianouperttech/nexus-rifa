import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlansService } from '../../plans/plans.service';
import { CreatePlanDto } from '../../plans/dto/create-plan.dto';
import { UpdatePlanDto } from '../../plans/dto/update-plan.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/plans')
export class AdminPlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
