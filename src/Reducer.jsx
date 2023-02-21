const initialState = {
    station : [],
    loading: false,
    error: ""
}
export default (state = initialState, { type, payload }) => {
    switch (type) {
    case "START_FETCH":
        return { ...state, ...payload,station:[], loading:true, error:"" }
    case "FETCH_SUCCESS":
        return { ...state, ...payload,station:payload, loading:false }
    case "ERROR_FETCH":
        return { ...state, ...payload, loading:false, error:payload }
    default:
        return state
    }
}
