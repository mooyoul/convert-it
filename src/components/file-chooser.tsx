import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const FileChooserContainer = styled.div`
.dropzone-root {
  position: relative;
  height: 120px;
  border: 1px dashed #555;
  cursor: pointer;
}

.dropzone-root .dropzone-label {
  color: #555;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`;

export type FileChooserProps = {
  onDrop(files: File[]): void;
}
export function FileChooser(props: FileChooserProps) {
  const { onDrop } = props;
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <FileChooserContainer>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className="dropzone-root" {...getRootProps()}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <p className="dropzone-label">Drag &lsquo;n&rsquo; drop some files here, or click to select files</p>
      </div>
    </FileChooserContainer>
  );
}
