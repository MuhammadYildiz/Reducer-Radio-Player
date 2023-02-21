import reducer from "./Reducer"
import { useReducer } from "react"
import './App.css'
const radioUrl = "https://api.sr.se/api/v2/channels?format=json&size=100"
const initialState = {
    station: [],
    loading: false,
    error: ""
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { station, loading, error } = state

    const getStation = () => {
        dispatch({ type: "START_FETCH" })
        fetch(radioUrl)
            .then((result) => result.json())
            .then((result) => {
                dispatch({ type: "FETCH_SUCCESS", payload: result.channels })
            })
            .catch(() => {
                dispatch({ type: "ERROR_FETCH", payload: "Error Fetching Data" })
            });
    }
    return (
        <div className="App">
            <button onClick={getStation} disabled={loading}>
                Get Radio Channels
            </button>
            {station.map((channels) => (
                <div key={channels.id} style={{backgroundColor: `#${channels.color}`}} className="content">
                    <div className="header">
                        <h1>{channels.name} </h1>
                        <img src={channels.image} alt="" />
                    </div>
                    <div className="player">
                        <h4>{channels.tagline} </h4>
                        <audio controls >
                            <source src={channels.liveaudio.url} />
                        </audio>
                    </div>
                </div>
            ))}
            {error && <p> {error}</p>}
        </div>
    )
}
export default App
