import { Component } from '@angular/core';
import { HandAnalyserSeriesService } from './service/hand-analyser.series.service';
import { Card, Suit } from './model/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'poker-game';
  constructor(private handAnalyserSeriesService: HandAnalyserSeriesService) {}
}
