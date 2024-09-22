import {Injectable} from '@angular/core';
import {AppConstants} from "@app/app.constants";

/**
 * Interface for touch data
 */
type TouchData = {
  x: number,
  y: number,
  timeStamp: number
};

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for handling swipe events
 */
@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  private touchData: TouchData;

  /**
   * @constructor
   * Initializes the touch data
   */
  constructor() {
    this.touchData = {
      x: 0,
      y: 0,
      timeStamp: 0
    };
  }

  /**
   * Handles the touch start event by storing the touch data
   * @param event
   * @return void
   */
  public handleTouchStart(event: TouchEvent): void {
    const eventTouch: Touch = event.touches[0];
    this.touchData = {
      x: eventTouch.clientX,
      y: eventTouch.clientY,
      timeStamp: event.timeStamp
    };
  }

  /**
   * Handles the touch end event by determining the direction of the swipe
   * @param event
   * @return string
   */
  public handleTouchEnd(event: TouchEvent): string {
    const eventTouch: Touch = event.changedTouches[0];
    const deltaX: number = eventTouch.clientX - this.touchData.x;
    const deltaY: number = eventTouch.clientY - this.touchData.y;
    const deltaTime: number = event.timeStamp - this.touchData.timeStamp;
    const velocityX: number = Math.abs(deltaX / deltaTime);
    const velocityY: number = Math.abs(deltaY / deltaTime);

    if (velocityX > velocityY) {
      return deltaX > 0 ? AppConstants.SWIPE.RIGHT : AppConstants.SWIPE.LEFT;
    } else {
      return deltaY > 0 ? AppConstants.SWIPE.DOWN : AppConstants.SWIPE.UP;
    }
  }
}
