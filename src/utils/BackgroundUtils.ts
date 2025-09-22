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

export function circlesGenerator(
  isDesktop: boolean,
  containerWidth: number,
  containerHeight: number,
) {
  const colors: Color[] = ['#FB8B24', '#D90368', '#820263'];
  const circles: Circle[] = [];

  const noOfCircles = 2;
  const sizeRange = {
    min: isDesktop ? 200 : 100,
    max: isDesktop ? 400 : 250,
  };

  // First Circle
  circles.push({
    color: colors[0],
    width: generateRandomNumber(sizeRange.min, sizeRange.max),
    position: generateRandomPosition(),
  });

  for (let i = 1; i < noOfCircles; i++) {
    let newCircle: Circle;
    let attempts = 0;

    do {
      const newWidth = generateRandomNumber(sizeRange.min, sizeRange.max);
      newCircle = {
        color: colors[i % colors.length],
        width: newWidth,
        position: {
          x: generateRandomNumber(0, 100),
          y: generateRandomNumber(0, 100),
        },
      };
      attempts++;
      console.log(attempts);
      if (attempts > 100) break; // avoid infinite loop if too crowded
    } while (
      isNewCircleColliding(newCircle, circles, containerWidth, containerHeight)
    );

    circles.push(newCircle);
  }

  return circles;
}

function isNewCircleColliding(
  newCircle: Circle,
  circles: Circle[],
  containerWidth: number,
  containerHeight: number,
): boolean {
  const newX = (newCircle.position.x / 100) * containerWidth;
  const newY = (newCircle.position.y / 100) * containerHeight;

  return circles.some((circle) => {
    const circleX = (circle.position.x / 100) * containerWidth;
    const circleY = (circle.position.y / 100) * containerHeight;

    const dx = newX - circleX;
    const dy = newY - circleY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist < newCircle.width / 2 + circle.width / 2;
  });
}
