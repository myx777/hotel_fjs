import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';


@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL, {
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log(`✅ Connected to MongoDB: ${connection.db.databaseName}`);
      });
      connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });
      connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
      });
      return connection;
    },
  }),],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}