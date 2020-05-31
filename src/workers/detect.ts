import * as chardet from 'chardet';
import * as contentType from 'content-type';
import * as iconv from 'iconv-lite';

type Recogniser = (buf: Buffer, mime?: string) => string | null;

const recognisers: Recogniser[] = [
  // from mime type
  (buf: Buffer, mime?: string) => {
    const contentTypeHeader = contentType.parse(mime || 'text/plain');

    return contentTypeHeader.parameters.charset || null;
  },
  // or detect charset using ICU
  (buf: Buffer, mime?: string) => { // eslint-disable-line no-unused-vars
    const detectedLanguages = chardet.analyse(buf);

    if (detectedLanguages.length > 0) {
      const [candidate] = detectedLanguages;

      // Only if confidence is grater than 50%
      if (candidate.confidence > 50) {
        return candidate.name;
      }
    }

    return null;
  },
];

function validateCharset(buf: Buffer, charset: string, sampleSize = 16): boolean {
  const str = iconv.decode(buf, charset);

  if (str && str.length > 0) {
    const sample = str.slice(0, sampleSize).split('');

    return sample.every((char) => char.charCodeAt(0) !== 65533);
  }

  return false;
}

export function detect(buf: Buffer, mime?: string): string {
  // eslint-disable-next-line no-restricted-syntax
  for (const recogniser of recognisers) {
    try {
      const detectedCharset = recogniser(buf, mime);
      const isValid = detectedCharset && validateCharset(buf, detectedCharset);

      if (isValid) {
        return detectedCharset!;
      }
    } catch (e) { /* swallow error */ }
  }

  return 'utf8';
}
