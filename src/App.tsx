import './App.css';
import Background from './components/Background';
import MainPage from './pages/MainPage';

function App() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Background />
      <div className="glass absolute inset-0 h-full">
        <MainPage />
      </div>
    </main>
  );
}

export default App;
