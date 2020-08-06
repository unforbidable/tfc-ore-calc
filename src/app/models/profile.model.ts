import { Alloy } from './alloy.model';
import { Yield } from './yield.model';
import { Component } from './component.model';

export class Profile {
  name: string;
  components: Component[];
  alloys: Alloy[];
  yields: Yield[];
  stack: number;
}
