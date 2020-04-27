export enum Suit {
  Heart,
  Spades,
  Clubs,
  Diamonds,
}
export class Card {
  suit: Suit;
  kind: number;
  constructor(suit: Suit, kind: number) {
    if (kind < 2 || kind > 13) {
      throw new Error(`Invalid card number: ${kind}`);
    }
    this.suit = suit;
    this.kind = kind;
  }
  log() {
    console.log(this.kind + ', ' + this.suit);
  }
}
