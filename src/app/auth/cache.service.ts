import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() { }

  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }
    return null;
  }
  protected setItem(key: string, data: object | string): void {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  protected removeItem(key: string): void {
    localStorage.removeI(key);
  }

  protected clear(): void {
    localStorage.clear();
  }
}
