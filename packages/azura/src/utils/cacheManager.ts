export class LRUCache<T> {
  private cache: Map<string, { value: T; expiresAt?: number }>;
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number, ttl: number = 0) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
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
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(key)) return undefined;

    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  has(key: string): boolean {
    if (this.isExpired(key)) return false;
    return this.cache.has(key);
  }

  set(key: string, value: T) {
    const expiresAt = this.ttl > 0 ? Date.now() + this.ttl : undefined;

    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey!);
    }

    this.cache.set(key, { value, expiresAt });

    this.cleanupExpired();
  }

  private cleanupExpired() {
    for (const key of this.cache.keys()) {
      this.isExpired(key);
    }
  }
}
