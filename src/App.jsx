import { createContext, useContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Translate from './components/Translate'
import LangContext from './components/constants/Secrets'
import TransLangContext from './components/constants/Secrets2'
import LoginForm from './components/Login'
import SignIn from './components/SignUp'
import About from './components/About'


const Navigation = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Translate",
        element: <Translate />
      },{
        path:"/Login",
        element:<LoginForm/>
      },{
        path:"/SignUp",
        element:<SignIn/>
      },{
        path:"/About",
        element:<About/>
      }
    ]
  }
])

function App() {

  const [Lang, setLang] = useState("")

  const UpdateLang = (txt) => {
    setLang(txt)
  }

  const [TransLang, setTransLang] = useState("")

  const UpdateTransLang = (txt) => {
    setTransLang(txt)
  }

  return (
    <>

      <LangContext.Provider value={{ Lang: Lang, setLang: setLang, UpdateLang: UpdateLang }}>
        <TransLangContext.Provider value={{ TransLang: TransLang, setTransLang: setTransLang, UpdateTransLang: UpdateTransLang }} >

          <RouterProvider router={Navigation} />
        </TransLangContext.Provider>
      </LangContext.Provider>


    </>
  )
}

export default App
