import { Chess } from 'chess.js';

const pieceNames = {
  p: 'Peão',
  n: 'Cavalo',
  b: 'Bispo',
  r: 'Torre',
  q: 'Rainha',
  k: 'Rei',
};

const pieceIcons = {
  p: '♟',
  n: '♞',
  b: '♝',
  r: '♜',
  q: '♛',
  k: '♚',
};

export function createChessGame() {
  return new Chess();
}

export function resetChessGame(game) {
  game.reset();
  return game;
}

export function moveChessPiece(game, source, target) {
  return game.move({ from: source, to: target, promotion: 'q' });
}

export function getLegalMoves(game, square) {
  if (!square) {
    return [];
  }
  return game.moves({ square, verbose: true }).map((move) => move.to);
}

export function getGameTurn(game) {
  return game.turn() === 'w' ? 'white' : 'black';
}

export function getGameStatus(game) {
  if (game.isCheckmate()) {
    return 'Checkmate';
  }
  if (game.isDraw()) {
    return 'Draw';
  }
  if (game.inCheck()) {
    return 'Check';
  }
  return 'Normal';
}

export function getHistoryMoves(game) {
  return game.history();
}

export function getLastMoveSquares(game) {
  const history = game.history({ verbose: true });
  if (!history.length) {
    return null;
  }
  const last = history[history.length - 1];
  return { from: last.from, to: last.to };
}

export function getPieceLabel(piece) {
  if (!piece) {
    return 'Desconhecido';
  }
  const key = typeof piece === 'string' ? piece.toLowerCase() : piece.type;
  return pieceNames[key] || 'Peça';
}

export function getPieceIcon(piece) {
  if (!piece) {
    return '✦';
  }
  const key = typeof piece === 'string' ? piece.toLowerCase() : piece.type;
  return pieceIcons[key] || '✦';
}
