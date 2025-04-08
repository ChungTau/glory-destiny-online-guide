declare module 'bull' {
  interface Queue {
    client: { redis: import('ioredis').Redis };
    add(name: string, data: any, opts?: any): Promise<any>;
  }

  interface Job<T = any> {
    id: string | number; // 添加 id 屬性，Bull 的 job.id 可以是字串或數字
    data: T; // 泛型數據
    opts: any;
    promote(): Promise<void>;
    remove(): Promise<void>;
    retry(): Promise<void>;
  }
}