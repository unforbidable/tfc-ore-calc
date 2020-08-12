import { Component, OnInit, Input } from '@angular/core';
import { CalcResult } from 'src/app/core/calc-result';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input()
  result: CalcResult;

  constructor() { }

  ngOnInit(): void {
  }

}
