import type { Circle, Color, Position } from '../types/BackgroundTypes';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateRandomPosition(): Position {
  return {
    x: generateRandomNumber(0, 100),
    y: generateRandomNumber(0, 100),
  };
}

export function circlesGenerator(isDesktop: boolean) {
  const colors: Color[] = ['#FB8B24', '#D90368', '#820263'];
  const circles: Circle[] = [];

  const noOfCircles = 2;
  const sizeRange = {
    min: 100,
    max: 250,
  };

  if (isDesktop) {
    sizeRange.min = 200;
    sizeRange.max = 400;
  }

  // First Circle
  circles.push({
    color: colors[0],
    width: generateRandomNumber(sizeRange.min, sizeRange.max),
    position: generateRandomPosition(),
  });

  for (let i = 1; i < noOfCircles; i++) {
    const newWidth = generateRandomNumber(sizeRange.min, sizeRange.max);
    const prevPosition: Position = circles[i - 1].position;

    // new circle position is randomly offset from prev position
    const newPosition: Position = {
      x: (generateRandomNumber(10, 30) + prevPosition.x + newWidth) % 101,
      y: (generateRandomNumber(10, 30) + prevPosition.y + newWidth) % 101,
    };

    const newCircle = {
      color: colors[i],
      width: newWidth,
      position: newPosition,
    };

    circles.push(newCircle);
  }

  return circles;
}
