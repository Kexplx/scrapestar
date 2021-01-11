import { Collection, MongoClient, MongoClientOptions, ObjectId } from 'mongodb';
import { inProduction } from './env/in-production';
import { ExecutionResult } from './interfaces/execution-result';
import { JobDto } from './interfaces/job-dto';

// If we're in production, change the
// hostname to the mongodb container name.
const MONGODB_URL = inProduction
  ? 'mongodb://scrapestar__mongodb:27017'
  : 'mongodb://localhost:27017';

const DB_NAME = 'scrapestar';
const COLLECTION_NAME = 'jobs';

export class JobDtoStore {
  private readonly mongoClientOptions: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  async insert(dto: JobDto): Promise<string> {
    const [collection, client] = await this.connect();

    const { insertedId } = await collection.insertOne(dto);
    client.close();

    return insertedId.toHexString();
  }

  async update(id: string, dto: JobDto): Promise<void> {
    const _id = ObjectId.createFromHexString(id);
    const [collection, client] = await this.connect();

    const dtoCopy = { ...dto };
    delete dtoCopy._id; // Delete _id to not overwrite it.
    await collection.updateOne({ _id }, { $set: dtoCopy });

    client.close();
  }

  async delete(id: string): Promise<void> {
    const _id = ObjectId.createFromHexString(id);
    const [collection, client] = await this.connect();

    await collection.deleteOne({ _id });
    client.close();
  }

  async find(id: string): Promise<JobDto> {
    const _id = ObjectId.createFromHexString(id);
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
    const client = new MongoClient(MONGODB_URL, this.mongoClientOptions);

    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    return [collection, client];
  }
}
