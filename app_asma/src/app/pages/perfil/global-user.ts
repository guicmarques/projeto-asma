import { Injectable, Component } from '@angular/core';
import { User } from './../../models/user.model';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class GlobalUser {
  public user: any;
  
}