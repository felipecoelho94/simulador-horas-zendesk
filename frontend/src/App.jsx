import React, { useState, useEffect } from 'react';
import './App.css';

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
    <div className="app-container">
      <header className="header">
        <h1>Simulador de Horas Zendesk</h1>
      </header>
      <main className="main-content">
        <div className="form-container">
          <h1>Simulador de Horas Zendesk</h1>
          <p className={`status-message ${backendStatus.includes('online') ? 'online' : 'offline'}`}>
            Status do Backend: {backendStatus}
          </p>

          <form onSubmit={handleSubmit} className="form">
            <fieldset className="fieldset">
              <legend>Módulos:</legend>
          {['Support', 'Guide', 'Talk', 'Chat', 'Explore'].map(modulo => (
            <label key={modulo} className="checkbox-label">
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

        <fieldset className="fieldset">
          <legend>Recursos Nativos:</legend>
          {['Copilot', 'QA', 'WFM', 'AgentesIA'].map(recurso => (
            <label key={recurso} className="checkbox-label">
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

        <label className="form-group">
          Complexidade:
          <select value={complexidade} onChange={(e) => setComplexidade(e.target.value)} className="select-input">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </label>

        <button type="submit" className="submit-button">
          Simular Horas
        </button>
      </form>

      {horasCalculadas !== null && (
        <div className="result-container">
          <h2>Resultado da Simulação:</h2>
          <p>Horas Calculadas: {horasCalculadas}</p>
        </div>
      )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Simulador de Horas Zendesk. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;