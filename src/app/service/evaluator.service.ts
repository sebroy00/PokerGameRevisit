import { Injectable } from '@angular/core';
import { HandAnalyserSeriesService } from './hand-analyser.series.service';
import { HandAnalyserMultiplesService } from './hand-analyser.multiples.service';
import { Hand } from '../model/hand';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  constructor(
    private handAnalyserSeriesService: HandAnalyserSeriesService,
    private handAnalyserMultiplesService: HandAnalyserMultiplesService
  ) {}

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
