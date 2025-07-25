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
import ShopCategory from './Pages/PetCategory/ShopCategory'
import Unit from './Pages/Unit'
import AddEvents from './Pages/Events/AddEvents'
import Productlist from './Pages/Product/Productlist'
import Productdetail from './Pages/Product/Productdetail'
import PetFoodType from './Pages/PetFood/PetFoodType'
import PetFood from './Pages/PetFood/PetFood'
import PetActivity from './Pages/PetActivity'
import Module from './Pages/RolesPermission/Module'
import DefaultPermission from './Pages/RolesPermission/DefaultPermission'
import AddPermission from './Pages/RolesPermission/AddPermission'
import UserManagement from './Pages/Usertype/UserManagement'
import ProductVariant from './Pages/ProductVariant'
import ProductVariantlist from './Pages/ProductVariant/List'
import Question from './Pages/Questions'
import AddSlot from './Pages/Slot/AddSlot'
import Upcomingrecords from './Pages/Upcomingrecords'
import Faq from './Pages/Faq/Faq'
import Policy from './Pages/Policy/Policy'
import PrescriptionCategory from './Pages/PrescriptionCategory'
import TransactionReport from './Pages/transactions/TransactionReport'
import BankDetails from './Pages/transactions/BankDetails'
import BankTransaction from './Pages/transactions/BankTransaction'
import Appointments from './Pages/bookings/Appointments'
import ViewPrescriptions from './Pages/bookings/ViewPrescriptions'
import PrintSingleCategoryPrescription from './Pages/bookings/PrintSingleCategoryPrescription'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Createusertype />} />
          <Route path='/user-management' element={<UserManagement />} />
          <Route path='/module' element={<Module />} />
          <Route path='/default-permission' element={<DefaultPermission />} />
          <Route path='/add-defaultpermission/:id?' element={<AddPermission />} />
          <Route path='/banner' element={<Banner />} />
          <Route path='/splash' element={<Splash />} />
          <Route path='/brand' element={<Brand />} />
          <Route path='/pet-essential' element={<Petessential />} />
          <Route path='/pet-type' element={<PetType />} />
          <Route path='/pet-category' element={<PetCategory />} />
          <Route path='/shop-category' element={<ShopCategory />} />
          <Route path='/pet-breed' element={<PetBreed />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/unit' element={<Unit />} />
          <Route path='/add-product' element={<Product />} />
          <Route path='/addproduct-variant/:id' element={<ProductVariant />} />
          <Route path='/product_variantlist' element={<ProductVariantlist />} />
          <Route path='/product-list' element={<Productlist />} />
          <Route path='/product-detail/:id' element={<Productdetail />} />
          <Route path='/add-event' element={<AddEvents />} />
          <Route path='/petfood-type' element={<PetFoodType />} />
          <Route path='/petfood' element={<PetFood />} />
          <Route path='/pet_activity' element={<PetActivity />} />
          <Route path='/question' element={<Question />} />
          <Route path='/addslot' element={<AddSlot />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/upcoming-records' element={<Upcomingrecords />} />
          <Route path='/prescription-category' element={<PrescriptionCategory />} />
          <Route path='/bookings' element={<Appointments />} />
          <Route path='/prescription/show/:id' element={<ViewPrescriptions />} />
          <Route path='/reports' element={<TransactionReport />} />
          <Route path='/bank' element={<BankDetails />} />
          <Route path='/bank-transaction' element={<BankTransaction />} />
        </Route>
        <Route path='/prescription/print/:id/:print_only?' element={<PrintSingleCategoryPrescription />} />
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
