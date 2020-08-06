import { ProfileService } from './profile.service';

export class CalcStack {
  name: string;
  yield: string;
  size: number;

  constructor(private profileService: ProfileService) { }

  getSum(): number {
    if (this.name) {
      var yieldSize = this.profileService.getYieldValue(this.yield);
      var sum = yieldSize * this.size;
      return sum;
    } else {
      return 0;
    }
  }
}
