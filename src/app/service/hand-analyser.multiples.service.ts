import { Injectable } from '@angular/core';
import { HandRankType, Hand } from '../model/hand';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class HandAnalyserMultiplesService {
  constructor() {}

  findMultiplesHand(cards: Card[]): Hand {
    const cardContainers = this.fillCardKinds(cards);
    const hand = new Hand();

    let index = 0;
    while (hand.cards.length < 5) {
      let currentKind = cardContainers[index][0].kind;

      let cardKindCount = cardContainers[index].length;

      if (hand.multiplesCardKinds.length < 2) {
        // add all the cards of the kind
        for (let i = 0; i < cardKindCount; i++) {
          hand.cards.push(cardContainers[index][i]);
        }
      } else {
        // when we already have two pairs, need to find next highest card
        if (!!cardContainers[index + 1]) {
          if (cardContainers[index][0] < cardContainers[index + 1][0]) {
            hand.cards.push(cardContainers[index + 1][0]);
            currentKind = cardContainers[index + 1][0].kind;
          } else {
            hand.cards.push(cardContainers[index][0]);
          }
        }
      }

      if (cardKindCount >= 2) {
        hand.multiplesCardKinds.push(currentKind);
      } else {
        hand.highCardKinds.push(currentKind);
      }

      hand.handRank = this.evaluateHandRankMultiples(
        hand.handRank,
        cardKindCount,
        hand.multiplesCardKinds.length
      );
      index++;
    }

    return hand;
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

  evaluateHandRankMultiples(
    currentRank: HandRankType,
    cardKindCount: number,
    multiplesCount: number
  ): HandRankType {
    if (cardKindCount == 4 || currentRank == HandRankType.FourOffAKind) {
      return HandRankType.FourOffAKind;
    }
    if (cardKindCount == 3) {
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
}
