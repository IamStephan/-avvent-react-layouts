import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import utils from './utils';

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

const GridContainer = styled.div`
  display: ${props => props.display};

  ${props => {
    if(props.columns) {
      if(typeof props.columns === 'string') {
        return `grid-template-columns: ${props.columns};`
      } else {
        return `grid-template-columns: ${props.columns.reduce((prev, current) => prev + ' ' + current)};`
      }
    }
  }}
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

  ${props => {
    if(props.debug) {
      return `background: rgba(0,0,0,0.20);`
    }
  }}
`

export default class Grid extends Component {
  static propTypes = {
    debug: t.bool,
    breakPoints: t.object,
    display: t.oneOf(['grid', 'inline-grid']),
    columns: t.oneOfType([t.string, t.array]),
    'auto-columns': t.string,
    rows: t.oneOfType([t.string, t.array]),
    'auto-rows': t.string,
    areas: t.arrayOf(t.string),
    gap: t.number,
    justify: t.oneOf(['start', 'end', 'center', 'stretch']),
    align: t.oneOf(['start', 'end', 'center', 'stretch']),
    flow: t.oneOf(['row', 'column', 'row dense', 'column dense'])
  }

  static defaultProps = gridDefault

  render() {
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child, {
      display: this.props.display,
      debug: this.props.debug,
      breakPoints: this.props.breakPoints
    }))

    return (
      <GridContainer {...this.props}>
        {childrenWithInjectedProps}
      </GridContainer>
    );
  }
}
