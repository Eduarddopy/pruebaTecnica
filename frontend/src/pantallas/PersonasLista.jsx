import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPersonas, deletePersona } from '../api';

export default function PersonasLista() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      setLoading(true);
      const { data } = await getPersonas();
      setPersonas(data);
    } catch (e) {
      alert('Error al listar personas. ¿El backend está corriendo?');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const onEliminar = async (id, nombre) => {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return;
    try {
      await deletePersona(id);
      cargar();
    } catch (e) {
      alert('Error al eliminar');
      console.error(e);
    }
  };

  if (loading) return <p className="loading-text">Cargando personas...</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Personas</h2>
        <Link to="/personas/nueva">
          <button className="btn-primary">Nueva persona</button>
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>CURP</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre} {p.apellidoPaterno} {p.apellidoMaterno}</td>
              <td>{p.curp}</td>
              <td>{p.correoElectronico}</td>
              <td>{p.telefono}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" onClick={() => navigate(`/personas/${p.id}/editar`)}>Editar</button>
                  <button className="btn-secondary" onClick={() => navigate(`/personas/${p.id}/domicilios`)}>Domicilios</button>
                  <button className="btn-danger" onClick={() => onEliminar(p.id, p.nombre)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
          {personas.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-message">
                No hay personas registradas. <Link to="/personas/nueva">Crear la primera</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}