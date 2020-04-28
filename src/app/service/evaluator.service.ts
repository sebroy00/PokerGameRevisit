import { Injectable } from '@angular/core';
import { HandAnalyserSeriesService } from './hand-analyser.series.service';
import { HandAnalyserMultiplesService } from './hand-analyser.multiples.service';
import { Hand, HandRankType } from '../model/hand';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  constructor(
    private handAnalyserSeriesService: HandAnalyserSeriesService,
    private handAnalyserMultiplesService: HandAnalyserMultiplesService
  ) {}

  getHandFromCards(cards: Card[]): Hand {
    const hand = new Hand();

    const flushCards = this.handAnalyserSeriesService.findFlushCards(cards);
    if (flushCards.length != 0) {
      for (const card of flushCards) {
        card.log();
      }
      const straightFlushCards = this.handAnalyserSeriesService.findStraightCards(
        flushCards
      );
      if (straightFlushCards.length != 0) {
        hand.cards = straightFlushCards;
        if (straightFlushCards[0].kind == 13) {
          hand.handRank = HandRankType.RoyalFlush;
        } else {
          hand.handRank = HandRankType.StraightFlush;
        }
        hand.highCardKinds.push(straightFlushCards[0].kind);
        return hand;
      } else {
        hand.cards = flushCards;
        hand.handRank = HandRankType.Flush;
        hand.highCardKinds.push(Math.max(...flushCards.map((c) => c.kind)));
        return hand;
      }
    }

    const straightCards = this.handAnalyserSeriesService.findStraightCards(
      cards
    );
    if (straightCards.length != 0) {
      hand.cards = straightCards;
      hand.handRank = HandRankType.Straight;
      hand.highCardKinds.push(straightCards[0].kind);
      return hand;
    }

    return this.handAnalyserMultiplesService.findMultiplesHand(cards);
  }
}
