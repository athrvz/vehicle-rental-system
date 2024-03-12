import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
