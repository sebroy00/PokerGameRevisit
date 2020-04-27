import { TestBed } from '@angular/core/testing';

import { HandAnalyserSeriesService } from './hand-analyser.series.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Card, Suit } from '../model/card';
import { HandRankType } from '../model/hand';

describe('HandAnalyserSeriesService', () => {
  let service: HandAnalyserSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandAnalyserSeriesService);
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
