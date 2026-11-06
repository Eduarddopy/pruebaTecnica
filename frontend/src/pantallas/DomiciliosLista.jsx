import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDomiciliosByPersona, deleteDomicilio, getPersonaById } from '../api';

export default function DomiciliosLista() {
  const { idPersona } = useParams();
  const [domicilios, setDomicilios] = useState([]);
  const [persona, setPersona] = useState(null);
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const resPersona = await getPersonaById(idPersona);
      setPersona(resPersona.data);
    } catch (e) {
      console.error("Error al cargar persona:", e);
    }

    try {
      const resDomicilios = await getDomiciliosByPersona(idPersona);
      setDomicilios(Array.isArray(resDomicilios.data) ? resDomicilios.data : []);
    } catch (e) {
      console.error("Error al cargar domicilios:", e);
      setDomicilios([]);
    }
  };

  useEffect(() => { cargar(); }, [idPersona]);

  const onEliminar = async (id) => {
    if (!confirm('¿Eliminar este domicilio?')) return;
    try {
      await deleteDomicilio(id);
      cargar();
    } catch (e) {
      alert('Error al eliminar domicilio');
    }
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '10px' }}>
        <h2 className="page-title">
          Domicilios de: {persona ? `${persona.nombre}` : `#${idPersona}`}
        </h2>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Link to={`/personas/${idPersona}/domicilios/nuevo`}>
          <button className="btn-primary">Nuevo domicilio</button>
        </Link>
        <button
          className="btn-secondary"
          style={{ marginLeft: 'auto' }}
          onClick={() => navigate('/personas')}
        >
          Volver a personas
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Calle</th>
            <th>No. Ext</th>
            <th>No. Int</th>
            <th>Colonia</th>
            <th>CP</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {domicilios.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.calle}</td>
              <td>{d.numeroExterior}</td>
              <td>{d.numeroInterior || '-'}</td>
              <td>{d.colonia}</td>
              <td>{d.codigoPostal}</td>
              <td>{d.municipio}</td>
              <td>{d.estado}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" onClick={() => navigate(`/personas/${idPersona}/domicilios/${d.id}/editar`)}>Editar</button>
                  <button className="btn-danger" onClick={() => onEliminar(d.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
          {domicilios.length === 0 && (
            <tr>
              <td colSpan="9" className="empty-message">
                No hay domicilios registrados para esta persona.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}