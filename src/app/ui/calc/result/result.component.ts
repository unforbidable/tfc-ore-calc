import { Component, OnInit, Input } from '@angular/core';
import { CalcResult } from 'src/app/core/calc-result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input()
  result: CalcResult;

  constructor() { }

  ngOnInit(): void {
  }

}
