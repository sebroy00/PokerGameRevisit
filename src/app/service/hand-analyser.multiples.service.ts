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
}
