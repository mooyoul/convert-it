import * as React from 'react';

export type DownloadButtonProps = {
  buffer: ArrayBuffer;
  download: string;
};

export function DownloadButton(props: DownloadButtonProps) {
  const { buffer, download } = props;

  const [objectUrl, setObjectUrl] = React.useState<string>();

  React.useEffect(() => {
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  });
}
