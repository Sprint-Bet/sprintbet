import { Injectable } from '@angular/core';
import { JwtBody } from '../model/jwt-body';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  /**
   * Helper method to check if token has expired
   * @param token jtw soken
   */
  hasTokenExpired(token: string): boolean {
    const tokenPayload = window.atob(token.split('.')[1]);
    const tokenObject: JwtBody = JSON.parse(tokenPayload);
    const expiryDate = new Date(tokenObject.exp * 1000);
    
    const tenSecondsLater = new Date(expiryDate.getTime() - (1000 * 60 * 60 * 4) + (1000 * 10));
    return new Date() > tenSecondsLater;
    // return new Date() > expiryDate;
  }
}
