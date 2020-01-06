/*
 * action types
 */
export const SET_RIDERS = 'SET_RIDERS'
export const SET_BOUNDS = 'SET_BOUNDS'
export const SHOW_LOCATION = 'SHOW_LOCATION'

/*
 * action creators
 */
export function setRiders(riders, bounds) {
  return { type: SET_RIDERS, riders, bounds }
}


export function showLocation(riderId) {
  return { type: SHOW_LOCATION, riderId }
}
