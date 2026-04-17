import { getPieceIcon, getPieceLabel } from '../game/chessEngine';

export default function CapturedPieces({ whiteCaptured, blackCaptured }) {
  const renderCaptured = (items) => {
    if (!items.length) {
      return <span className="capture-empty">Nenhuma captura ainda</span>;
    }

    return items.map((captured, index) => (
      <div key={`${captured.piece}-${index}`} className="capture-entry">
        <span className="capture-piece">{getPieceIcon(captured.piece)}</span>
        <span>{getPieceLabel(captured.piece)}</span>
      </div>
    ));
  };

  return (
    <div className="capture-panel">
      <div className="capture-block">
        <p className="capture-title">Peças capturadas pelas Brancas</p>
        <div className="capture-list">{renderCaptured(whiteCaptured)}</div>
      </div>
      <div className="capture-block">
        <p className="capture-title">Peças capturadas pelas Pretas</p>
        <div className="capture-list">{renderCaptured(blackCaptured)}</div>
      </div>
    </div>
  );
}
