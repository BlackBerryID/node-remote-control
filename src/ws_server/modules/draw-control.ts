import robot from 'robotjs';
import type { FunctionProps } from '../../typings';

export const drawControlHandler = ({ ws, mousePos, command, value }: FunctionProps) => {
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
      ws.send('draw_circle');
      break;

    default:
      break;
  }
};
