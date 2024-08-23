import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'

import './assets/main.scss'
import { TaskList } from './pages/TaskList';
import { TaskDetails } from './pages/TaskDetails';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/tasks" />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/tasks/:id' element={<TaskDetails />} />
        </Routes>
      </Router>
      <Toaster
            position="top-center"
            reverseOrder={false}
          />
    </>
  )
}

export default App
