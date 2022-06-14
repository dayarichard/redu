import './App.css';
import { Routes,Route} from  'react-router-dom'

import ViewRecord from './viewrecord/ViewRecord';
import CreateForm from './createform/CreateForm';
import Mygrid from './mygrid/Mygrid';
import Create from './create/Create';
import Form from './RegistrationForm/Register';
import LoginForm from './LoginForm/LoginForm';
import  { LoggedInRoute, PrivateRoutes } from './ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './store/auth';
import DynamicForm from './DynamicForms/DynamicForm';
import Profile from './Profile/Profile';
import ViewProfile from './Profile/ViewProfile';

function App(props) {
  
  return (
    
      <Routes>
        <Route element={<LoggedInRoute />}><Route exact path='register' element ={<Form />} /></Route>
        <Route element={<LoggedInRoute />}><Route exact path = 'login' element = {<LoginForm />} /></Route>
        <Route element={<PrivateRoutes />}><Route exact path='home' element= {<Mygrid/>}/></Route>
        <Route element={<PrivateRoutes />}><Route path={'create'} element={<Create />} /></Route>
        <Route element={<PrivateRoutes />}><Route path ={`edit`} element = {<Create />} /></Route>
        <Route element={<PrivateRoutes />}><Route path='view/:id' element={<ViewRecord />} /></Route>
        <Route element={<PrivateRoutes />}><Route path='*' element={<h1>Not found</h1>} /></Route>
        <Route path='dynamicforms' element={<DynamicForm />}/>
        <Route element={<PrivateRoutes />}><Route path='createprofile' element={<Profile />} /></Route>
        <Route element={<PrivateRoutes />}><Route path='viewprofile' element={<ViewProfile />} /></Route>
        <Route path='create' element={<Create />}/>
        </Routes>
    
  );
}

export default App;
