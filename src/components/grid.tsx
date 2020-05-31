import styled from 'styled-components';

export const GUTTER_SIZE = '12px';

export const Container = styled.div`
  padding: 0 ${GUTTER_SIZE};
`;

export const Col = styled(Container)`
  float: left;
`;

export const Col4 = styled(Col)`
  width: 33.3333333%;
`;
export const Col6 = styled(Col)`
  width: 50%;
`;
export const Col8 = styled(Col)`
  width: 66.6666667%;
`;
export const Col12 = styled(Col)`
  width: 100%;
`;

export const Row = styled.div`
  display: block;
  margin: 0 -${GUTTER_SIZE};

  &:before,
  &:after {
    display: table;
    content: '';
    clear: both;
    float: none;
  }
`;
