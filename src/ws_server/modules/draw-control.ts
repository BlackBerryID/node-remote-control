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
    case 'draw_rectangle':
      const [width, height] = value.map((item) => Number(item));
      const tempMousePos = mousePos;
      robot.mouseToggle('down');
      for (let i = 0; i <= width; i += 2) {
        const x = tempMousePos.x + i;
        const y = tempMousePos.y;
        robot.dragMouse(x, y);
      }
      tempMousePos.x += width;
      for (let i = 0; i <= height; i += 2) {
        const x = tempMousePos.x;
        const y = tempMousePos.y + i;
        robot.dragMouse(x, y);
      }
      tempMousePos.y += height;
      for (let i = 0; i <= width; i += 2) {
        const x = tempMousePos.x - i;
        const y = tempMousePos.y;
        robot.dragMouse(x, y);
      }
      tempMousePos.x -= width;
      for (let i = 0; i <= height; i += 2) {
        const x = tempMousePos.x;
        const y = tempMousePos.y - i;
        robot.dragMouse(x, y);
      }

      robot.mouseToggle('up');
      ws.send('draw_rectangle');
      break;

    default:
      break;
  }
};
