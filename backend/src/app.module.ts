import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Adicione para tornar as variáveis disponíveis globalmente
      envFilePath: '.env', // ✅ Explícito (opcional, mas recomendado)
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Task],
      synchronize: process.env.NODE_ENV !== 'production', // ⚠️ Desliga em produção!
      ssl: {
        rejectUnauthorized: false, // Necessário para Supabase
      },
      autoLoadEntities: true, // ✅ Carrega automaticamente as entidades
    }),
    TasksModule,
  ],
})
export class AppModule {}