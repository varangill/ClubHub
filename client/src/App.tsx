import './App.css'
import { Home } from 'lucide-react';
import { User2 } from 'lucide-react';
import { ClipboardCheck } from 'lucide-react';
import { ClipboardList } from 'lucide-react';

function App() {

  return (
    <>
      <div>
      <nav>
          <a className="left" href="/"><Home />Home</a>
          <a className="left" href="/view/MyClubs"><ClipboardCheck />My Clubs</a>
          <a className="left" href="/view/AllClubs"><ClipboardList />All Clubs</a>
          <a className="right" href="/view/profile"><User2 />Profile</a>
      </nav>
    </div>
    </>
  )
}

export default App
