import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

describe('MongoDB Connection', () => {
  let mongoServer: MongoMemoryServer;
  let connection: MongoClient;

  beforeAll(async () => {
    jest.setTimeout(10000); 

    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();
    connection = new MongoClient(uri);
    await connection.connect();
  });

  it('should connect to MongoDB successfully', async () => {
    const db = connection.db();
    expect(db).toBeDefined();
    expect(await db.command({ ping: 1 })).toHaveProperty('ok', 1);
  });

  afterAll(async () => {
    if (connection) {
      await connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });
});
