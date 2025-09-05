import React, { useState, useEffect } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('');
  const [modulos, setModulos] = useState([]);
  const [recursosNativos, setRecursosNativos] = useState([]);
  const [complexidade, setComplexidade] = useState('baixa');
  const [horasCalculadas, setHorasCalculadas] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(err => setBackendStatus('Backend offline ou erro: ' + err.message));
  }, []);

  const handleModuloChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setModulos([...modulos, value]);
    } else {
      setModulos(modulos.filter(m => m !== value));
    }
  };

  const handleRecursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRecursosNativos([...recursosNativos, value]);
    } else {
      setRecursosNativos(recursosNativos.filter(r => r !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modulos, recursosNativos, complexidade }),
      });
      const data = await response.json();
      setHorasCalculadas(data.horasCalculadas);
    } catch (error) {
      console.error('Erro ao simular:', error);
      setHorasCalculadas('Erro ao calcular.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simulador de Horas Zendesk</h1>
      <p>Status do Backend: {backendStatus}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <fieldset style={{ border: '1px solid #ccc', padding: '10px' }}>
          <legend>Módulos:</legend>
          {['Support', 'Guide', 'Talk', 'Chat', 'Explore'].map(modulo => (
            <label key={modulo} style={{ display: 'block' }}>
              <input
                type="checkbox"
                value={modulo}
                checked={modulos.includes(modulo)}
                onChange={handleModuloChange}
              />
              {modulo}
            </label>
          ))}
        </fieldset>

        <fieldset style={{ border: '1px solid #ccc', padding: '10px' }}>
          <legend>Recursos Nativos:</legend>
          {['Copilot', 'QA', 'WFM', 'AgentesIA'].map(recurso => (
            <label key={recurso} style={{ display: 'block' }}>
              <input
                type="checkbox"
                value={recurso}
                checked={recursosNativos.includes(recurso)}
                onChange={handleRecursoChange}
              />
              {recurso}
            </label>
          ))}
        </fieldset>

        <label>
          Complexidade:
          <select value={complexidade} onChange={(e) => setComplexidade(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </label>

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Simular Horas
        </button>
      </form>

      {horasCalculadas !== null && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '5px', backgroundColor: '#e7f3ff' }}>
          <h2>Resultado da Simulação:</h2>
          <p>Horas Calculadas: {horasCalculadas}</p>
        </div>
      )}
    </div>
  );
}

export default App;