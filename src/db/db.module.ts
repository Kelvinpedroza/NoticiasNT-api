// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//     imports: [TypeOrmModule.forRootAsync({
//         useFactory: async (configService: ConfigService) => ({
//             type: 'postgres',
//             host: configService.get<string>('DB_HOST'),
//             port: +configService.get<number>('DB_PORT'),
//             username: configService.get<string>('DB_USERNAME'),
//             password: configService.get<string>('DB_PASSWORD'),
//             database: configService.get<string>('DB_NAME'),
//             entities: [__dirname + '/entities/**'],
//             migrations: [__dirname + '/migrations/*.ts'],
//             synchronize: false
//         }),
//         inject: [ConfigService]
//     })]
// })
// export class DbModule { }

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('DATABASE_URL'), // Usando a URL completa
                entities: [__dirname + '/entities/**'],
                migrations: [__dirname + '/migrations/*.ts'],
                synchronize: false,
                ssl: {
                    rejectUnauthorized: false, // Necessário para o Neon
                },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DbModule {}

