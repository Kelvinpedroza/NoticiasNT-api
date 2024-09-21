import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { UserEntity } from './entities/user.entity';

config();

// const configService = new ConfigService();


// const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: configService.get<string>('DB_HOST'),
//     port: +configService.get<number>('DB_PORT'),
//     username: configService.get<string>('DB_USERNAME'),
//     password: configService.get<string>('DB_PASSWORD'),
//     database: configService.get<string>('DB_NAME'),
//     entities: [CommentsEntity, UserEntity],
//     migrations: [__dirname + '/migrations/*.ts'],
//     synchronize: false
// }

// export default new DataSource(dataSourceOptions);



const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),  // Usando a URL completa
    entities: [CommentsEntity, UserEntity],
    migrations: [__dirname + '/migrations/*.{ts,js}'],  // Suporte para .ts e .js
    synchronize: false,  // Desabilitado para produção
    ssl: {
        rejectUnauthorized: false,  // Necessário para serviços como o Neon ou Heroku
    },
};

export default new DataSource(dataSourceOptions);
