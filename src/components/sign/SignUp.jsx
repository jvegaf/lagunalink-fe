/* eslint-disable no-unused-vars */
import { Button, CircularProgress, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../form/__shared__/EmailInput'
import { PasswordInput } from '../form/__shared__/PasswordInput'
import { RoleSelectInput } from '../form/__shared__/RoleSelectInput'
import { Title } from '../shared/Title'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/user'
import { green } from '@material-ui/core/colors'
import { Redirect } from 'react-router'
import { AlertDialog } from '../dialog/AlertDialog'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2em',
    width: '100%'
  },
  button: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginTop: '2em',
    marginBottom: '2em'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}
))

export const SignUp = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    open: false,
    body: '',
    redirect: ''
  })
  const methods = useForm()
  const classes = useStyles()

  const isBusy = useSelector(state => state.user.isBusy)
  const isSignedUp = useSelector(state => state.user.isSignedUp)
  const prevRegisteredError = useSelector(state => state.user.prevRegisteredError)

  const onSubmit = data => {
    dispatch(actions.signUp(data))
  }

  useEffect(() => {
    if(isSignedUp === true){
      setModal({
        open: true,
        body: 'Email de confirmacion enviado. Mira en tu buzon',
        redirect: '/signin',
      })
    }
  }, [isSignedUp])

  useEffect(() => {
    if(prevRegisteredError === true){
      setModal({
        open: true,
        body: 'El Email ya estaba registrado anteriormente. Ingresa en tu cuenta',
        redirect: '/signin',
      })
    }
  }, [prevRegisteredError])

  return (
    <Paper elevation={3} className={classes.root}>
      <AlertDialog {...modal} />
      <Title content="Registro"/>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="col">
            <div className="row justify-content-center">
              <RoleSelectInput />
            </div>
            <div className="row justify-content-center">
              <EmailInput/> 
            </div>
            <div className="row justify-content-center">
              <PasswordInput/>
            </div>
            <div className="row justify-content-center">
              <div className={classes.wrapper}>
                <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}>Crear Cuenta</Button>
                {isBusy && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className={'justify-content-end mt-4'}>
        <Typography align={'right'}>
        ¿Ya tienes una cuenta? <Link href={'/signin'}>Ingresa</Link>
        </Typography>
      </div>
    </Paper>
  )
}
