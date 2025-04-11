import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Createusertype from './Pages/Usertype/Createusertype'
import Banner from './Pages/Banner/Banner'
import Splash from './Pages/Splash/Splash'
import Brand from './Pages/Brand/Brand'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Auth/Login'
import Petessential from './Pages/Petessential/Petessential'
import PetType from './Pages/PetType/PetType'
import PetBreed from './Pages/PetBreed/PetBreed'
import Profile from './Pages/Profile'
import Product from './Pages/Product/Product'
import PetCategory from './Pages/PetCategory/PetCategory'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Createusertype />} />
          <Route path='/banner' element={<Banner />} />
          <Route path='/splash' element={<Splash />} />
          <Route path='/brand' element={<Brand />} />
          <Route path='/pet-essential' element={<Petessential />} />
          <Route path='/pet-type' element={<PetType />} />
          <Route path='/pet-category' element={<PetCategory/>}/>
          <Route path='/pet-breed' element={<PetBreed />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/add-product' element={<Product/>}/>

        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={ThemeRoutes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
