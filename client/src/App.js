
import {BrowserRouter as Router} from 'react-router-dom'
//import './App.css';
import { useDispatch } from "react-redux"
import Navbar from  './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import {useEffect} from "react"
import { fetchallQuestions } from './actions/question';
import { fetchAllUsers } from "./actions/users"

function App() {

  const dispatch = useDispatch()
//   to fetch all questions we don't have any trigger point so we use useEffect
//  whenever our application is alive,then useEffect is going to trigger
  useEffect(()=>{
   dispatch(fetchallQuestions())
   dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <>
      <Navbar />
      <br/> <br/> <br/>
      <AllRoutes />
      </>
      </Router>
      
    </div>
  );
}
export default App;

