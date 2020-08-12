import { CalcResultPart } from './calc-result-part';
import { CalcResultNear } from './calc-result-near';

export class CalcResult {
  name: string;
  volume: number;
  parts: CalcResultPart[];
  nears: CalcResultNear[];
}
