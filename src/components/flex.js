import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import utils from './utils';

/**
 * SMART PROPS
 * ==================================================
 * NONE
 */

/**
 * Default styles if some are not provided
 */
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

/**
 * The flexbox styled for the container
 * 
 * Note: Since flexbox does not really act on its children for layout purposes,
 *       most of the layout dicisions are made by the box
 */
const FlexContainer = styled.div`
  display: ${props => props.display};
  flex-direction: ${props => props.flow};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  align-content: ${props => props.content};
  position: relative;

  ${/**
   * DEBUG MODE
   * ===========
   */ ''}
  ${props => {
    if(props.debug) {
      return `background: rgba(0,0,0,0.20);`
    }
  }}
`

export default class Flex extends Component {
  static propTypes = {
    /**
     * Used to show borders and background for debuging
     */
    debug: t.bool,

    /**
     * Allows for the use of a bootstrap like grid
     */
    useGrid: t.bool,

    /**
     * How many columns the grid should have if enabled
     */
    columns: t.number,

    /**
     * Defines the breakpoints for media quiries
     */
    breakPoints: t.object,

    /**
     * Whether the container should be an inline flexbox or just flexbox
     */
    display: t.oneOf(['flex', 'inline-flex']),

    /**
     * The direction of the flexbox
     */
    flow: t.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),

    /**
     * If the container should allow wrapping. Useful when the grid is used
     */
    wrap: t.oneOf(['nowrap', 'wrap', 'wrap-reverse']),

    /**
     * How the content should be aligned on its main axis
     */
    justify: t.oneOf(['flex-start', 'flex-end', 'center', 'space-around', 'space-between']),

    /**
     * How the content should be aligned on its cross-axis
     */
    align: t.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),

    /**
     * When there is space how should all the content be aligned on its cross-axis
     */
    content: t.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline'])
  }

  static defaultProps = flexDefault

  render() {
    /**
     * All the props that are required from the box component to behave like intented
     */
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child, {
      /**
       * What display manner the box component should act according to
       */
      display: this.props.display,

      /**
       * Allows the box to know it is in debug mode
       */
      debug: this.props.debug,

      /**
       * Whether the grid system is being used
       */
      useGrid: this.props.useGrid,

      /**
       * How many columns the box component should act on
       */
      columns: this.props.columns,

      /**
       * The breakpoints for media quiries
       */
      breakPoints: this.props.breakPoints
    }))

    return (
      <FlexContainer {...this.props}>
        {childrenWithInjectedProps}
      </FlexContainer>
    );
  }
}
