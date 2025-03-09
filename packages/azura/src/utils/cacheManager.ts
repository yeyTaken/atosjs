export class LRUCache<T> {
  private cache: Map<string, { value: T; expiresAt?: number }>;
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number, ttl: number = 0) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  has(key: string): boolean {
    return this.cache.has(key) && !this.isExpired(key);
  }

  private isExpired(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry || entry.expiresAt === undefined) return false;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return true;
    }
    return false;
  }

  get(key: string): T | undefined {
    if (!this.has(key)) return undefined;
    const value = this.cache.get(key)!.value;
    this.cache.delete(key);
    this.cache.set(key, { value, expiresAt: this.cache.get(key)?.expiresAt });
    return value;
  }

  set(key: string, value: T) {
    const expiresAt = this.ttl > 0 ? Date.now() + this.ttl : undefined;
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey!);
    }
    this.cache.set(key, { value, expiresAt });
  }
}
