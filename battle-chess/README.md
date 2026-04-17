# Battle Chess

Jogo de xadrez moderno inspirado em Battle Chess, criado com React e Vite.

## Estrutura do projeto

- `src/components` - componentes de interface reutilizáveis
- `src/game` - lógica de xadrez usando `chess.js`
- `src/assets` - pasta para recursos visuais e sonoros

## Como rodar

1. Abra o terminal na pasta `battle-chess`
2. Execute:
   ```bash
   npm install
   npm run dev
   ```
3. Abra o endereço mostrado no terminal (por exemplo `http://localhost:5173`).

## Funcionalidades

- Jogo de xadrez com regras controladas por `chess.js`
- Tabuleiro renderizado com `react-chessboard`
- Animação de batalha usando `framer-motion`
- Destaque de movimentos possíveis
- Histórico de jogadas
- Reiniciar partida
- Som de captura gerado no navegador
