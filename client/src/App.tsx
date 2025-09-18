import { Routes, Route } from 'react-router-dom';
import ListPost from './components/ListPost'; 

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/list-post" element={<ListPost />} /> 
        
      </Routes>
    </div>
  );
}