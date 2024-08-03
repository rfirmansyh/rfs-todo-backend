import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { TodoModule } from '@/features/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'rahmadfirmansyah',
        password: '',
        database: 'rfs_todo',
        entities: [__dirname + '/features/**/*.entity{.ts,.js}'],
      }),
      inject: [ApiConfigService],
    }),
    AuthModule,
    TodoModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
