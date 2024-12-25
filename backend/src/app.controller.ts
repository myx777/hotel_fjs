import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/check-db')
  async checkDb(): Promise<string> {
    return this.databaseService.getConnectionStatus();
  }
}
