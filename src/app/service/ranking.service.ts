import { Injectable } from '@angular/core';
import { Card, Suit } from '../model/card';
import { Hand, HandRankType } from '../model/hand';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor() {}

  findMultiplesHand(cards: Card[]): Hand {
    const cardContainers = this.fillCardKinds(cards);
    const handResult = new Hand();

    let containerIndex = 0;
    while (handResult.cards.length < 5) {
      for (let i = 0; i < cardContainers[containerIndex].length; i++) {
        handResult.cards.push(cardContainers[containerIndex][i]);
      }
      if (cardContainers[containerIndex].length >= 2) {
        handResult.multiplesCardKinds.push(
          cardContainers[containerIndex][0].kind
        );
      } else {
        handResult.highCardKinds.push(cardContainers[containerIndex][0].kind);
      }
      handResult.handRank = this.evaluateHandRankMultiples(
        handResult.handRank,
        cardContainers[containerIndex].length,
        handResult.multiplesCardKinds.length
      );
      containerIndex++;
    }

    return handResult;
  }

  evaluateHandRankMultiples(
    currentRank: HandRankType,
    containerCount: number,
    multiplesCount: number
  ): HandRankType {
    console.log(currentRank);
    if (containerCount == 4 || currentRank == HandRankType.FourOffAKind) {
      return HandRankType.FourOffAKind;
    }
    if (containerCount == 3) {
      if (currentRank == HandRankType.ThreeOfAKind) {
        return HandRankType.FullHouse;
      } else {
        return HandRankType.ThreeOfAKind;
      }
    }

    if (multiplesCount == 2) {
      if (currentRank == HandRankType.ThreeOfAKind) {
        return HandRankType.FullHouse;
      }
      return HandRankType.TwoPair;
    } else if (multiplesCount == 1) {
      if (currentRank == HandRankType.ThreeOfAKind) {
        return HandRankType.ThreeOfAKind;
      }
      return HandRankType.OnePair;
    }

    return HandRankType.HighCard;
  }

  findMultiplesCards(cards: Card[]): Card[] {
    const cardContainers = this.fillCardKinds(cards);
    const handResult: Card[] = [];
    if (cardContainers[0].length < 2) {
      // no multiples found
      console.log('no multi');
      return [];
    }
    let containerIndex = 0;
    while (handResult.length < 5) {
      for (let i = 0; i < cardContainers[containerIndex].length; i++) {
        handResult.push(cardContainers[containerIndex][i]);
      }
      containerIndex++;
    }
    return handResult;
  }

  fillCardKinds(cards: Card[]): Array<Card[]> {
    let kindContainers = new Array<Card[]>(13);
    for (let i = 0; i < kindContainers.length; i++) {
      kindContainers[i] = [];
    }

    for (let card of cards) {
      const index = card.kind - 2;
      kindContainers[index].push(card);
    }

    return kindContainers.sort((a, b) => {
      if (a.length == 0 && b.length == 0) {
        return 0;
      }
      return b.length - a.length || b[0].kind - a[0].kind;
    }); //sort descending by total count, then by kind
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
