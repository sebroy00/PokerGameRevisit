import { TestBed } from '@angular/core/testing';

import { RankingService } from './ranking.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Card, Suit } from '../model/card';
import { HandRankType } from '../model/hand';

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all flush cards', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 3),
      new Card(Suit.Clubs, 7),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 5),
    ];
    // act
    const result = service.findFlushCards(cards);
    // assert
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toEqual(7);
  });

  it('should return true when player has straight', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 3),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 5),
      new Card(Suit.Clubs, 6),
      new Card(Suit.Clubs, 10),
      new Card(Suit.Clubs, 11),
    ];
    // act
    const result = service.hasStraight(cards);
    // assert
    expect(result).toBeTruthy();
  });

  it('should return true when player has straight with a pair', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 3),
      new Card(Suit.Heart, 3),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 5),
      new Card(Suit.Clubs, 6),
      new Card(Suit.Clubs, 11),
    ];
    // act
    const result = service.hasStraight(cards);
    // assert
    expect(result).toBeTruthy();
  });

  it('should return true when player has a pair', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 3),
      new Card(Suit.Heart, 3),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 10),
      new Card(Suit.Clubs, 6),
      new Card(Suit.Clubs, 11),
    ];
    // act
    const result = service.hasMultiples(cards);
    // assert
    expect(result).toBeTruthy();
  });

  it('should return true when player has a multiple', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 11),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Heart, 3),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 10),
      new Card(Suit.Clubs, 6),
      new Card(Suit.Clubs, 11),
    ];
    // act
    const result = service.hasMultiples(cards);
    // assert
    expect(result).toBeTruthy();
  });

  it('should have correct card order for kind counts (length of each array)', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 3),
      new Card(Suit.Clubs, 4),
      new Card(Suit.Clubs, 2),
      new Card(Suit.Spades, 2),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.fillCardKinds(cards);
    // assert
    for (let i = 1; i < result.length - 1; i++) {
      expect(result[i].length).toBeGreaterThanOrEqual(result[i + 1].length);
      if (
        result[i].length == result[i + 1].length &&
        result[i].length != 0 &&
        result[i + 1].length != 0
      ) {
        expect(result[i][0].kind).toBeGreaterThan(result[i + 1][0].kind);
      }
    }
  });

  it('should have correct card order for same count of multiples', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Diamonds, 2),
      new Card(Suit.Spades, 2),
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.fillCardKinds(cards);
    // assert
    for (let i = 1; i < result.length - 1; i++) {
      expect(result[i].length).toBeGreaterThanOrEqual(result[i + 1].length);
      if (
        result[i].length == result[i + 1].length &&
        result[i].length != 0 &&
        result[i + 1].length != 0
      ) {
        expect(result[i][0].kind).toBeGreaterThan(result[i + 1][0].kind);
      }
    }
  });

  it('should have correct card order for one pair', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 5),
      new Card(Suit.Diamonds, 7),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.fillCardKinds(cards);
    // assert
    for (let i = 1; i < result.length - 1; i++) {
      expect(result[i].length).toBeGreaterThanOrEqual(result[i + 1].length);
      if (
        result[i].length == result[i + 1].length &&
        result[i].length != 0 &&
        result[i + 1].length != 0
      ) {
        expect(result[i][0].kind).toBeGreaterThan(result[i + 1][0].kind);
      }
    }
  });

  it('should return two pairs hand with high card', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 5),
      new Card(Suit.Diamonds, 8),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesCards(cards);
    // assert
    expect(result[0].kind).toEqual(11);
    expect(result[1].kind).toEqual(11);
    expect(result[2].kind).toEqual(8);
    expect(result[3].kind).toEqual(8);
    expect(result[4].kind).toEqual(13);
    expect(result.length).toEqual(5);
  });

  it('should return two pairs hand with high card', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 5),
      new Card(Suit.Diamonds, 8),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.cards[0].kind).toEqual(11);
    expect(result.cards[1].kind).toEqual(11);
    expect(result.cards[2].kind).toEqual(8);
    expect(result.cards[3].kind).toEqual(8);
    expect(result.cards[4].kind).toEqual(13);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.TwoPair);
  });

  it('should return full house', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Diamonds, 8),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.cards[0].kind).toEqual(11);
    expect(result.cards[1].kind).toEqual(11);
    expect(result.cards[2].kind).toEqual(11);
    expect(result.cards[3].kind).toEqual(8);
    expect(result.cards[4].kind).toEqual(8);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.FullHouse);
  });

  it('should return four of a kind', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.multiplesCardKinds[0]).toEqual(11);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.FourOffAKind);
  });

  it('should return three of a kind', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.multiplesCardKinds[0]).toEqual(11);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.ThreeOfAKind);
  });

  it('should return two pair', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 12),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.multiplesCardKinds[0]).toEqual(12);
    expect(result.multiplesCardKinds[1]).toEqual(11);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.TwoPair);
  });

  it('should return one pair', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Heart, 5),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.multiplesCardKinds[0]).toEqual(11);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.OnePair);
  });

  it('should return high card', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 4),
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result.highCardKinds[0]).toEqual(13);
    expect(result.highCardKinds[1]).toEqual(12);
    expect(result.highCardKinds[2]).toEqual(11);
    expect(result.cards.length).toEqual(5);
    expect(result.handRank).toEqual(HandRankType.HighCard);
  });

  it('should return straight cards', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 12),
      new Card(Suit.Heart, 13),
      new Card(Suit.Diamonds, 10),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 6),
    ];
    // act
    const result = service.findStraightCards(cards);
    // assert
    expect(result[0].kind).toEqual(13);
    expect(result[1].kind).toEqual(12);
    expect(result[2].kind).toEqual(11);
    expect(result[3].kind).toEqual(10);
    expect(result[4].kind).toEqual(9);
    expect(result.length).toEqual(5);
  });

  it('should return straight cards (lower straight)', () => {
    // arrange
    const cards = [
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Spades, 7),
      new Card(Suit.Heart, 13),
      new Card(Suit.Diamonds, 10),
      new Card(Suit.Spades, 8),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 13),
    ];
    // act
    const result = service.findStraightCards(cards);
    // assert
    expect(result[0].kind).toEqual(11);
    expect(result.length).toEqual(5);
  });
});
