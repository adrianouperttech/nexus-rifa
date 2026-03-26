import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    create(createPlanDto: CreatePlanDto): Promise<import("./entities/plan.entity").Plan>;
    findAll(): Promise<import("./entities/plan.entity").Plan[]>;
    findOne(id: string): Promise<import("./entities/plan.entity").Plan>;
    update(id: string, updatePlanDto: UpdatePlanDto): Promise<import("./entities/plan.entity").Plan>;
    remove(id: string): Promise<void>;
}
