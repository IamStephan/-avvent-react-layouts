import React, { Component } from 'react'

import { Flex, Box, Grid } from '@avvent/react-layouts'

export default class App extends Component {
  render () {
    return (
      <Grid
        breakPoints={{
          small: 500,
          big: 1000
        }}
        style={{
          minHeight: '100vh',
        }}
        debug
        columns={'repeat(3, 1fr)'}

        rows={['1fr']}

        gap={10}
        areas={[
          'poop poop poop'
        ]}

        areas-small={[
          'poop poop',
          'face facejn'
        ]}
      >
        <Box row={[1,3]} column={[1, 'span 2']} show-small>
          1
        </Box>
        <Box>
          yguink
        </Box>
        <Box>
          yguink
        </Box>
        <Box>
          yguink
        </Box>
        <Box style={{minHeight: '100%',}}>
          <Flex flow='column' debug>
            <Box hidden-phone>adasdasd</Box>
            <Box>adasdasd</Box>
            <Box>adasdasd</Box>
          </Flex>
        </Box>
      </Grid>
    )
  }
}
