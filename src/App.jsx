import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home.jsx"
import { Login } from "./components/Login.jsx"
import { Create } from "./components/Create.jsx"
import { Explorer } from "./components/Explorer.jsx"
import { Cocktail } from "./components/Cocktail.jsx"
import { Edit } from "./components/Edit.jsx"


function App() {

  return (
    <>
    //Rutas para poder acceder a cada componente 
      <BrowserRouter >
      <Routes>
        <Route path="/" element= {<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element= {<Create />} />
        <Route path="/explorer" element={ <Explorer />} />
        <Route path="/cocktail/:id" element={<Cocktail />} />
        <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
