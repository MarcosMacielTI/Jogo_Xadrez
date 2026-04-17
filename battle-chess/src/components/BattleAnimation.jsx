import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { getPieceIcon, getPieceLabel } from '../game/chessEngine';

export default function BattleAnimation({ capture, onComplete }) {
  useEffect(() => {
    if (!capture) {
      return;
    }

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(280, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.045, audioCtx.currentTime);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.22);

    const timer = window.setTimeout(() => {
      onComplete();
      audioCtx.close();
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      oscillator.disconnect();
      gain.disconnect();
      audioCtx.close();
    };
  }, [capture, onComplete]);

  return (
    <AnimatePresence>
      {capture ? (
        <motion.div
          className="battle-card"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="battle-animation">
            <div className="battle-panel">
              <div className="piece-icon">{getPieceIcon(capture.piece, capture.color)}</div>
              <strong>{getPieceLabel(capture.piece, capture.color)}</strong>
              <p>Atacante</p>
            </div>
            <div className="battle-panel">
              <div className="piece-icon">{getPieceIcon(capture.captured, capture.color)}</div>
              <strong>{getPieceLabel(capture.captured, capture.color)}</strong>
              <p>Defensor capturado</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
