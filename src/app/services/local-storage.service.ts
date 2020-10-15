import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public setItem(key: string, value: string): void {
    if (key && value != null) {
      localStorage.setItem(key, value);
    }
  }

  public getItem(key: string): string {
    if (key) {
     return localStorage.getItem(key);
    }
  }

  public deleteItem(key: string): void {
    if (key) {
      localStorage.removeItem(key);
    }
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
