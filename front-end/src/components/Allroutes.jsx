import {Routes,Route} from 'react-router-dom'
import { Log } from '../pages/Auth/Log'
import { Reg } from '../pages/Auth/Reg'
import { Question } from '../pages/Quesiton'
import { PrivateRoutes } from './PrivateRoutes'
import { Graph } from './Grapgh/Graph'
import { Admin } from '../pages/Admin/Admin'
import { Welcome } from '../pages/welcome/Welcome'
import { Mystats } from '../pages/Mystats/Mystats'
import { Hallofame } from '../pages/Wholeofame/Hallofame'
import { ForgotPassword } from '../pages/Auth/ForgotPassword'
import { ResetPassword } from '../pages/Auth/ResetPassword'

export const Allroutes=()=>{
   
    return (
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Welcome />
            </PrivateRoutes>
          }
        />
        <Route path="/quiz" element={<Question />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/mystats" element={<Mystats />} />
        <Route path="/hallofame" element={<Hallofame/>} />
      </Routes>
    );
}