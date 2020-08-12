import { CalcStack } from './calc-stack';
import { ProfileService } from './profile.service';
import { CalcResult } from './calc-result';
import { CalcResultPart } from './calc-result-part';
import { CalcResultNearMatch } from './calc-result-near-match';
import { CalcResultNear } from './calc-result-near';
import { Alloy } from '../models/alloy.model';

export class CalcGroup {
  private stacks: CalcStack[] = [];

  constructor(private profileService: ProfileService, alloy: Alloy) {
    if (!alloy) {
      this.addStack();
    } else {
      this.addStacksForAlloy(alloy);
    }
  }

  public getStacks(): CalcStack[] {
    return this.stacks;
  }

  public addStack() {
    var stack = new CalcStack(this.profileService);
    stack.size = 1;
    stack.yield = this.profileService.getYields()[0];
    this.stacks.push(stack);
  }

  public addStacksForAlloy(alloy: Alloy) {
    for (const component of alloy.components) {
      var stack = new CalcStack(this.profileService);
      stack.name = component.name;
      stack.size = 1;
      stack.yield = this.profileService.getYields()[0];
      this.stacks.push(stack);
    }
  }

  public deleteStack(stack: CalcStack) {
    var index = this.stacks.indexOf(stack, 0);
    if (index > -1) {
       this.stacks.splice(index, 1);
    }
  }

  public getResult(): CalcResult {
    // Get total volume and parts
    var volume = 0;
    var parts: CalcResultPart[] = [];
    for (const stack of this.stacks) {
      var stackSum = stack.getSum();
      if (stackSum > 0) {
        volume += stackSum;

        var part = parts.find((value) => {
          return value.name === stack.name;
        });
        if (part) {
          // Part already exists, so add this stack
          part.size += stackSum;
        } else {
          // Create new part for this stack
          part = new CalcResultPart();
          part.name = stack.name;
          part.size = stackSum;
          parts.push(part);
        }
      }
    }

    // No volume means no result
    if (volume == 0) {
      return undefined;
    } else {
      var result = new CalcResult();
      result.volume = volume;
      result.parts = parts;
      result.nears = [];

      // Calculate ratios of all parts
      for (const part of parts) {
        part.ratio = part.size / volume;
      }

      if (result.parts.length == 1) {
        // One part means no alloy
        result.name = result.parts[0].name;
      } else {
        // Try to find the matching alloy
        for (const alloy of this.profileService.getAlloys()) {
          var alloyComponentsToBeMatched = alloy.components.length;
          var mixturePartsToBeMatched = result.parts.length;
          for (const part of parts) {
            var alloyComponent = alloy.components.find((component) => {
              return component.name === part.name && part.ratio >= component.min && part.ratio <= component.max;
            });
            var alloyComponent = alloy.components.find((component) => {
              return component.name === part.name && part.ratio >= component.min && part.ratio <= component.max;
            });
            if (alloyComponent) {
              alloyComponentsToBeMatched--;
              mixturePartsToBeMatched--;
            } else {
              break;
            }
          }
          if (alloyComponentsToBeMatched == 0 && mixturePartsToBeMatched == 0) {
            // All components of the alloy matched all parts of the mixture
            result.name = alloy.name;
          }
        }

        if (!result.name) {
          result.name = "Unknown";
        }
      }

      for (const alloy of this.profileService.getAlloys()) {
        if (alloy.name != result.name) {
          var matches = [];
          for (const part of parts) {
            for (const component of alloy.components) {
              if (component.name == part.name) {
                var match: CalcResultNearMatch = {
                  name: component.name,
                  diff: this.getMatchDifference(part.ratio, component.min, component.max)
                }
                matches.push(match);
                break;
              }
            }
          }

          if (matches.length > parts.length - 1) {
            var near : CalcResultNear = {
              alloy: alloy,
              matches: matches
            };
            result.nears.push(near);
          }
        }
      }

      return result;
    }
  }

  getMatchDifference(ratio: number, min: number, max: number) {
    if (ratio < min) {
      return -1;
    } else if (ratio > max) {
      return 1;
    } else {
      return 0;
    }
  }
}
