import './App.css';
import Background from './components/Background';

function App() {
  return (
    <main className="h-dvh overflow-hidden relative">
      <Background />
      <div className="glass h-full absolute inset-0"></div>
    </main>
  );
}

export default App;
