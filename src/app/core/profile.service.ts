import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../models/profile.model';
import { stringify } from 'querystring';
import { Alloy } from '../models/alloy.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentProfile: Profile;

  constructor(private http: HttpClient) { }

  public async loadProfile(name: string): Promise<any> {
    var data = await this.http.get('assets/profiles/' + name + '.json').toPromise();
    var profile = data as Profile;
    this.currentProfile = profile;
  }

  public getProfileName(): string {
    return this.currentProfile.name;
  }

  public getComponents(): string[] {
    var components: string[] = [];
    this.currentProfile.components.forEach((c) => {
      components.push(c.name);
    });
    return components;
  }

  public getYields(): string[] {
    var components: string[] = [];
    this.currentProfile.yields.forEach((y) => {
      components.push(y.name);
    });
    return components;
  }

  public getYieldValue(name: string): number {
    for (const y of this.currentProfile.yields) {
      if (name === y.name) {
        return y.value;
      }
    }
    console.error('Yield name "' + name + '" not found.');
    return 0;
  }

  public getAlloys(): Alloy[] {
    return this.currentProfile.alloys;
  }
}
