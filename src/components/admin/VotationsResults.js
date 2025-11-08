function VotationsResults({ votacionHoy }) {
  const renderResultados = (titulo, lista, color) => {
    const total = lista.reduce((acc, item) => acc + item.votos, 0);

    return (
      <div className="mb-4">
        <h5>{titulo}</h5>
        {lista.map((item) => {
          const porcentaje = total > 0 ? Math.round((item.votos / total) * 100) : 0;
          return (
            <div key={item.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{item.nombre}</span>
                <span>{item.votos} votos ({porcentaje}%)</span>
              </div>
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className={`progress-bar ${color}`}
                  role="progressbar"
                  style={{ width: `${porcentaje}%` }}
                  aria-valuenow={porcentaje}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h4>Resultados de hoy ({votacionHoy.fecha})</h4>
      {renderResultados("Entradas", votacionHoy.entradas, "bg-success")}
      {renderResultados("Fondos", votacionHoy.fondos, "bg-info")}
    </div>
  );
}

export default VotationsResults;