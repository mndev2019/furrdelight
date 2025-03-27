import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Createusertype from './Pages/Usertype/Createusertype'
import Banner from './Pages/Banner/Banner'
import Splash from './Pages/Splash/Splash'
import Brand from './Pages/Brand/Brand'
import { ToastContainer } from 'react-toastify'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Createusertype />} />
          <Route path='/banner' element={<Banner/>}/>
          <Route path='/splash' element={<Splash/>}/>
          <Route path='/brand' element={<Brand/>}/>
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
