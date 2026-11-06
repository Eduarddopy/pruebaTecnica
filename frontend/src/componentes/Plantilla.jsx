import { Link } from 'react-router-dom';
import '../App.css';

export default function Plantilla({ children }) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <Link to="/personas">
          Prueba Técnica - Eduardo
        </Link>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}