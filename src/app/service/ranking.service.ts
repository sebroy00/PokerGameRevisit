import { Injectable } from '@angular/core';
import { Card, Suit } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor() {}

  findMultiplesHand(cards: Card[]): Card[] {
    const cardContainers = this.fillCardKinds(cards);
    if (cardContainers[0].length < 2) {
      return [];
    }
    return [];
  }
  fillCardKinds(cards: Card[]): Card[][] {
    const kindContainers = new Array<Card[]>(13).fill([]);
    for (const card of cards) {
      kindContainers[card.kind - 2].push(card);
    }
    return kindContainers.sort((a, b) => (a.length < b.length ? 1 : -1));
  }

  hasMultiples(cards: Card[]): boolean {
    const count = new Array(13).fill(0);
    for (const card of cards) {
      if (++count[card.kind - 2] == 2) {
        return true;
      }
    }
    return false;
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
    let suitContainer = new Array<Card[]>(4).fill([]);
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
