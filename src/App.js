import React from 'react';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import AddProject from './Pages/AddProject';
import AddTask from './Pages/AddTask';
import GanttView from './Pages/GanttView';
import Update from './Components/Update';
import EditTask from './Pages/EditTask';
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/AddProject" element={<AddProject/>}></Route>
      <Route path="/AddProject/AddTask/:pro" element={<AddTask/>}></Route>
      <Route path="/GanttView/:p_id" element={<GanttView/>}></Route>
      <Route path="/Update" element={<Update/>}></Route>
      <Route path="/EditTask" element={<EditTask/>}></Route>
      {/* <Route path="/Up/:pro" element={<Up/>}></Route> */}
    </Routes>
  );
}

export default App;