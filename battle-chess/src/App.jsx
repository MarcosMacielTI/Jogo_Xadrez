import { useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import {
  createChessGame,
  getGameStatus,
  getGameTurn,
  getHistoryMoves,
  getLegalMoves,
  moveChessPiece,
  resetChessGame,
  getLastMoveSquares,
} from './game/chessEngine';
import BattleAnimation from './components/BattleAnimation';
import CapturedPieces from './components/CapturedPieces';
import GameInfo from './components/GameInfo';
import MoveHistory from './components/MoveHistory';
import './index.css';

export default function App() {
  const gameRef = useRef(createChessGame());
  const [boardFen, setBoardFen] = useState(gameRef.current.fen());
  const [turn, setTurn] = useState(getGameTurn(gameRef.current));
  const [status, setStatus] = useState(getGameStatus(gameRef.current));
  const [history, setHistory] = useState(getHistoryMoves(gameRef.current));
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalSquares, setLegalSquares] = useState([]);
  const [lastMoveSquares, setLastMoveSquares] = useState(getLastMoveSquares(gameRef.current));
  const [captureInfo, setCaptureInfo] = useState(null);
  const [capturedByWhite, setCapturedByWhite] = useState([]);
  const [capturedByBlack, setCapturedByBlack] = useState([]);
  const [boardWidth, setBoardWidth] = useState(640);
  const [orientation, setOrientation] = useState('white');

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(760, Math.max(320, window.innerWidth * 0.82));
      setBoardWidth(width);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const squareStyles = useMemo(() => {
    const styles = {};

    if (lastMoveSquares) {
      styles[lastMoveSquares.from] = {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      };
      styles[lastMoveSquares.to] = {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      };
    }

    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: 'rgba(92, 211, 255, 0.7)',
      };
    }

    legalSquares.forEach((square) => {
      styles[square] = {
        backgroundColor: 'rgba(255, 180, 80, 0.75)',
      };
    });

    return styles;
  }, [selectedSquare, legalSquares, lastMoveSquares]);

  const updateBoardState = () => {
    setBoardFen(gameRef.current.fen());
    setTurn(getGameTurn(gameRef.current));
    setStatus(getGameStatus(gameRef.current));
    setHistory(getHistoryMoves(gameRef.current));
    setLastMoveSquares(getLastMoveSquares(gameRef.current));
  };

  const handleReset = () => {
    resetChessGame(gameRef.current);
    setSelectedSquare(null);
    setLegalSquares([]);
    setCaptureInfo(null);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    updateBoardState();
  };

  const attemptMove = (sourceSquare, targetSquare) => {
    const move = moveChessPiece(gameRef.current, sourceSquare, targetSquare);
    if (!move) {
      return false;
    }

    setCaptureInfo(move.captured ? move : null);

    if (move.captured) {
      if (move.color === 'w') {
        setCapturedByWhite((prev) => [...prev, { piece: move.captured, color: 'black' }]);
      } else {
        setCapturedByBlack((prev) => [...prev, { piece: move.captured, color: 'white' }]);
      }
    }

    setSelectedSquare(null);
    setLegalSquares([]);
    updateBoardState();
    return true;
  };

  const handleSquareClick = (square) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalSquares([]);
      return;
    }

    if (selectedSquare && legalSquares.includes(square)) {
      if (attemptMove(selectedSquare, square)) {
        return;
      }
    }

    const legal = getLegalMoves(gameRef.current, square);
    if (legal.length) {
      setSelectedSquare(square);
      setLegalSquares(legal);
      return;
    }

    setSelectedSquare(null);
    setLegalSquares([]);
  };

  const onDrop = (sourceSquare, targetSquare) => attemptMove(sourceSquare, targetSquare);

  const closeBattleAnimation = () => setCaptureInfo(null);

  const flipBoard = () => setOrientation((prev) => (prev === 'white' ? 'black' : 'white'));

  return (
    <div className="app-shell">
      <div className="glass-panel">
        <header className="hero-header">
          <div>
            <p className="eyebrow">Chess Xadrez</p>
            <h1>Jogo completo de xadrez</h1>
            <p className="subtitle">
              Controle total do tabuleiro, animações de batalha, histórico de jogadas e capturas épicas.
            </p>
          </div>
          <GameInfo
            turn={turn}
            status={status}
            onReset={handleReset}
            onFlipBoard={flipBoard}
            whiteCaptureCount={capturedByWhite.length}
            blackCaptureCount={capturedByBlack.length}
            orientation={orientation}
          />
        </header>

        <main className="game-grid">
          <section className="board-area">
            <div className="board-card">
              <Chessboard
                id="battle-chessboard"
                position={boardFen}
                boardWidth={boardWidth}
                onPieceDrop={onDrop}
                onSquareClick={handleSquareClick}
                customSquareStyles={squareStyles}
                dropSquareStyle={{
                  boxShadow: 'inset 0 0 0 3px rgba(255, 172, 66, 0.9)',
                }}
                arePremovesAllowed={false}
                boardOrientation={orientation}
              />
            </div>
            <CapturedPieces whiteCaptured={capturedByWhite} blackCaptured={capturedByBlack} />
            <MoveHistory history={history} />
          </section>
          <BattleAnimation capture={captureInfo} onComplete={closeBattleAnimation} />
        </main>
      </div>
    </div>
  );
}
