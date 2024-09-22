import {TestBed} from '@angular/core/testing';

import {SwipeService} from './swipe.service';
import {AppConstants} from "@app/app.constants";

describe('SwipeService', () => {
  let service: SwipeService;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipeService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should handle touch start correctly', () => {
    const mockTouchEvent: TouchEvent = {
      touches: [{clientX: 100, clientY: 150}],
      timeStamp: 1000
    } as unknown as TouchEvent;

    service.handleTouchStart(mockTouchEvent);

    expect(service['touchData']).toEqual({
      x: 100,
      y: 150,
      timeStamp: 1000
    });
  });

  it('should return swipe left for valid left swipe', () => {
    const mockTouchStartEvent = {
      touches: [{clientX: 200, clientY: 200}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 100, clientY: 200}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.LEFT);
  });

  it('should return swipe right for valid right swipe', () => {
    const mockTouchStartEvent: TouchEvent = {
      touches: [{clientX: 100, clientY: 200}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 200, clientY: 200}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.RIGHT);
  });

  it('should return swipe up for valid upward swipe', () => {
    const mockTouchStartEvent: TouchEvent = {
      touches: [{clientX: 200, clientY: 200}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 200, clientY: 100}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.UP);
  });

  it('should return swipe down for valid downward swipe', () => {
    const mockTouchStartEvent: TouchEvent = {
      touches: [{clientX: 200, clientY: 100}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 200, clientY: 200}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.DOWN);
  });

  it('should detect horizontal swipes when velocityX is higher', () => {
    const mockTouchStartEvent: TouchEvent = {
      touches: [{clientX: 100, clientY: 200}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 250, clientY: 205}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.RIGHT);
  });

  it('should detect vertical swipes when velocityY is higher', () => {
    const mockTouchStartEvent: TouchEvent = {
      touches: [{clientX: 200, clientY: 100}],
      timeStamp: 1000
    } as unknown as TouchEvent;
    service.handleTouchStart(mockTouchStartEvent);

    const mockTouchEndEvent: TouchEvent = {
      changedTouches: [{clientX: 205, clientY: 250}],
      timeStamp: 1200
    } as unknown as TouchEvent;

    const result: string = service.handleTouchEnd(mockTouchEndEvent);
    expect(result).toBe(AppConstants.SWIPE.DOWN);
  });
});
