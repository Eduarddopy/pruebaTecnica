import { Routes, Route, Navigate } from 'react-router-dom';
import Plantilla from './componentes/Plantilla.jsx';
import PersonasLista from './pantallas/PersonasLista.jsx';
import PersonaFormulario from './pantallas/PersonaFormulario.jsx';
import DomiciliosLista from './pantallas/DomiciliosLista.jsx';
import DomicilioFormulario from './pantallas/DomicilioFormulario.jsx';

export default function App() {
  return (
    <Plantilla>
      <Routes>
        <Route path="/" element={<Navigate to="/personas" />} />

        <Route path="/personas" element={<PersonasLista />} />
        <Route path="/personas/nueva" element={<PersonaFormulario />} />
        <Route path="/personas/:id/editar" element={<PersonaFormulario />} />

        <Route path="/personas/:idPersona/domicilios" element={<DomiciliosLista />} />
        <Route path="/personas/:idPersona/domicilios/nuevo" element={<DomicilioFormulario />} />
        <Route path="/personas/:idPersona/domicilios/:id/editar" element={<DomicilioFormulario />} />

        <Route path="*" element={<p>Ruta no encontrada</p>} />
      </Routes>
    </Plantilla>
  );
}