import { Injectable } from '@angular/core';
import { HandAnalyserSeriesService } from './hand-analyser.series.service';
import { HandAnalyserMultiplesService } from './hand-analyser.multiples.service';
import { Hand, HandRankType } from '../model/hand';
import { Card, ACE } from '../model/card';

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
      const straightFlushCards = this.handAnalyserSeriesService.findStraightCards(
        flushCards
      );
      // If we have a straight within that flush
      if (straightFlushCards.length != 0) {
        hand.cards = straightFlushCards;
        // If the high card within that straight is an Ace
        if (straightFlushCards[0].kind == ACE) {
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
    // If we have a straight, we know there's no possibility of any multiples
    // other than a pair, which is a lower rank than straight.
    if (straightCards.length != 0) {
      hand.cards = straightCards;
      hand.handRank = HandRankType.Straight;
      hand.highCardKinds.push(straightCards[0].kind);
      return hand;
    }

    return this.handAnalyserMultiplesService.findMultiplesHand(cards);
  }
}
