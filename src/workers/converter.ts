import { decode } from './decode';
import { detect } from './detect';
import { readAsArrayBuffer } from './read';

export const enum ActionType {
  INITIALIZED = 'initialized',
  STARTED = 'started',
  READ = 'read',
  ANALYZED = 'analyzed',
  CONVERTED = 'converted',
  FAILED = 'failed',
}

export type Initialized = {
  type: ActionType.INITIALIZED;
};

export type Started = {
  type: ActionType.STARTED;
};

export type Read = {
  type: ActionType.READ;
};

export type Analyzed = {
  type: ActionType.ANALYZED;
  data: {
    charset: string;
  };
};

export type Converted = {
  type: ActionType.CONVERTED;
  data: {
    charset: string;
    buffer: ArrayBuffer;
  };
};

export type Failed = {
  type: ActionType.FAILED;
  data: {
    error: string;
  };
};

export type Input = {
  blob: Blob;
};
export type Output = Initialized | Started | Read | Analyzed | Converted | Failed;

function createStartedAction(): Started {
  return { type: ActionType.STARTED };
}

function createReadAction(): Read {
  return { type: ActionType.READ };
}

function createAnalyzedAction(charset: string): Analyzed {
  return {
    type: ActionType.ANALYZED,
    data: { charset },
  };
}

function createConvertedAction(charset: string, buffer: ArrayBuffer): Converted {
  return {
    type: ActionType.CONVERTED,
    data: { charset, buffer },
  };
}
function createFailedAction(error: string): Failed {
  return {
    type: ActionType.FAILED,
    data: { error },
  };
}

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event) => {
  (async () => {
    postMessage(createStartedAction());

    const { blob } = event.data as Input;
    const ab = await readAsArrayBuffer(blob);

    postMessage(createReadAction());

    const charset = detect(Buffer.from(ab), blob.type);
    if (!charset) {
      throw new Error('Failed to detect charset. Maybe binary?');
    }

    postMessage(createAnalyzedAction(charset));

    const converted = decode(ab, charset);
    postMessage(createConvertedAction(charset, converted), [converted]);
  })().catch((e) => {
    postMessage(createFailedAction(e.message));
  });
});
