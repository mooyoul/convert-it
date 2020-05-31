import styled, { keyframes } from 'styled-components';

const spinnerKeyFrames = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
`;

export type SpinnerProps = {
  color: string;
  size: string;
}

export const Spinner = styled.div.attrs((props: SpinnerProps) => ({
  color: props.color || '#555',
  size: props.size || '48px',
  lineHeight: props.size || 48,
}))`
  display: inline-block;
  vertical-align: middle;

  &:before {   
    animation: ${spinnerKeyFrames} 500ms infinite linear;
    box-sizing: border-box;
    border: 2px solid ${(prop) => prop.color};
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    display: block;
    position: relative;
    margin: 0 auto;
    width: ${(prop) => `${prop.size}`};
    height: ${(prop) => `${prop.size}`};
  }
`;
