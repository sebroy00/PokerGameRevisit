import { Card } from './card';

export enum HandRankType {
  RoyalFlush = 10,
  StraightFlush = 9,
  FourOffAKind = 8,
  FullHouse = 7,
  Flush = 6,
  Straight = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}
export class Hand {
  cards: Card[];

  handRank: HandRankType;

  highCardKind: number;
  pairCardKinds: number[];
  multiplesCardKinds: number; // 3 or 4 of same kind

  constructor(cards: Card[], handRank: HandRankType) {
    this.cards = cards;
    this.handRank = handRank;
  }
}
