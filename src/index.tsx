import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { FileChooser } from './components/file-chooser';
import { Button } from './components/form';
import { Container } from './components/grid';

import { Converter } from './components/converter';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 20px;
  }
  
  .github-fork-ribbon:before {
    background-color: #333;
    position: fixed;
  }
`;

const AppContainer = styled(Container)`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  
  > * {
    margin-bottom: 20px;
  }
`;

const ConverterList = styled.div`
  > * {
    margin-bottom: 8px;
  }
`;

function App() {
  const [files, setFiles] = React.useState([] as File[]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const clearFiles = () => setFiles([]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <h1>Convert files to UTF-8</h1>
        <p>
          Automatically detect source charset & Convert to UTF-8, in Browser!
        </p>
        { files.length === 0 && <FileChooser onDrop={onDrop} /> }
        { files.length > 0 && (
          <ConverterList>
            { files.map((file: File) => (<Converter key={file.name} blob={file} />)) }
          </ConverterList>
        )}
        { files.length > 0 && (<Button type="button" onClick={clearFiles}>Reset</Button>) }
      </AppContainer>
    </>
  );
}

ReactDOM.render((<App />), document.getElementById('app'));
