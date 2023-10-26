import { DataSource, ObjectLiteral } from 'typeorm';
import { DataType, IMemoryDb, ISchema, newDb } from 'pg-mem';
import { v4 as uuidV4 } from 'uuid';

export async function createDataSource(
  entities: ObjectLiteral[],
): Promise<DataSource> {
  const db: IMemoryDb = newDb();

  db.public.registerFunction({
    name: 'version',
    implementation: () => 'test',
  });

  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  });

  db.registerExtension('uuid-ossp', (schema: ISchema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: uuidV4,
      impure: true,
    });
  });

  const dataSource: DataSource = (await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities,
  })) as DataSource;

  await dataSource.initialize();

  await dataSource.synchronize();

  return dataSource;
}
