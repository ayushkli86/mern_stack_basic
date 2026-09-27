import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from './Product/CreateProduct'
import ReadAllProduct from './Product/ReadAllProduct'
import UpdateProduct from './Product/UpdateProduct'
import ReadSpecificProduct from './Product/ReadSpecificProduct'
import ReadAllUser from './User/ReadAllUser'
import CreateUser from './User/CreateUser'
import ReadSpecificUser from './User/ReadSpecificUser'
import UpdateUser from './User/UpdateUser'
import ReadAllSchool from './School/ReadAllSchool'
import CreateSchool from './School/CreateSchool'
import ReadSpecificSchool from './School/ReadSpecificSchool'
import UpdateSchool from './School/UpdateSchool'

const CosmosRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/product" element={ <ReadAllProduct></ReadAllProduct>}></Route>
            <Route path="/product/create" element={ <CreateProduct></CreateProduct>}></Route>
            <Route path="/product/:id" element={ <ReadSpecificProduct></ReadSpecificProduct>}></Route>
            <Route path="/product/update/:id" element={ <UpdateProduct></UpdateProduct>}></Route>


            <Route path="/user" element={ <ReadAllUser />}></Route>
            <Route path="/user/create" element={ <CreateUser />}></Route>
            <Route path="/user/:id" element={ <ReadSpecificUser />}></Route>
            <Route path="/user/update/:id" element={ <UpdateUser />}></Route>


            <Route path="/school" element={ <ReadAllSchool />}></Route>
            <Route path="/school/create" element={ <CreateSchool />}></Route>
            <Route path="/school/:id" element={ <ReadSpecificSchool />}></Route>
            <Route path="/school/update/:id" element={ <UpdateSchool />}></Route>
        </Routes>
             
    </div>
  )
}

export default CosmosRoute;
