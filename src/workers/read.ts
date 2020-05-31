const readers = new WeakMap<Blob, FileReader>();

function createReader(blob: Blob): FileReader {
  const cached = readers.get(blob);
  if (cached) { return cached; }

  const reader = new FileReader();
  readers.set(blob, reader);

  return reader;
}

export function readAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = createReader(blob);

    reader.onload = () => {
      reader.onerror = null;
      reader.onload = null;

      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = () => {
      reader.onerror = null;
      reader.onload = null;

      reject(reader.error);
    };

    reader.readAsArrayBuffer(blob);
  });
}
