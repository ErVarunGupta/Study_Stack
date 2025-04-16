import Student_Signup from './pages/student/Student-Signup.jsx'
import Student_Login from './pages/student/Student-Login.jsx'
import Faculty_Signup from './pages/faculty/Faculty-Signup.jsx';
import Faculty_Login from './pages/faculty/Faculty-Login.jsx';
import Root from './pages/Root.jsx';
import Home from './pages/stacks/Home.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';

import Read from './pages/stacks/Read.jsx';
import ReadSeen from './pages/stacks/ReadSeen.jsx';
import Write from './pages/stacks/Write.jsx';
import Write_Notebook from './pages/stacks/WriteNotebook.jsx';
import Write_Book from './pages/stacks/WriteBook.jsx';
import SearchResult from './pages/stacks/AllMaterials.jsx';
import EditForm from './pages/stacks/EditForm.jsx';

function App() {

  return (
    <>
      <div>
        {/* <h1>Shree Ganeshay Namah!</h1> */}
        <Routes>
          <Route path='/' element={<Root/>}></Route>
          <Route path='/faculty-signup' element={<Faculty_Signup/>}></Route>
          <Route path='/faculty-login' element={<Faculty_Login/>}></Route>
          <Route path='/student-signup' element={<Student_Signup/>}></Route>
          <Route path='/student-login' element={<Student_Login/>}></Route>

          <Route path='/home' element={<Home/>}></Route>

          <Route path='/write' element={<Write/>}></Route>
          <Route path='/write/book' element={<Write_Book/>}></Route>
          <Route path='/write/notebook' element={<Write_Notebook/>}></Route>

          <Route path='/read' element={<Read/>}></Route>
          <Route path='/read/seen' element={<ReadSeen/>}></Route>
          <Route path='/read/search' element={<SearchResult/>}></Route>
          <Route path='/action/edit/:id' element={<EditForm/>}></Route>
          
          {/* Redirect to home if no match */}
        </Routes>
      </div> 
    </>
  )
}

export default App
