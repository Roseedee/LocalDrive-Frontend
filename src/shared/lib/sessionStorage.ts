type StorageValue = unknown;

class SessionStorage {
  set<T extends StorageValue>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      window.sessionStorage.setItem(key, serialized);
    } catch (err) {
      console.error(`SessionStorage set error for key "${key}":`, err);
    }
  }

  get<T extends StorageValue>(key: string): T | null {
    try {
      const data = window.sessionStorage.getItem(key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (err) {
      console.error(`SessionStorage get error for key "${key}":`, err);
      return null;
    }
  }

  remove(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  clear(): void {
    window.sessionStorage.clear();
  }
}

export const sessionStorage = new SessionStorage();