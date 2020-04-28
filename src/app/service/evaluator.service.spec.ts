import { TestBed } from '@angular/core/testing';

import { EvaluatorService } from './evaluator.service';
import { Card, Suit } from '../model/card';
import { HandRankType, Hand } from '../model/hand';

describe('EvaluatorService', () => {
  let service: EvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should determine hand to be royal flush', () => {
    // arrange
    const cards = [
      new Card(Suit.Clubs, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Clubs, 10),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Spades, 2),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.RoyalFlush);
  });

  it('should determine hand to be straight flush', () => {
    // arrange
    const cards = [
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Clubs, 10),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 8),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.StraightFlush);
  });

  it('should determine hand to be flush', () => {
    // arrange
    const cards = [
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Clubs, 2),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Clubs, 8),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.Flush);
  });

  it('should determine hand to be four-of-a-kind', () => {
    // arrange
    const cards = [
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Diamonds, 11),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.FourOffAKind);
  });

  it('should determine hand to be full house', () => {
    // arrange
    const cards = [
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 11),
      new Card(Suit.Heart, 11),
      new Card(Suit.Spades, 11),
      new Card(Suit.Diamonds, 13),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.FullHouse);
  });

  it('should determine hand to be a straight', () => {
    // arrange
    const cards = [
      new Card(Suit.Heart, 13),
      new Card(Suit.Clubs, 12),
      new Card(Suit.Clubs, 9),
      new Card(Suit.Heart, 11),
      new Card(Suit.Spades, 10),
      new Card(Suit.Diamonds, 13),
      new Card(Suit.Clubs, 3),
    ];
    // act
    const result = service.getHandFromCards(cards);
    // assert
    expect(result.handRank).toBe(HandRankType.Straight);
  });
});
