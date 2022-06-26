import { WebSocket } from 'ws';

export type ScreenshotProps = {
  ws: WebSocket;
  mousePos: {
    x: number;
    y: number;
  };
  wsStream: internal.Duplex;
};

export type FunctionProps = {
  ws: WebSocket;
  mousePos: {
    x: number;
    y: number;
  };
  command: string;
  value: string[];
  wsStream: internal.Duplex;
};
