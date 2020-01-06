import {
  SET_RIDERS,
  SHOW_LOCATION,
} from './actions'

export default function reducer(state = { riders: [], bounds: { min_lat: 39.5, max_lat: 40.5, min_lng: -105.5, max_lng: -105.1}, showRiderId: null }, action) {
  switch (action.type) {
    case SET_RIDERS:
      return {...state, riders: action.riders, bounds: action.bounds}

    case SHOW_LOCATION:
      return {...state, showRiderId: action.riderId}
    default:
      return state
  }
}

// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })
// export default todoApp