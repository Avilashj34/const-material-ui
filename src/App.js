import { CssBaseline } from '@mui/material';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import CustomizeSnackbar from './components/CustomizeSnackbar';
import { RequireAuth } from './components/RequireAuth';
import ForgotPassword from './pages/ForgotPassword';
import Otp from './pages/Otp';
import SideBar from './pages/SideBar';
import SignInAndSignUp from './pages/SignInAndSignUp';
import theme from './utils/Theme';
import AddItem from './pages/AddItem';
import SiteList from './pages/SiteList';
import MaterialList from './pages/MaterialList';
import ViewMaterialModal from './pages/ViewMaterialModal';
import UpdateStock from './pages/UpdateStock';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomizeSnackbar/>
      <Router>
        <Routes>
          <Route path='/' element={<SignInAndSignUp />} />
          <Route path='forgotPassword' element={<ForgotPassword />} />
          <Route path='otp' element={<Otp />} />
          <Route path='home' element={<SideBar/> } >
            <Route path='additem' element={<AddItem />}></Route>
            <Route path='siteList' element={<SiteList />}></Route>
            <Route path='materialList' element={<MaterialList />}></Route>
            <Route path='ViewMaterial' element={<ViewMaterialModal />}></Route>
            <Route path='UpdateMaterial' element={<UpdateStock />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;