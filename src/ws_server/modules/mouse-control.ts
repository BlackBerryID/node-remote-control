import robot from 'robotjs';
import type { FunctionProps } from '../../typings';

export const mouseControlHandler = ({ ws, mousePos, command, value }: FunctionProps) => {
  switch (command) {
    case 'mouse_up':
      ws.send(`mouse_up`);
      robot.moveMouse(mousePos.x, mousePos.y - +value);
      break;
    case 'mouse_down':
      ws.send(`mouse_down`);
      robot.moveMouse(mousePos.x, mousePos.y + +value);
      break;
    case 'mouse_left':
      ws.send(`mouse_left`);
      robot.moveMouse(mousePos.x - +value, mousePos.y);
      break;
    case 'mouse_right':
      ws.send(`mouse_right`);
      robot.moveMouse(mousePos.x + +value, mousePos.y);
      break;
    case 'mouse_position':
      ws.send(`mouse_position ${mousePos.x}px,${mousePos.y}px`);
      break;

    default:
      break;
  }
};
