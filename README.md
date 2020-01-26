# **Avvent studio** presents: <!-- omit in toc -->
## @avvent/react-layouts <!-- omit in toc -->

> A react component library that eases layout creation using css grids and flexbox coupled with a smart box component.

[![NPM](https://img.shields.io/npm/v/@avvent/react-layouts.svg)](https://www.npmjs.com/package/@avvent/react-layouts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents <!-- omit in toc -->
- [Install](#install)
- [Breakpoints (Responsive design)](#breakpoints-responsive-design)
  - [Smart Props](#smart-props)
- [Flex Component](#flex-component)
  - [Props](#props)
- [Grid Component](#grid-component)
  - [Props](#props-1)
- [Box Component](#box-component)
  - [Props](#props-2)
- [Roadmap](#roadmap)
- [License](#license)

## Install
**npm**
```bas
npm install --save @avvent/react-layouts styled-components@^5.0.0
```

**yarn**
```bas
yarn add @avvent/react-layouts styled-components@^5.0.0
```

## Breakpoints (Responsive design)
Breakpoints are used by the layout components to determine how the layout should look or behave depending on the device screen size.

> They are also used by layout components in conjunction with smart props to behave as indented.

**Default breakpoints**

| Name    | Value  |
| :------ | :----: |
| phone   | `425`  |
| tablet  | `768`  |
| laptop  | `1024` |
| desktop | `1440` |

Default breakpoints can be custom (More can be added, removed or changed).

> **NOTE:** All breakpoints apply max-width media query.

### Smart Props

Smart props are used by both the Layout components and the box component. They align with the breakpoints defined on the components and follow a `prop-breakpoint` syntax.

Each component will have smart props and will be indicated in their documentation.

> **NOTE:** Props will be ignored if not supplied.

## Flex Component
```js
import { Flex } from '@avvent/react-layouts';
```

The flex component can be used for basic flex layout like flex but can also be used in a grid like pattern

### Props

| Prop        |      Default value      |                                  Value Type                                   | Smart prop | Description                                                                                                                             |
| :---------- | :---------------------: | :---------------------------------------------------------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Debug       |         `false`         |                                    `bool`                                     |     -      | When set to `true` the parent component will have a grey background color with an opacity of 0.25 and the box component a dashed border |
| useGrid     |         `false`         |                                    `bool`                                     |     -      | Allows the component to use a grid type layout                                                                                          |
| columns     |          `12`           |                                   `number`                                    |     -      | How many columns should be used when `useGrid` is active                                                                                |
| breakPoints | `{default breakpoints}` |                                   `object`                                    |     -      | Breakpoints for responsive design                                                                                                       |
| display     |        `'flex'`         |                           `'inline-flex' OR 'flex'`                           |     -      | should the component be inline or not                                                                                                   |
| flow        |         `'row'`         |           `'row' OR 'row-reverse' OR 'column' OR 'column-reverse'`            |     -      | Direction the parent should lay its children                                                                                            |
| wrap        |       `'nowrap'`        |                    `'wrap' OR 'nowrap' OR 'wrap-reverse'`                     |     -      | should the children wrap if they overlap                                                                                                |
| justify     |     `'flex-start'`      | `'flex-start' OR 'flex-end' OR 'center' OR 'space-around' OR 'space-between'` |     -      | How the children should align on its main axis                                                                                          |
| align       |     `'flex-start'`      |      `'flex-start' OR 'flex-end' OR 'center' OR 'stretch' OR 'baseline'`      |     -      | How the children should align on its cross axis                                                                                         |
| content     |     `'flex-start'`      |      `'flex-start' OR 'flex-end' OR 'center' OR 'stretch' OR 'baseline'`      |     -      | When there is space how should all the content be aligned on its cross-axis                                                             |
| children    |            -            |                                     `Box`                                     |     -      | All the children of this component has to be a box component                                                                            |

## Grid Component
```js
import { Grid } from '@avvent/react-layouts';
```

This component uses CSS Grids for its layouts

### Props
| Prop         |      Default value      |                      Value Type                      | Smart prop | Description                                                                                                                             |
| :----------- | :---------------------: | :--------------------------------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------- |
| debug        |         `false`         |                        `bool`                        |     -      | When set to `true` the parent component will have a grey background color with an opacity of 0.25 and the box component a dashed border |
| breakPoints  | `{default breakpoints}` |                       `object`                       |     -      | Breakpoints for responsive design                                                                                                       |
| display      |        `'grid'`         |              `'grid' OR 'inline-grid'`               |     -      | Whether the container should be an inline grid or just grid                                                                             |
| columns      |         `null`          |                  `string OR array`                   | columns-*  | The grid template columns (How many columns should be in the matrix)                                                                    |
| auto-columns |         `null`          |                       `string`                       |     -      | Auto column width if the grid flow is in row mode, (Just a convenience prop)                                                            |
| rows         |         `null`          |                  `string OR array`                   |   rows-*   | The grid template rows (How many rows should be in the matrix)                                                                          |
| auto-rows    |         `null`          |                       `string`                       |     -      | Auto row height, (Just a convinience prop)                                                                                              |
| areas        |         `null`          |                      `[string]`                      |  areas-*   | All the areas that are defined inside the grid. Each column area has to be one string and row a new array item                          |
| gap          |         `null`          |                       `number`                       |     -      | The gap between the box components inside the grid                                                                                      |
| justify      |       `'stretch'`       |     `'start' OR 'end' OR 'center' OR 'stretch'`      |     -      | How the content inside a grid cell should be aligned on its main axis                                                                   |
| align        |       `'stretch'`       |     `'start' OR 'end' OR 'center' OR 'stretch'`      |     -      | How the content inside a grid cell should be aligned on its cross axis                                                                  |
| flow         |         `'row'`         | `'row' OR 'column' OR 'row dense' OR 'column dense'` |     -      | The direction the grid flows in                                                                                                         |
| children     |                         |                        `Box`                         |     -      | All the children of this component has to be a box component                                                                            |

## Box Component

The box component is used to place all the items inside the layouts to place it in the appropriate position.

### Props
**Flex specific**

| Prop      | Default value |                                  Value Type                                   | Smart prop | Description                                                                                                          |
| :-------- | :-----------: | :---------------------------------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------- |
| order     |    `null`     |                                   `number`                                    |     -      | The order the component should appear in                                                                             |
| flex      |   `'1 1 1'`   |                                   `string`                                    |     -      | How the component should flex (syntax: grow sink basis). This props is ignored when the parent has `useGrid` enabled |
| flexAlign |   `'auto'`    | `'auto' OR 'flex-start' OR 'flex-end' OR 'center' OR 'baseline' OR 'stretch'` |     -      | How the box should be aligned if there is space available                                                            |
| col       |      `1`      |                                   `number`                                    |   col-*    | How many columns the component should occupy                                                                         |
| push      |      `0`      |                                   `number`                                    |   push-*   | How far the component is pushed from the left in terms of column space                                               |

**Grid specific**

| Prop   | Default value |      Value Type      | Smart prop | Description                                                                                                          |
| :----- | :-----------: | :------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------- |
| column |    `null`     | `[string] OR string` |  column-*  | How many columns the component should occupy(syntax: ['', '']). If only one value is used them it should be a string |
| row    |    `null`     | `[string] OR string` |   row-*    | How many rows the component should occupy(syntax: ['', '']). If only one value is used them it should be a string    |
| area   |    `null`     |       `string`       |   area-*   | The area the component should be placed in on the grid                                                               |

**Utilities**

| Prop     | Default value | Value Type | Smart prop | Description                                       |
| :------- | :-----------: | :--------: | :--------: | :------------------------------------------------ |
| hidden-* |    `null`     |   `bool`   |  hidden-*  | Hides the component when it is in that breakpoint |
| show-*   |    `null`     |   `bool`   |   show-*   | Shows the component when it is in that breakpoint |

## Roadmap

- [ ] Add universal smart prop (style-*)
- [ ] Add Examples (Storybook?)
- [ ] More in- depth code
- [ ] Add a float layout parent component
- [ ] Setup a showcase website
- [ ] Add more functionality to debug prop
- [ ] Performance optimizations ?
- [ ] Add unit Tests
- [ ] Add gutter prop to Flex component
- [ ] Turn hidden-* to hidden-from-* & hidden-to-*
- [ ] Add helper functions


## License
MIT © [Avvent Studio](https://studio.avvent.io)
