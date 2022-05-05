import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'build'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-3-229-252-6.compute-1.amazonaws.com',
      port: 5432,
      username: 'lkqhavchmpurrh',
      password:
        '5708f4d254e0890aa0a90860c6fcdef5caf08097d72665da4050a9d3147f5903',
      database: 'de6gi4nl1utk1p',
      entities: [User],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
