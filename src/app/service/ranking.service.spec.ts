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
});
