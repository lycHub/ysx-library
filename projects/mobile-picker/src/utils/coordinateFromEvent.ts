import { ClientCoordinate } from '../types';

export type GetClientPositionFromEvent = {
  (event: MouseEvent): ClientCoordinate;

  (event: TouchEvent): ClientCoordinate | undefined;

  (event: MouseEvent | TouchEvent): ClientCoordinate | undefined;
};

function getClientCoordinateFromTouchList(
  touches: TouchList,
): ClientCoordinate | undefined {
  if (touches.length === 0) {
    return undefined;
  }

  const touch = touches.item(0);
  if (!touch) {
    return undefined;
  }

  return {
    clientX: touch.clientX,
    clientY: touch.clientY,
  };
}

export const getClientCoordinateFromEvent = ((
  event: MouseEvent | TouchEvent,
): ClientCoordinate | undefined => {
  if ('clientX' in event && 'clientY' in event) {
    return {
      clientX: event.clientX,
      clientY: event.clientY,
    };
  }

  if ('touches' in event) {
    const touch = getClientCoordinateFromTouchList(event.touches);

    if (touch) {
      return touch;
    }
  }

  // This occurs if the last finger is lifted from the screen.
  if ('changedTouches' in event) {
    const touch = getClientCoordinateFromTouchList(event.changedTouches);

    if (touch) {
      return touch;
    }
  }

  return undefined;
}) as GetClientPositionFromEvent;
