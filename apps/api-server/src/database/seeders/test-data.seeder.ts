import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';

import { Tenant } from '../../modules/tenants/entities/tenant.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Rifa } from '../../modules/rifas/entities/rifa.entity';
import { Cota } from '../../modules/cotas/entities/cota.entity';

@Injectable()
export class TestDataSeeder implements Seeder {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rifa)
    private readonly rifaRepository: Repository<Rifa>,
    @InjectRepository(Cota)
    private readonly cotaRepository: Repository<Cota>,
  ) {}

  async seed(): Promise<any> {
    const tenantEmail = 'teste@tenant.com';
    let tenant = await this.tenantRepository.findOne({
      where: { email: tenantEmail },
    });
    if (!tenant) {
      tenant = this.tenantRepository.create({
        nome: 'Tenant de Teste',
        email: tenantEmail,
        ativo: true,
      });
      tenant = await this.tenantRepository.save(tenant);
      console.log('Tenant de teste criado:', tenant.id);
    } else {
      console.log('Tenant de teste já existe:', tenant.id);
    }

    const userEmail = 'admin@teste.com';
    const existingUser = await this.userRepository.findOne({
      where: { email: userEmail, tenant_id: tenant.id },
    });
    if (!existingUser) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash('Pa$$w0rd', salt);
      const user = this.userRepository.create({
        tenant_id: tenant.id,
        nome: 'Administrador Teste',
        email: userEmail,
        password: hashedPassword,
        role: 'admin',
        ativo: true,
      });
      await this.userRepository.save(user);
      console.log('Usuário de teste criado:', userEmail);
    } else {
      console.log('Usuário de teste já existe:', userEmail);
    }

    const rifaTitulo = 'Rifa de Teste';
    let rifa = await this.rifaRepository.findOne({
      where: { tenant_id: tenant.id, titulo: rifaTitulo },
    });
    if (!rifa) {
      rifa = this.rifaRepository.create({
        tenant_id: tenant.id,
        titulo: rifaTitulo,
        descricao: 'Rifa gerada para testes automatizados',
        valor_cota: 10,
        min_num: 1,
        max_num: 20,
        chave_pix: '123456789',
        status: 'ativa',
        limite: 20,
        nome: 'Rifa Teste',
      });
      rifa = await this.rifaRepository.save(rifa);
      console.log('Rifa de teste criada:', rifa.id);
    } else {
      console.log('Rifa de teste já existe:', rifa.id);
    }

    const existsCotas = await this.cotaRepository.findOne({
      where: { rifa_id: rifa.id },
    });
    if (!existsCotas) {
      const cotas: Cota[] = [];
      for (let i = 1; i <= 20; i++) {
        cotas.push(
          this.cotaRepository.create({
            id: i,
            rifa_id: rifa.id,
            tenant_id: tenant.id,
            status: 'livre',
          }),
        );
      }
      await this.cotaRepository.save(cotas);
      console.log('20 cotas de teste inseridas para a rifa:', rifa.id);
    } else {
      console.log('Cotas de teste já existem para a rifa:', rifa.id);
    }

    return true;
  }

  async drop(): Promise<any> {
    const tenant = await this.tenantRepository.findOne({
      where: { email: 'teste@tenant.com' },
    });
    if (!tenant) return;

    await this.cotaRepository.delete({ tenant_id: tenant.id });
    await this.rifaRepository.delete({ tenant_id: tenant.id });
    await this.userRepository.delete({ tenant_id: tenant.id });
    await this.tenantRepository.delete({ id: tenant.id });
  }
}
