import './App.css';
import Background from './components/Background';
import MainPage from './pages/MainPage';

function App() {
  return (
    <main className="h-screen overflow-hidden relative">
      <Background />
      <div className="glass h-full absolute inset-0">
        <MainPage />
      </div>
    </main>
  );
}

export default App;
