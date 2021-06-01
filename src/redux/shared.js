import { apiProvider } from '../services/api/api-provider'

const initialState = {
  allJobOpenings: [],
  allCompanies: [],
  avatars: [],
  isBusy: false,
  taskError: false,
  jobsFetched: false,
  companiesFetched: false,
}

// const types

const FETCH_JOB_OPENINGS = 'FETCH_JOB_OPENINGS'
const UPDATE_JOB_OPENINGS = 'UPDATE_JOB_OPENINGS'
const UPDATE_JOB_OPENINGS_COMPLETE = 'UPDATE_JOB_OPENINGS_COMPLETE'
const FETCH_COMPANIES = 'FETCH_COMPANIES'
const FETCH_JOBS_COMPLETE = 'FETCH_JOBS_COMPLETE'
const FETCH_COMPANIES_AVATAR = 'FETCH_COMPANIES_AVATAR'
const FETCH_COMPANIES_AVATAR_COMPLETE = 'FETCH_COMPANIES_AVATAR_COMPLETE'
const FETCH_COMPANIES_COMPLETE = 'FETCH_COMPANIES_COMPLETE'
const COMPANIES_UPDATED = 'COMPANIES_UPDATED'
const FETCH_ERROR = 'FETCH_ERROR'

// reducers
const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case UPDATE_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case UPDATE_JOB_OPENINGS_COMPLETE:
      return {
        ...state,
        isBusy: false,
        allJobOpenings: action.payload,
      }

    case FETCH_COMPANIES:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case FETCH_JOBS_COMPLETE:
      return {
        ...state,
        allJobOpenings: action.payload,
        isBusy: false,
        jobsFetched: true,
      }

    case FETCH_COMPANIES_AVATAR:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case FETCH_COMPANIES_AVATAR_COMPLETE:
      return {
        ...state,
        isBusy: false,
        avatars: action.payload,
        companiesFetched: true
      }

    case FETCH_COMPANIES_COMPLETE:
      return {
        ...state,
        allCompanies: action.payload,
        isBusy: false
      }

    case COMPANIES_UPDATED:
      return {
        ...state,
        allCompanies: action.payload,
        isBusy: false,
      }

    case FETCH_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true,
      }

    default:
      return state
  }
}

export default sharedReducer

// actions

const fetchAllJobOpen = accessToken => dispatch => {
  dispatch({ type: FETCH_JOB_OPENINGS })
  apiProvider
    .getAll('job_openings', accessToken)
    .then(res => dispatch({ type: FETCH_JOBS_COMPLETE, payload: res.data.jobOpenings }))
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const fetchAllCompanies = accessToken => (dispatch, getState) => {
  dispatch({ type: FETCH_COMPANIES })
  apiProvider
    .getAll('companies', accessToken)
    .then(async res => {
      const companies = [...res.data.companies]
      dispatch(actions.fetchAllAvatars(res.data.companies, accessToken))
      dispatch({ type: FETCH_COMPANIES_COMPLETE, payload: companies })
    })
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const fetchAllAvatars = (companies, accessToken) => async dispatch => {
  dispatch({type: FETCH_COMPANIES_AVATAR})
  const avatarsFetched = []
  for (const company of companies) {
    const avatar = {}
    avatar.id = company.id
    avatar.url = await getCompanyAvatar(company.id, accessToken)
    avatarsFetched.push(avatar)
  }
  dispatch({type: FETCH_COMPANIES_AVATAR_COMPLETE, payload: avatarsFetched})
}

const getCompanyAvatar = async (companyId, accessToken) => {
  try {
    const response = await apiProvider.getSingle('avatar', companyId, accessToken)
    return response.data.avatarURL
  } catch (e) {
    console.error(e.message)
  }
}

const setJobsEnrollable = enrollments => (dispatch, getState) => {
  const { allJobOpenings } = getState().shared
  const jobs = allJobOpenings.map(job => {
    job.enrollable = !(enrollments.some(e => e.job_opening === job.id))
    return job
  })
  dispatch({type: UPDATE_JOB_OPENINGS_COMPLETE, payload: jobs})
}

export const actions = {
  fetchAllJobOpen,
  setJobsEnrollable,
  fetchAllCompanies,
  fetchAllAvatars,
  getCompanyAvatar,
}
