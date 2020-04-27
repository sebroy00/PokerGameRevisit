import { TestBed } from '@angular/core/testing';

import { RankingService } from './ranking.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Card, Suit } from '../model/card';

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
    const result = service.findMultiplesHand(cards);
    // assert
    expect(result[0].kind).toEqual(11);
    expect(result[1].kind).toEqual(11);
    expect(result[2].kind).toEqual(8);
    expect(result[3].kind).toEqual(8);
    expect(result[4].kind).toEqual(13);
    expect(result.length).toEqual(5);
  });
});
