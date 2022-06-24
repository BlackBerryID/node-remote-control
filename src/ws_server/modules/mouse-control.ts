import robot from 'robotjs';
import type { FunctionProps } from '../../typings';

export const mouseControlHandler = ({ ws, mousePos, command, value }: FunctionProps) => {
  const pxAmount = +value[0];
  switch (command) {
    case 'mouse_up':
      ws.send(`mouse_up`);
      robot.moveMouse(mousePos.x, mousePos.y - pxAmount);
      break;
    case 'mouse_down':
      ws.send(`mouse_down`);
      robot.moveMouse(mousePos.x, mousePos.y + pxAmount);
      break;
    case 'mouse_left':
      ws.send(`mouse_left`);
      robot.moveMouse(mousePos.x - pxAmount, mousePos.y);
      break;
    case 'mouse_right':
      ws.send(`mouse_right`);
      robot.moveMouse(mousePos.x + pxAmount, mousePos.y);
      break;
    case 'mouse_position':
      ws.send(`mouse_position ${mousePos.x}px,${mousePos.y}px`);
      break;

    default:
      break;
  }
};
