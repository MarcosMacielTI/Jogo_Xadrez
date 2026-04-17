export default function MoveHistory({ history }) {
  const rows = [];

  for (let index = 0; index < history.length; index += 2) {
    rows.push({
      number: Math.floor(index / 2) + 1,
      white: history[index] || '',
      black: history[index + 1] || '',
    });
  }

  return (
    <div className="history-panel">
      <h3>Histórico de jogadas</h3>
      <ul className="history-list">
        {rows.map((row) => (
          <li key={row.number} className="history-item">
            <span>{row.number}.</span>
            <span>{row.white}</span>
            <span>{row.black}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
