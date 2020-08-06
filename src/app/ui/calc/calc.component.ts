import { Component, OnInit } from '@angular/core';
import { CalcService } from 'src/app/core/calc.service';
import { CalcGroup } from 'src/app/core/calc-group';
import { ProfileService } from 'src/app/core/profile.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  profileName: string = this.profileService.getProfileName();
  groups: CalcGroup[] = this.calcService.getGroups();

  constructor(private profileService: ProfileService, private calcService: CalcService) { }

  ngOnInit(): void {
  }

  onClickNewCalculation(): void {
    this.calcService.addGroup();
  }
}
