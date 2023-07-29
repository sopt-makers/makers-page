import type { KVNamespace } from '@cloudflare/workers-types';
import { z } from 'zod';

interface StorageConfig<T, V extends number> {
  version: V;
  prefix: string;
  type: z.ZodType<T>;
}

export function createStorageClient<T, V extends number>(kv: KVNamespace, config: StorageConfig<T, V>) {
  const { version, type, prefix } = config;

  const recordSchema = z.object({
    version: z.literal(version),
    data: type,
  });

  async function get(key?: string) {
    const record = await kv.get(prefix + (key ?? ''), 'json');
    if (!record) {
      return null;
    }
    const parsed = recordSchema.safeParse(record);

    if (!parsed.success) {
      return null;
    }
    return parsed.data.data;
  }

  async function put(key: string, value: T) {
    const newData = {
      version,
      data: value,
    };
    await kv.put(prefix + key, JSON.stringify(newData));
  }

  async function remove(key: string) {
    await kv.delete(prefix + key);
  }

  async function list() {
    const { keys } = await kv.list({
      prefix,
    });
    return keys;
  }

  async function deleteAll() {
    const keys = await list();

    await Promise.all(keys.map((key) => remove(key.name)));
  }

  return {
    get,
    put,
    delete: remove,
    list,
    deleteAll,
  };
}

export function storageFactory<T, V extends number>(config: StorageConfig<T, V>) {
  return (kv: KVNamespace) => {
    return createStorageClient(kv, config);
  };
}
