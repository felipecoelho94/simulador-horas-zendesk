export const simulate = (req, res) => {
  const { modulos, recursosNativos, complexidade } = req.body;

  let horasTotais = 0;

  // Regras de cálculo simples (exemplo)
  const baseHorasPorModulo = {
    Support: 10,
    Guide: 8,
    Talk: 12,
    Chat: 7,
    Explore: 15,
  };

  const baseHorasPorRecurso = {
    Copilot: 5,
    QA: 6,
    WFM: 9,
    AgentesIA: 10,
  };

  const multiplicadorComplexidade = {
    baixa: 1,
    media: 1.5,
    alta: 2,
  };

  if (modulos) {
    modulos.forEach(modulo => {
      horasTotais += baseHorasPorModulo[modulo] || 0;
    });
  }

  if (recursosNativos) {
    recursosNativos.forEach(recurso => {
      horasTotais += baseHorasPorRecurso[recurso] || 0;
    });
  }

  horasTotais *= multiplicadorComplexidade[complexidade] || 1;

  res.status(200).json({ horasCalculadas: horasTotais });
};