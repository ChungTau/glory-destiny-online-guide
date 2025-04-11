// apps/api/src/core/base.utils.ts
import { Provider } from '@nestjs/common';
import { BaseServiceFactory } from './base-service.factory';
import { Prisma } from '@glory-destiny-online-guide/prisma';

export function provideBaseService<K extends Prisma.ModelName>(
  entityName: K,
): Provider {
  return {
    provide: `${entityName}Service`,
    useFactory: (factory: BaseServiceFactory) => factory.getService(entityName),
    inject: [BaseServiceFactory],
  };
}
