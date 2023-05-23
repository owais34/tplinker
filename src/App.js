import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes ,Route} from 'react-router-dom';

function App() {
  return (
<Routes>
  <Route path='/' element={<h1>home</h1>}/>
  <Route path='/books' element={<h2>Books</h2>} />
</Routes>
  );
}

export default App;
