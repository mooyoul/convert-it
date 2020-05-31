import styled, { css } from 'styled-components';

const FormControl = css`
  display: block;
  width: 100%;
  border: 1px solid #555;
  border-radius: 0;
  padding: 0 12px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: #333;
  background: none #fff;
`;

export const Select = styled.select`
  ${FormControl}
`;

export type ButtonProps = {
  plain?: boolean;
};

export const ButtonBase = css`
  ${FormControl}
  text-decoration: none;
  text-align: center;
  border: ${(props: ButtonProps) => (props.plain && '0 none')};
`;

export const Button = styled.button`
  ${ButtonBase}
`;

export const AnchorButton = styled.a`
  ${ButtonBase}
`;
