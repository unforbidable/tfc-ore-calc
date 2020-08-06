import { Component, OnInit, Input } from '@angular/core';
import { CalcGroup } from 'src/app/core/calc-group';
import { CalcStack } from 'src/app/core/calc-stack';
import { CalcService } from 'src/app/core/calc.service';
import { ProfileService } from 'src/app/core/profile.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input()
  group: CalcGroup;
  components: string[] = this.profileService.getComponents();
  yields: string[] = this.profileService.getYields();

  constructor(private calcService: CalcService, private profileService: ProfileService) { }

  ngOnInit(): void { }

  onClickNewStack() {
    this.group.addStack();
  }

  onClickDeleteStack(stack: CalcStack) {
    this.group.deleteStack(stack);
    if (this.group.getStacks().length == 0) {
      this.calcService.deleteGroup(this.group);
    }
  }
}
