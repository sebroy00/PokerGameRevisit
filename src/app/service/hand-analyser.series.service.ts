import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { Hand, HandRankType } from '../model/hand';

@Injectable({
  providedIn: 'root',
})
export class HandAnalyserSeriesService {
  constructor() {}

  findStraightCards(cards: Card[]): Card[] {
    const sortedCards = cards.sort((a, b) => (a.kind < b.kind ? 1 : -1));
    let count = 1;
    let previousCardKind = sortedCards[0].kind;
    let sequence: Card[] = [sortedCards[0]];
    for (let i = 1; i < cards.length; i++) {
      if (previousCardKind == sortedCards[i].kind) {
        continue;
      }
      if (previousCardKind - sortedCards[i].kind == 1) {
        sequence.push(sortedCards[i]);
        if (sequence.length == 5) {
          return sequence; // if we find the highest continuous sequence
        }
      } else {
        sequence = [sortedCards[i]]; // reset if not continuous sequence
      }
      previousCardKind = sortedCards[i].kind;
    }

    return [];
  }

  hasStraight(cards: Card[]): boolean {
    const sortedCards = cards.sort((a, b) => (a.kind < b.kind ? 1 : -1));
    let count = 1;
    let previousCardKind = sortedCards[0].kind;
    for (let i = 1; i < cards.length; i++) {
      if (previousCardKind == sortedCards[i].kind) {
        continue;
      }
      if (previousCardKind - sortedCards[i].kind == 1) {
        if (++count == 5) {
          return true; // if we find the highest continuous sequence
        }
      } else {
        count = 1; // reset if not continuous sequence
      }
      previousCardKind = sortedCards[i].kind;
    }

    return false;
  }

  findFlushCards(cards: Card[]): Card[] {
    let suitCount = [0, 0, 0, 0];
    let suitContainer = new Array<Card[]>(4);
    for (let i = 0; i < suitContainer.length; i++) {
      suitContainer[i] = [];
    }
    let flushSuit = -1;
    for (const card of cards) {
      suitCount[card.suit]++;
      suitContainer[card.suit].push(card);
      if (suitCount[card.suit] == 5) {
        flushSuit = card.suit;
      }
    }
    if (flushSuit > 0) {
      return suitContainer[flushSuit];
    }
    return [];
  }
}
