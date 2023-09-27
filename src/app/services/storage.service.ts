import { Injectable } from '@angular/core';
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  getItem(key: string): User[] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: User[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
