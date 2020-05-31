import * as React from 'react';
import styled from 'styled-components';

import { AnchorButton, Button, Select } from './form';
// eslint-disable-next-line object-curly-newline
import { Col4, Col8, Container, Row } from './grid';
import { Spinner } from './spinner';
import { useConverter } from './use-converter';

const FilenameLabel = styled.span`
  color: #333;
  padding: 0 8px;
  margin-right: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DetectedCharsetLabel = styled.code`
  background-color: #eef6fc;
  color: #1d72aa;
  border-radius: 4px;
  color: #4a4a4a;
  display: inline-block;
  padding: 0 8px;
  white-space: nowrap;
`;

const DownloadButton = styled(AnchorButton)`
  border: 0 none;
`;

const ConverterContainer = styled(Container)`
  background-color: #e0e0e0;
  padding: 8px 12px;
  
  ${Select},
  ${FilenameLabel},
  ${DownloadButton} {
    font-size: 18px;
    line-height: 48px;
    height: 48px;
  }
`;

export type ConverterProps = {
  blob: Blob;
};

export function Converter(props: ConverterProps) {
  const { blob } = props;

  const name = React.useMemo(
    () => (blob instanceof File ? blob.name : 'Blob'),
    [blob],
  );

  const state = useConverter(blob);

  const [objectUrl, setObjectUrl] = React.useState<string>();
  React.useEffect(() => {
    const { value } = state.conversion;
    const blobUrl = value && URL.createObjectURL(new Blob([value]));

    setObjectUrl(blobUrl);

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [state.conversion.value]);

  return (
    <ConverterContainer>
      <Row>
        <Col8>
          <FilenameLabel>
            { state.blob.isLoading && <Spinner size="18px" /> }
            { !state.blob.isLoading && name }
          </FilenameLabel>
          { state.charset.isLoading && <Spinner size="18px" /> }
          { state.charset.value && (
            <DetectedCharsetLabel>
              {state.charset.value}
            </DetectedCharsetLabel>
          )}
        </Col8>
        <Col4>
          { state.conversion.isLoading && <Button type="button" plain disabled><Spinner size="18px" /></Button> }
          { objectUrl && (
            <DownloadButton href={objectUrl} download={name}>Download</DownloadButton>
          )}
        </Col4>
      </Row>
    </ConverterContainer>
  );
}
