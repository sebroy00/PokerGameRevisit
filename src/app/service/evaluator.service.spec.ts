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

  it('should have player B win the hand with a higher full house', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.FullHouse;
    handA.multiplesCardKinds = [10, 4];
    const handB = new Hand();
    handB.handRank = HandRankType.FullHouse;
    handB.multiplesCardKinds = [10, 5];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(-1);
  });

  it('should have player A win the hand with a higher full house', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.FullHouse;
    handA.multiplesCardKinds = [11, 5];
    const handB = new Hand();
    handB.handRank = HandRankType.FullHouse;
    handB.multiplesCardKinds = [10, 5];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(1);
  });

  it('should have player A win the hand with a higher card on flush', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.Flush;
    handA.highCardKinds = [11];
    handA.multiplesCardKinds = [];
    const handB = new Hand();
    handB.handRank = HandRankType.Flush;
    handB.highCardKinds = [10];
    handB.multiplesCardKinds = [];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(1);
  });

  it('should have player A win the hand with a higher card on straight flush', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.StraightFlush;
    handA.highCardKinds = [11];
    handA.multiplesCardKinds = [];
    const handB = new Hand();
    handB.handRank = HandRankType.StraightFlush;
    handB.highCardKinds = [10];
    handB.multiplesCardKinds = [];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(1);
  });

  it('should have player B win the hand with a higher second pair', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.TwoPair;
    handA.highCardKinds = [11];
    handA.multiplesCardKinds = [10, 4];
    const handB = new Hand();
    handB.handRank = HandRankType.TwoPair;
    handB.highCardKinds = [10];
    handB.multiplesCardKinds = [10, 8];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(-1);
  });

  it('should have player B win the hand with a higher card after two pairs', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.TwoPair;
    handA.highCardKinds = [8];
    handA.multiplesCardKinds = [3, 2];
    const handB = new Hand();
    handB.handRank = HandRankType.TwoPair;
    handB.highCardKinds = [12];
    handB.multiplesCardKinds = [3, 2];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(-1);
  });

  it('should have player A win the hand with a higher card of straight', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.Straight;
    handA.highCardKinds = [13];
    handA.multiplesCardKinds = [];
    const handB = new Hand();
    handB.handRank = HandRankType.Straight;
    handB.highCardKinds = [12];
    handB.multiplesCardKinds = [];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(1);
  });

  it('should have split pot with same high cards', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.HighCard;
    handA.highCardKinds = [13, 10, 8, 7, 6];
    handA.multiplesCardKinds = [];
    const handB = new Hand();
    handB.handRank = HandRankType.HighCard;
    handB.highCardKinds = [13, 10, 8, 7, 6];
    handB.multiplesCardKinds = [];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(0);
  });

  it('should have player A win on high card', () => {
    // arrange
    const handA = new Hand();
    handA.handRank = HandRankType.HighCard;
    handA.highCardKinds = [13, 10, 8, 7, 6];
    handA.multiplesCardKinds = [];
    const handB = new Hand();
    handB.handRank = HandRankType.HighCard;
    handB.highCardKinds = [13, 10, 8, 7, 5];
    handB.multiplesCardKinds = [];

    // act
    const result = service.compareHands(handA, handB);
    // assert
    expect(result).toBe(1);
  });
});
