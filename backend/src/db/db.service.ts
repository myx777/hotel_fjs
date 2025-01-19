import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DbService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getConnectionStatus(): Promise<string> {
    if (this.connection.readyState === 1) {
      return `✅ Connected to database: ${this.connection.db.databaseName}`;
    }
    return '❌ Not connected to database';
  }
}
