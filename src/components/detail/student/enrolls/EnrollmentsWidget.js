import { Box, Card, CardHeader, Divider, List, makeStyles } from '@material-ui/core'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuid } from 'uuid'
import EnrollmentItem from './enrollmentItem'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  cell: {
    padding: '4px',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  head: {
    background: '#f5f5f5',
  },
  box: {
    width: '100%',
  },
}))

export const EnrollmentsWidget = props => {
  const classes = useStyles()
  const { enrolls, changeIdx } = props


  const handleChange = indx => {
    changeIdx(indx)
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Ofertas Aplicadas" />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box} minWidth={500}>
          <List>
            {enrolls !== undefined &&
              enrolls.map((enroll, index) => (
                <EnrollmentItem key={uuid()} enroll={enroll} index={index} changeIdx={handleChange} />
              ))}
          </List>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
