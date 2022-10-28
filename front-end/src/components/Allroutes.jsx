import {Routes,Route} from 'react-router-dom'
import { Log } from '../pages/Auth/Log'
import { Reg } from '../pages/Auth/Reg'
import { Question } from '../pages/Quesiton'
import { PrivateRoutes } from './PrivateRoutes'
import { useSelector } from 'react-redux'
import { Graph } from './Grapgh/Graph'
import { Admin } from '../pages/Admin/Admin'


export const Allroutes=()=>{
   
    return (
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Question />
            </PrivateRoutes>
          }
        />
        <Route path="/reg" element={<Reg />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    );
}