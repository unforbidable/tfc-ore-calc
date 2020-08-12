import { Injectable } from '@angular/core';

import { CalcGroup } from './calc-group';
import { ProfileService } from './profile.service';
import { Alloy } from '../models/alloy.model';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  private groups: CalcGroup[] = [];

  constructor(private profileService: ProfileService) {
    this.addGroup();
  }

  public getGroups() : CalcGroup[] {
    return this.groups;
  }

  public addGroup() {
    this.groups.push(new CalcGroup(this.profileService, null));
  }

  public addGroupForAlloy(alloy: Alloy) {
    this.groups.push(new CalcGroup(this.profileService, alloy));
  }

  public deleteGroup(group: CalcGroup) {
    var index = this.groups.indexOf(group, 0);
    if (index > -1) {
       this.groups.splice(index, 1);
    }
  }
}
