import robot from 'robotjs';
import Jimp from 'jimp';
import type { ScreenshotProps } from '../../typings';

export const screenshot = async ({ wsStream, mousePos }: ScreenshotProps) => {
  const imageBuffer = robot.screen.capture(mousePos.x + 200, mousePos.y + 200, 200, 200).image;
  new Jimp({ data: imageBuffer, width: 200, height: 200 }, (err: Error, jimpObject: Jimp) => {
    // from issue https://github.com/octalmage/robotjs/issues/13#issuecomment-348055347
    let pos = 0;
    jimpObject.scan(0, 0, 200, 200, (x, y, idx) => {
      /* eslint-disable no-plusplus */
      jimpObject.bitmap.data[idx + 2] = imageBuffer.readUInt8(pos++);
      jimpObject.bitmap.data[idx + 1] = imageBuffer.readUInt8(pos++);
      jimpObject.bitmap.data[idx + 0] = imageBuffer.readUInt8(pos++);
      jimpObject.bitmap.data[idx + 3] = imageBuffer.readUInt8(pos++);
      /* eslint-enable no-plusplus */
    });
    jimpObject.getBase64(Jimp.MIME_PNG, (err, value) => {
      const base64 = value.split(',')[1];
      wsStream.write(`prnt_scrn ${base64}`);
    });
  });
};
