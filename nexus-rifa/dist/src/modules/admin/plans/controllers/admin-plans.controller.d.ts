import { PlansService } from '../../../plans/plans.service';
import { CreatePlanDto } from '../../../plans/dto/create-plan.dto';
import { UpdatePlanDto } from '../../../plans/dto/update-plan.dto';
export declare class AdminPlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    create(createPlanDto: CreatePlanDto): Promise<import("../../../plans/entities/plan.entity").Plan>;
    findAll(): Promise<import("../../../plans/entities/plan.entity").Plan[]>;
    findOne(id: string): Promise<import("../../../plans/entities/plan.entity").Plan>;
    update(id: string, updatePlanDto: UpdatePlanDto): Promise<import("../../../plans/entities/plan.entity").Plan>;
    remove(id: string): Promise<void>;
}
