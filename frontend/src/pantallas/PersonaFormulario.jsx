import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPersona, getPersonaById, updatePersona } from '../api';

const empty = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  curp: '',
  rfc: '',
  fechaNacimiento: '',
  correoElectronico: '',
  telefono: ''
};

export default function PersonaFormulario() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (esEdicion) {
      getPersonaById(id)
        .then(({ data }) => setForm({ ...empty, ...data }))
        .catch(() => setError('No se pudo cargar la persona'));
    }
  }, [id, esEdicion]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (esEdicion) await updatePersona(id, form);
      else await createPersona(form);
      navigate('/personas');
    } catch (err) {
      console.error(err);
      let msg = 'Error al guardar.';

      if (err.response?.status === 409) {
        msg = err.response?.data?.message || 'La CURP o RFC ya se encuentran registrados';
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.response?.data?.error) {
        msg = err.response.data.error;
      }

      setError(msg);
    }
  };

  return (
    <div>
      <h2 className="page-title">{esEdicion ? 'Editar persona' : 'Nueva persona'}</h2>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={onSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Apellido Paterno</label>
          <input name="apellidoPaterno" value={form.apellidoPaterno} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Apellido Materno</label>
          <input name="apellidoMaterno" value={form.apellidoMaterno} onChange={onChange} />
        </div>

        <div className="form-group">
          <label>CURP</label>
          <input name="curp" value={form.curp} onChange={onChange} maxLength="18" required />
        </div>

        <div className="form-group">
          <label>RFC</label>
          <input name="rfc" value={form.rfc} onChange={onChange} maxLength="13" required />
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento || ''} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" name="correoElectronico" value={form.correoElectronico} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={onChange} maxLength="10" pattern="[0-9]{10}" title="Ingresa 10 dígitos numéricos" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/personas')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}