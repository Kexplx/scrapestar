import { Collection, MongoClient, ObjectId } from 'mongodb';
import { inProduction } from '../env/in-production';
import { JobDto } from '../models/job-dto';

// If we're in production, change the
// hostname to the mongodb container name.
const MONGODB_URL = inProduction
  ? 'mongodb://scrape-app__mongodb:27017'
  : 'mongodb://localhost:27017';

const DB_NAME = 'scrape-app';
const COLLECTION_NAME = 'jobs';

export class JobDtoStore {
  private static instance: JobDtoStore | undefined;

  private client = new MongoClient(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Private constructor to prevent direct construction calls.
  // Clients should use the `getInstance` method.
  private constructor() {}

  static getInstance(): JobDtoStore {
    if (!JobDtoStore.instance) {
      JobDtoStore.instance = new JobDtoStore();
    }

    return JobDtoStore.instance;
  }

  async insert(dto: JobDto): Promise<string> {
    const [collection, client] = await this.connect();

    const { insertedId } = await collection.insertOne(dto);
    client.close();

    return insertedId;
  }

  async update(dto: JobDto): Promise<void> {
    const _id = new ObjectId(dto._id);
    const [collection, client] = await this.connect();

    await collection.updateOne({ _id }, dto);
    client.close();
  }

  async delete(id: string): Promise<void> {
    const _id = new ObjectId(id);
    const [collection, client] = await this.connect();

    await collection.deleteOne({ _id });
    client.close();
  }

  async find(id: string): Promise<JobDto> {
    const _id = new ObjectId(id);
    const [collection, client] = await this.connect();

    const dto = await collection.findOne({ _id });
    client.close();

    return dto;
  }

  async findAll(): Promise<JobDto[]> {
    const [collection, client] = await this.connect();

    const dtos = await collection.find().toArray();
    client.close();

    return dtos;
  }

  private async connect(): Promise<[Collection, MongoClient]> {
    const client = await this.client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    return [collection, client];
  }
}
