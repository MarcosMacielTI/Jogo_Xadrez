export default function GameInfo({
  turn,
  status,
  onReset,
  onFlipBoard,
  whiteCaptureCount,
  blackCaptureCount,
  orientation,
}) {
  return (
    <div className="game-info-card">
      <div>
        <p className="eyebrow">Status da partida</p>
        <h2>{status === 'Normal' ? 'Partida em andamento' : status}</h2>
      </div>
      <div className="status-pill">
        <span />
        {turn === 'white' ? 'Brancas em movimento' : 'Pretas em movimento'}
      </div>
      <div className="capture-summary">
        <div>
          <strong>Brancas capturaram</strong>
          <p>{whiteCaptureCount} peça(s)</p>
        </div>
        <div>
          <strong>Pretas capturaram</strong>
          <p>{blackCaptureCount} peça(s)</p>
        </div>
      </div>
      <div className="button-row">
        <button type="button" onClick={onFlipBoard}>
          Virar tabuleiro ({orientation === 'white' ? 'Mostrando brancas' : 'Mostrando pretas'})
        </button>
        <button type="button" onClick={onReset}>
          Reiniciar jogo
        </button>
      </div>
    </div>
  );
}
