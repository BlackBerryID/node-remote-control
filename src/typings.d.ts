import { WebSocket } from 'ws';

export type FunctionProps = {
  ws: WebSocket;
  mousePos: {
    x: number;
    y: number;
  };
  command: string;
  value: string;
};
