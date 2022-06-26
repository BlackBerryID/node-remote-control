import robot from 'robotjs';
import type { FunctionProps } from '../../typings';

export const drawControlHandler = ({ wsStream, mousePos, command, value }: FunctionProps) => {
  switch (command) {
    case 'draw_circle':
      const radius = +value;
      robot.moveMouse(mousePos.x - radius, mousePos.y);
      robot.mouseToggle('down');
      for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        const x = mousePos.x - radius * Math.cos(i);
        const y = mousePos.y - radius * Math.sin(i);
        robot.dragMouse(x, y);
      }
      robot.mouseToggle('up');
      wsStream.write('draw_circle');
      break;

    case 'draw_rectangle':
      const [width, height] = value.map((item) => Number(item));
      const rectangleMousePos = mousePos;
      robot.mouseToggle('down');
      for (let i = 0; i <= width; i += 2) {
        const x = rectangleMousePos.x + i;
        const y = rectangleMousePos.y;
        robot.dragMouse(x, y);
      }
      rectangleMousePos.x += width;
      for (let i = 0; i <= height; i += 2) {
        const x = rectangleMousePos.x;
        const y = rectangleMousePos.y + i;
        robot.dragMouse(x, y);
      }
      rectangleMousePos.y += height;
      for (let i = 0; i <= width; i += 2) {
        const x = rectangleMousePos.x - i;
        const y = rectangleMousePos.y;
        robot.dragMouse(x, y);
      }
      rectangleMousePos.x -= width;
      for (let i = 0; i <= height; i += 2) {
        const x = rectangleMousePos.x;
        const y = rectangleMousePos.y - i;
        robot.dragMouse(x, y);
      }
      robot.mouseToggle('up');
      wsStream.write('draw_rectangle');
      break;

    case 'draw_square':
      const sideLength = +value;
      const squareMousePos = mousePos;
      robot.mouseToggle('down');
      for (let i = 0; i <= sideLength; i += 2) {
        const x = squareMousePos.x + i;
        const y = squareMousePos.y;
        robot.dragMouse(x, y);
      }
      squareMousePos.x += sideLength;
      for (let i = 0; i <= sideLength; i += 2) {
        const x = squareMousePos.x;
        const y = squareMousePos.y + i;
        robot.dragMouse(x, y);
      }
      squareMousePos.y += sideLength;
      for (let i = 0; i <= sideLength; i += 2) {
        const x = squareMousePos.x - i;
        const y = squareMousePos.y;
        robot.dragMouse(x, y);
      }
      squareMousePos.x -= sideLength;
      for (let i = 0; i <= sideLength; i += 2) {
        const x = squareMousePos.x;
        const y = squareMousePos.y - i;
        robot.dragMouse(x, y);
      }
      robot.mouseToggle('up');
      wsStream.write('draw_rectangle');
      break;

    default:
      break;
  }
};
