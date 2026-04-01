import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansService {
    private readonly planRepository;
    constructor(planRepository: Repository<Plan>);
    create(createPlanDto: CreatePlanDto): Promise<Plan>;
    findAll(): Promise<Plan[]>;
    findOne(id: string): Promise<Plan>;
    update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan>;
    remove(id: string): Promise<void>;
}
