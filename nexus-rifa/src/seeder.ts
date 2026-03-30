import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'; // Assumindo que o nome da sua entidade de usuário é User e está neste caminho
import { UserSeeder } from './database/seeders/user.seeder'; // Assumindo que o seeder de usuário é este
import { AppModule } from './app.module'; // Importa o AppModule que tem a configuração do BD

// Por favor, note que tive que fazer algumas suposições sobre os nomes e localizações 
// das suas entidades e seeders de usuário. Se o build falhar novamente, por favor,
// verifique se os caminhos './user/user.entity' e './database/seeders/user.seeder' estão corretos.

seeder({
  imports: [
    AppModule, // O AppModule já importa o ConfigModule e o TypeOrmModule.forRootAsync
    TypeOrmModule.forFeature([User]), // Você ainda precisa especificar qual entidade este seeder usará
  ],
}).run([UserSeeder]);
