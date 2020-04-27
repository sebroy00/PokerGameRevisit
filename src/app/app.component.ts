import { Component } from '@angular/core';
import { RankingService } from './service/ranking.service';
import { Card, Suit } from './model/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'poker-game';
  constructor(private rankingService: RankingService) {
    const cards = [
      new Card(Suit.Clubs, 11),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Heart, 2),
      new Card(Suit.Clubs, 6),
      new Card(Suit.Heart, 6),
      new Card(Suit.Clubs, 2),
      new Card(Suit.Diamonds, 6),
    ];
    var result = rankingService.fillCardKinds(cards);
    let a = 0;
  }
}
