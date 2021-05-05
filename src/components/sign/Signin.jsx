import { Box, Button, CircularProgress, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions } from '../../redux/user'
import { EmailInput } from '../form/__shared__/EmailInput'
import { PasswordInput } from '../form/__shared__/PasswordInput'
import { Title } from '../shared/Title'
import { Logo } from '../logo/Logo'

const useStyles = makeStyles(theme => ({
    root: {
      padding: '2em',
      width: '100%'
    },
    button: {
      paddingLeft: '4em',
      paddingRight: '4em',
    },
    wrapper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      position: 'relative',
      display: 'flex',
      alignContent: 'center'
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
    flexCnt: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(3)
    },
    logo: {
      height: '80px',
      width: '80px',
    }
  }
))

export const SignInComponent = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const needStudentRegister = useSelector(state => state.user.needStudentRegister)
  const needCompanyRegister = useSelector(state => state.user.needCompanyRegister)
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  const isBusy = useSelector(state => state.user.isBusy)
  const inactiveError = useSelector(state => state.user.inactiveError)
  const signinError = useSelector(state => state.user.signinError)
  const dispatch = useDispatch()
  const classes = useStyles()
  const methods = useForm()

  const onSubmit = data => {
    dispatch(actions.signIn(data))
  }

  useEffect(() => {
    if(needStudentRegister === true){
      history.push('/register/student')
    }
  }, [needStudentRegister])

  useEffect(() => {
    if(needCompanyRegister === true){
      history.push('/register/company')
    }
  }, [needCompanyRegister])

  useEffect(() => {
    if(isSignedIn === true){
      history.push('/app/dashboard')
    }
  }, [isSignedIn])

  useEffect(() => {
    if(inactiveError === true){
      enqueueSnackbar('Verificacion de Correo necesaria. Mira en tu buzon de correo', {variant: 'warning'})
    }
  }, [inactiveError])

  useEffect(() => {
    if(signinError === true){
      enqueueSnackbar('Correo/Contrasena incorrectos', {variant: 'error'})
    }
  }, [signinError])

  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.flexCnt}>
        <Logo className={classes.logo}/>
      </Box>
      <Title content="Iniciar Sesion"/>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Grid item >
              <EmailInput/>
            </Grid>
            <Grid item >
              <PasswordInput/>
            </Grid>
            <Grid item className={classes.flexCnt}>
              <div className={classes.wrapper}>
                <Button color="primary" className={classes.button} disabled={isBusy}
                variant="contained" type="submit">Entrar</Button>
                 {isBusy && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Box>
        <Typography align={'right'} gutterBottom>
          ¿No tienes una cuenta? <Link href={'/signup'}>Registrate</Link>
        </Typography>
      </Box>
    </Paper>
  )
}
