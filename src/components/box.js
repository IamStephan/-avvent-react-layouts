import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

/**
 * SMART PROPS
 * ==================================================
 * Flexbox:
 *  col-*
 *  push-*
 * 
 * Grids:
 *  area-*
 *  columns-*
 *  row-*
 * 
 * Utility:
 *  hidden-*
 *  show-*
 */

/**
 * Default styles for a gridbox parent
 */
const flexDefaults = {
  order: 1,
  flex: '1',
  flexAlign: 'auto',
  col: 1,
  push: 0
}

/**
 * Default styles for a gridbox parent
 */
const gridDefaults = {
  area: null,
  column: null,
  row: null
}

const BoxContainer = styled.div`
  box-sizing: border-box;

  ${/**
   * DEBUG MODE
   * ===========
   */ ''}
  ${props => {
    if(props.debug) {
      return `
        border: 1px dashed black;
      `
    }
  }}

  ${/**
   * ======================================================================================================
   *                                        FLEXBOX
   * ======================================================================================================
   */ ''}

   ${/**
    * Basic styles to help with layout (flex)
    * 
    * Note: Flex is ignored when the parent uses a flexbox grid system
    */ ''}
  ${props => {
    if(props.display === 'flex' || props.display === 'inline-flex') {
      return `
        order: ${props.order};
        ${props.useGrid ? '' : `flex: ${props.flex};`}
        align-self: ${props.flexAlign};
      `
    }
  }}

  ${/**
   * FLEX BOX GRIDS
   * ==================
   * If the parent component uses a grid based system then this helps with the layout.
   * 
   * MEDIA QUIRY
   * ============
   * Smart props can be used: col-* and push-*
   */ ''}
  ${props => {
    if(props.useGrid) {
      const media = Object.keys(props.breakPoints).map((breakPoint => {
        const column = props['col-' + breakPoint] ? `width: ${(props['col-' + breakPoint] / props.columns) *100}%;` : ''
        const push = props['push-' + breakPoint] ? `margin-left: ${(props['push-' + breakPoint] / props.columns) *100}%;` : ''

        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            ${column};
            ${push};
          }
         `
       })).reverse().reduce((previous, current) => previous + current)

      return `
        width: ${(props.col / props.columns) * 100}%;
        margin-left: ${(props.push / props.columns) * 100}%;
        ${media}
      `
    }
  }}

  ${/**
   * ======================================================================================================
   *                                        GRIDS
   * ======================================================================================================
   */ ''}

${/**
    * Basic styles to help with layout (grid)
    */ ''}
  ${props => {
    if(props.display === 'grid' || props.display === 'inline-grid') {
      return `
        ${props.area ? `grid-area: ${props.area};` : ''}
        ${props.column ? `grid-column: ${props.column[0]} / ${props.column[1]};` : ''}
        ${props.row ? `grid-row: ${props.row[0]} / ${props.row[1]};` : ''}
      `
    }
  }}

  ${/**
   * Smart props for breakpoints
   */ ''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['area-' + breakPoint]) {
        let area
        area = props['area-' + breakPoint]
        
        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-area: ${area};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}

  ${/**
   * Smart props for breakpoints
   */ ''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['column-' + breakPoint]) {
        let columns
        columns = props['column-' + breakPoint]
        
        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-column: ${columns};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}

  ${/**
   * Smart props for breakpoints
   */ ''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['row-' + breakPoint]) {
        let row
        row = props['row-' + breakPoint]
        
        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            grid-row: ${row};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}

  ${/**
   * ======================================================================================================
   *                                        UTILITIES
   * ======================================================================================================
   */ ''}

   ${/**
    * Smart props to hide the component on certain breakpoints
    */ ''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['hidden-' + breakPoint]) {
        let hidden
        hidden = props['hidden-' + breakPoint]
        
        return `
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            display: ${hidden ? 'none' : ''};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}

  ${/**
    * Smart props to show the component on certain breakpoints
    */ ''}
  ${props => {
    const media = Object.keys(props.breakPoints).map((breakPoint => {     
      if(props['show-' + breakPoint]) {
        let show
        show = props['show-' + breakPoint]
        
        return `
          display: none;
          @media (max-width: ${props.breakPoints[breakPoint]}px) {
            display: ${show ? 'block' : ''};
          }
        `
      }
      return ''
    })).reverse().reduce((previous, current) => previous + current)

    return `
      ${media}
    `
  }}
`

/**
 * Smart box component that behaves according to its parent container
 */
export default class Box extends Component {
  static propTypes = {
    /**
     * Used to determine its behaviour
     */
    display: t.oneOf(['flex', 'inline-flex', 'grid', 'inline-grid']),

    //Flexbox Specific
    /**
     * Most of the layout is handled by this component for flexbox
     */

    /**
     * The order the components appear in
     */
    order: t.number,

    /**
     * How the component should flex (syntax: grow sink basis)
     */
    flex: t.string,

    /**
     * How the box should be aligned if there is space available
     */
    flexAlign: t.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),

    /**
     * How many columns the component should occupy
     */
    col: t.number,

    /**
     * How far the component is pushed from the left in terms of column space
     */
    push: t.number,

    // Grid Specific

    /**
     * How many columns the component should occupy(syntax: ['', ''])
     * 
     * Note: Can contain span keyword in both, one or none
     *       If only one value is used them it should be a string
     */
    column: t.arrayOf(t.oneOfType([t.string, t.number])),

    /**
     * How many rows the component should occupy(syntax: ['', ''])
     * 
     * Note: Can contain span keyword in both, one or none
     *       If only one value is used them it should be a string
     */
    row: t.arrayOf(t.oneOfType([t.string, t.number])),

    /**
     * The area the component should be placed in on the grid
     */
    area: t.string,
  }

  static defaultProps = {
    /**
     * Default styles if the parent is a flexbox
     */
    ...flexDefaults,

    /**
     * Default styles if the parent is a gridbox
     */
    ...gridDefaults
  }

  render() {
    return (
      <BoxContainer {...this.props}>
        {this.props.children}
      </BoxContainer>
    );
  }
}
