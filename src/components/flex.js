import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import utils from './utils';

export const flexDefault = {
  debug: false,
  useGrid: false,
  columns: 12,
  breakPoints: {
    ...utils.breakPoints
  },
  display: 'flex',
  columns: 12,
  flow: 'row',
  wrap: 'nowrap',
  justify: 'flex-start',
  align: 'flex-start',
  content: 'flex-start'
}

const FlexContainer = styled.div`
  display: ${props => props.display};
  flex-direction: ${props => props.flow};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  align-content: ${props => props.content};
  position: relative;

  ${props => {
    if(props.debug) {
      return `background: rgba(0,0,0,0.20);`
    }
  }}
`

export default class Flex extends Component {
  static propTypes = {
    debug: t.bool,
    useGrid: t.bool,
    columns: t.number,
    breakPoints: t.object,
    display: t.oneOf(['flex', 'inline-flex']),
    columns: t.number,
    flow: t.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    wrap: t.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
    justify: t.oneOf(['flex-start', 'flex-end', 'center', 'space-around', 'space-between']),
    align: t.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    content: t.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline'])
  }

  static defaultProps = flexDefault

  render() {
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child, {
      display: this.props.display,
      debug: this.props.debug,
      useGrid: this.props.useGrid,
      columns: this.props.columns,
      breakPoints: this.props.breakPoints
    }))

    return (
      <FlexContainer {...this.props}>
        {childrenWithInjectedProps}
      </FlexContainer>
    );
  }
}
