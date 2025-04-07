// apps/api/src/types/bull.d.ts
declare module 'bull' {
  interface Queue {
    client: { redis: import('ioredis').Redis };
    add(name: string, data: any, opts?: any): Promise<any>;
  }

  interface Job {
    data: any;
    opts: any;
    promote(): Promise<void>;
    remove(): Promise<void>;
    retry(): Promise<void>;
  }
}
