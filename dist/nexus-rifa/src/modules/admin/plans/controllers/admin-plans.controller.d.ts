import { PlansService } from '../../plans/plans.service';
import { CreatePlanDto } from '../../plans/dto/create-plan.dto';
import { UpdatePlanDto } from '../../plans/dto/update-plan.dto';
export declare class AdminPlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    create(createPlanDto: CreatePlanDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updatePlanDto: UpdatePlanDto): any;
    remove(id: string): any;
}
