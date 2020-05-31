import * as iconv from 'iconv-lite';

export function decode(buf: ArrayBuffer, charset: string): ArrayBuffer {
  const bufInput = Buffer.from(buf);
  const output = iconv.decode(bufInput, charset);
  const bufOutput = Buffer.from(output, 'utf8');

  return bufOutput.buffer;
}
