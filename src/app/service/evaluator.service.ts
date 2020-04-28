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

  compareHands(handA: Hand, handB: Hand): number {
    if (handA.handRank < handB.handRank) {
      return -1;
    } else if (handA.handRank > handB.handRank) {
      return 1;
    } else {
      if (handA.handRank > 1) {
        const multiplesComparisonResult = this.compareMultiples(
          handA.multiplesCardKinds,
          handB.multiplesCardKinds
        );
        if (multiplesComparisonResult == 0) {
          // ensure high cards not empty
          return this.compareHighCards(
            handA.highCardKinds,
            handB.highCardKinds
          );
        } else {
          return multiplesComparisonResult;
        }
      } else {
        return this.compareHighCards(handA.highCardKinds, handB.highCardKinds);
      }
    }
  }

  compareMultiples(handAMultiples: number[], handBMultiples: number[]): number {
    for (let i = 0; i < handAMultiples.length; i++) {
      if (handAMultiples[i] < handBMultiples[i]) {
        return -1;
      }
      if (handAMultiples[i] > handBMultiples[i]) {
        return 1;
      }
    }
    return 0;
  }

  compareHighCards(handAhighCards: number[], handBhighCards: number[]): number {
    for (let i = 0; i < handAhighCards.length; i++) {
      if (handAhighCards[i] < handBhighCards[i]) {
        return -1;
      }
      if (handAhighCards[i] > handBhighCards[i]) {
        return 1;
      }
    }
    return 0;
  }
}
