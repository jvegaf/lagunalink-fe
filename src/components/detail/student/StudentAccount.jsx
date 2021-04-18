import React from 'react'
import Card from '../../shared/Card'
import { makeStyles } from '@material-ui/core'
import { StudentForm } from '../../form/student/register'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const StudentAccount = props => {
  const classes = useStyles()

  return (
    <Card className={classes.root} title="Perfil">
      <StudentForm {...props} />
    </Card>
  )
}
