import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import utils from './utils';

/**
 * SMART PROPS
 * ==================================================
 * colums-*
 * rows-*
 * areas-*
 */

/**
 * Default styles if some are not provided
 */
export const gridDefault = {
  debug: false,
  breakPoints: {
    ...utils.breakPoints
  },
  display: 'grid',
  columns: null,
  'auto-columns': null,
  rows: null,
  'auto-rows': null,
  areas: null,
  gap: null,
  justify: 'stretch',
  align: 'stretch',
  flow: 'row'
}

/**
 * The grid container styles
 */
const GridContainer = styled.div`
  display: ${props => props.display};

  ${/**
   * COLUMNS
   * ========
   * Default style for columns if there is no breakpoint definition
   */''}
  ${props => {
    if(props.columns) {
      if(typeof props.columns === 'string') {
        return `grid-template-columns: ${props.columns};`
      } else {
        return `grid-template-columns: ${props.columns.reduce((prev, current) => prev + ' ' + current)};`
      }
    }
  }}

  ${/**
   * MEDIA QUERY
   * =============
   * Columns can use the columns-* prop to have a different number of columns depending on the breakpoint
   */''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['columns-' + breakPoint]) {
        let columns

        if(typeof props['columns-' + breakPoint] === 'string') {
          columns = props['columns-' + breakPoint]
        }
        else {
          columns = props['columns-' + breakPoint].reduce((prev, current) => prev + ' ' + current)
        }

        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-template-columns: ${columns};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}
  
  ${props => props['auto-columns'] ? `grid-auto-columns: ${props['auto-columns']};` : ''} 

  ${/**
   * ROWS
   * ======
   * Default style for rows if there is no breakpoint definition
   */''}
  ${props => {
    if(props.rows) {
      if(typeof props.rows === 'string') {
        return `grid-template-rows: ${props.rows};`
      }
      else {
        return `grid-template-rows: ${props.rows.reduce((prev, current) => prev + ' ' + current)};`
      }
    }
  }}

  ${/**
   * MEDIA QUERY
   * ============
   * Rows can use the rows-* prop to have a different number of columns depending on the breakpoint
   */''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['rows-' + breakPoint]) {
        let rows

        if(typeof props['rows-' + breakPoint] === 'string') {
          rows = props['rows-' + breakPoint]
        }
        else {
          rows = props['rows-' + breakPoint].reduce((prev, current) => prev + ' ' + current)
        }

        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-template-rows: ${rows};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)
    
    return `
      ${media}
    `
  }}

  ${props => props['auto-rows'] ? `grid-auto-rows: ${props['auto-rows']};` : ''}

  ${/**
   * AREAS
   * ======
   * Default template areas if there are no breakpoint definitions.
   * Does not load anything into css if no areas are defined
   */''}
  ${props => {
    if(props.areas) {
      const areas = props.areas.reduce((prev, current, i) => {
        if(i === 1) {
          return `"${prev}" "${current}"`
        }
        return `${prev} "${current}"`
      })

      return `
        grid-template-areas: ${areas};
      `
    }
  }}

  ${/**
   * MEDIA QUERY
   * =============
   * Ares can use the areas-* prop to have a different definition of areas depending on the breakpoint
   */''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['areas-' + breakPoint]) {
        const areas = props['areas-' + breakPoint].reduce((prev, current, i) => {
          if(i === 1) {
            return `"${prev}" "${current}"`
          }
          return `${prev} "${current}"`
        })

        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-template-areas: ${areas};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)
    
    return `
      ${media}
    `
  }}

  ${props => props.gap ? `grid-gap: ${props.gap}px;` : ''}

  ${props => props.justify ? `justify-items: ${props.justify};` : ''}
  ${props => props.align ? `align-items: ${props.align};` : ''}

  ${props => props.flow ? `grid-auto-flow: ${props.flow};` : ''}

  ${/**
   * DEBUG MODE
   * ===========
   */''}
  ${props => {
    if(props.debug) {
      return `background: rgba(0,0,0,0.20);`
    }
  }}
`

export default class Grid extends Component {
  static propTypes = {
    /**
     * Used to show borders and background for debuging
     */
    debug: t.bool,

    /**
     * Defines the breakpoints for media quiries
     */
    breakPoints: t.object,

    /**
     * Whether the container should be an inline grid or just grid
     */
    display: t.oneOf(['grid', 'inline-grid']),

    /**
     * The grid template columns (How many columns should be in the matrix)
     * 
     * Note: Can use columns-* prop
     */
    columns: t.oneOfType([t.string, t.array]),

    /**
     * Auto column width if the grid flow is in row mode, (Just a convinience prop)
     */
    'auto-columns': t.string,

    /**
     * The grid template rows (How many rows should be in the matrix)
     * 
     * Note: Can use rows-* prop
     */
    rows: t.oneOfType([t.string, t.array]),

    /**
     * Auto row height, (Just a convinience prop)
     */
    'auto-rows': t.string,

    /**
     * All the areas that are defined inside the grid
     * 
     * Note: Can use areas-* prop.
     *       Each column area has to be one string and row a new array item
     */
    areas: t.arrayOf(t.string),

    /**
     * The gap between the box components inside the grid
     */
    gap: t.number,

    /**
     * How the content inside a grid cell should be aligned on its main axis
     */
    justify: t.oneOf(['start', 'end', 'center', 'stretch']),

    /**
     * How the content inside a grid cell should be aligned on its cross axis
     */
    align: t.oneOf(['start', 'end', 'center', 'stretch']),

    /**
     * The direction the grid flows in
     */
    flow: t.oneOf(['row', 'column', 'row dense', 'column dense'])
  }

  static defaultProps = gridDefault

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
       * The breakpoints for media quiries
       */
      breakPoints: this.props.breakPoints
    }))

    return (
      <GridContainer {...this.props}>
        {childrenWithInjectedProps}
      </GridContainer>
    );
  }
}
