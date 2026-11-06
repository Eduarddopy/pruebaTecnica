import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDomicilio, getDomicilioById, updateDomicilio } from '../api';

const empty = {
  calle: '',
  numeroExterior: '',
  numeroInterior: '',
  colonia: '',
  codigoPostal: '',
  municipio: '',
  estado: ''
};

export default function DomicilioFormulario() {
  const { idPersona, id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (esEdicion) {
      getDomicilioById(id)
        .then(({ data }) => setForm({ ...empty, ...data }))
        .catch(() => setError('No se pudo cargar el domicilio'));
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
      const payload = { ...form, idPersona: Number(idPersona) };
      if (esEdicion) await updateDomicilio(id, payload);
      else await createDomicilio(payload);

      navigate(`/personas/${idPersona}/domicilios`);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message
        || err.response?.data?.error
        || 'Error al guardar el domicilio.';
      setError(msg);
    }
  };

  return (
    <div>
      <h2 className="page-title">{esEdicion ? 'Editar domicilio' : 'Nuevo domicilio'}</h2>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={onSubmit} className="form-container">
        <div className="form-group">
          <label>Calle</label>
          <input name="calle" value={form.calle} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Número Exterior</label>
          <input name="numeroExterior" value={form.numeroExterior} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Número Interior (Opcional)</label>
          <input name="numeroInterior" value={form.numeroInterior} onChange={onChange} />
        </div>

        <div className="form-group">
          <label>Colonia</label>
          <input name="colonia" value={form.colonia} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Código Postal</label>
          <input name="codigoPostal" value={form.codigoPostal} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Municipio</label>
          <input name="municipio" value={form.municipio} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <input name="estado" value={form.estado} onChange={onChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(`/personas/${idPersona}/domicilios`)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}