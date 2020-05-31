import * as React from 'react';
// eslint-disable-next-line
import { ActionType, Failed, Input, Output } from '../workers/converter';

// eslint-disable-next-line
const WORKER_URL = require('worker!../workers/converter');
const WORKER_FACTORY = () => new Worker(WORKER_URL);

export type ConverterState = {
  error?: string;
  blob: {
    isLoading: boolean;
  };
  charset: {
    isLoading: boolean;
    value?: string;
  };
  conversion: {
    isLoading: boolean;
    value?: ArrayBuffer;
  };
};

function initializeState(): ConverterState {
  return {
    blob: { isLoading: true },
    charset: { isLoading: true },
    conversion: { isLoading: true },
  };
}

function reducer(state: ConverterState, action: Output): ConverterState {
  switch (action.type) {
    case ActionType.INITIALIZED:
    case ActionType.STARTED:
      return {
        ...state,
        blob: { isLoading: true },
        charset: { isLoading: true },
        conversion: { isLoading: true },
      };
    case ActionType.READ:
      return {
        ...state,
        blob: { isLoading: false },
      };
    case ActionType.ANALYZED:
      return {
        ...state,
        charset: { isLoading: false, value: action.data.charset },
      };
    case ActionType.CONVERTED: {
      return {
        ...state,
        conversion: { isLoading: false, value: action.data.buffer },
      };
    }
    case ActionType.FAILED: {
      return {
        ...state,
        error: action.data.error,
        blob: { isLoading: false },
        charset: { isLoading: false },
        conversion: { isLoading: false },
      };
    }
    default:
      return initializeState();
  }
}


export function useConverter<I, O>(
  blob: Blob,
  transfer: any[] = [],
) {
  const input = React.useMemo<Input>(() => ({ blob }), [blob]);
  const [state, dispatch] = React.useReducer(reducer, initializeState());

  const worker = React.useMemo<Worker>(WORKER_FACTORY, [WORKER_FACTORY]);
  const activeWorker = React.useRef<Worker | null>(null);

  React.useEffect(() => {
    activeWorker.current = worker;

    worker.onmessage = (e) => dispatch(e.data as Output);

    worker.onerror = () => dispatch({
      type: ActionType.FAILED,
      data: { error: 'Worker Error' },
    } as Failed);

    worker.onmessageerror = () => dispatch({
      type: ActionType.FAILED,
      data: { error: 'Worker Message Error' },
    } as Failed);

    return () => {
      // eslint-disable-next-line no-multi-assign
      worker.onmessage = worker.onerror = worker.onmessageerror = null;
      worker.terminate();
      dispatch({ type: ActionType.INITIALIZED });
    };
  }, [worker]);

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    activeWorker.current?.postMessage(input, transfer);
  }, [input]);

  return state;
}
