import robot from 'robotjs';
import type { FunctionProps } from '../../typings';

export const mouseControlHandler = ({ wsStream, mousePos, command, value }: FunctionProps) => {
  const pxAmount = +value[0];
  switch (command) {
    case 'mouse_up':
      wsStream.write(`mouse_up`);
      robot.moveMouse(mousePos.x, mousePos.y - pxAmount);
      break;
    case 'mouse_down':
      wsStream.write(`mouse_down`);
      robot.moveMouse(mousePos.x, mousePos.y + pxAmount);
      break;
    case 'mouse_left':
      wsStream.write(`mouse_left`);
      robot.moveMouse(mousePos.x - pxAmount, mousePos.y);
      break;
    case 'mouse_right':
      wsStream.write(`mouse_right`);
      robot.moveMouse(mousePos.x + pxAmount, mousePos.y);
      break;
    case 'mouse_position':
      wsStream.write(`mouse_position ${mousePos.x}px,${mousePos.y}px`);
      break;

    default:
      break;
  }
};
