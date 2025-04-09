// apps/api/src/core/junction.utils.ts
import { Provider } from '@nestjs/common';
import { JunctionServiceFactory } from './junction-service.factory';
import { Prisma } from '@glory-destiny-online-guide/prisma';

export function provideJunctionService<K extends Prisma.ModelName>(
  entityName: K,
  entity1Key: string,
  entity2Key: string,
): Provider {
  return {
    provide: `${entityName}Service`,
    useFactory: (factory: JunctionServiceFactory) =>
      factory.getService(entityName, entity1Key, entity2Key),
    inject: [JunctionServiceFactory],
  };
}
