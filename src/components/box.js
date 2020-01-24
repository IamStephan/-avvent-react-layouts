import React, { Component } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

const flexDefaults = {
  order: 1,
  flex: '1',
  flexAlign: 'auto',
  col: 1,
  push: 0
}

const gridDefaults = {
  area: null,
  column: null,
  row: null
}

const BoxContainer = styled.div`
  box-sizing: border-box;

  ${props => {
    if(props.debug) {
      return `
        border: 1px dashed black;
      `
    }
  }}

  ${props => {
    if(props.display === 'flex' || props.display === 'inline-flex') {
      return `
        order: ${props.order};
        ${props.useGrid ? '' : `flex: ${props.flex};`}
        align-self: ${props.flexAlign};
      `
    }
  }}

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

  ${props => {
    if(props.display === 'grid' || props.display === 'inline-grid') {
      return `
        ${props.area ? `grid-area: ${props.area};` : ''}
        ${props.column ? `grid-column: ${props.column[0]} / ${props.column[1]};` : ''}
        ${props.row ? `grid-row: ${props.row[0]} / ${props.row[1]};` : ''}
      `
    }
  }}

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

export default class Box extends Component {
  static propTypes = {
    display: t.oneOf(['flex', 'inline-flex', 'grid', 'inline-grid']),

    //Flexbox Specific
    order: t.number,
    flex: t.string,
    flexAlign: t.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    col: t.number,
    push: t.number,

    // Grid Specific
    column: t.arrayOf(t.oneOfType([t.string, t.number])),
    row: t.arrayOf(t.oneOfType([t.string, t.number])),
    area: t.string,
  }

  static defaultProps = {
    ...flexDefaults,
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
