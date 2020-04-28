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

  highCardKinds: number[];
  multiplesCardKinds: number[];

  constructor() {
    this.cards = [];
    this.highCardKinds = [];
    this.multiplesCardKinds = [];
  }

  logCards() {
    for (const card of this.cards) {
      card.log();
    }
    console.log(this.highCardKinds);
  }
}
