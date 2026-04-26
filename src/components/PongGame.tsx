import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 20;
const BALL_SIZE = 10;
const PLAYER_PADDLE_SPEED = 7;
const AI_PADDLE_SPEED = 5;
const AI_DEAD_ZONE = 8;
const PADDLE_DEFLECTION = 4;
const BALL_SPEEDUP = 1.05;
const MAX_BALL_SPEED = 14;
const BALL_SERVE_VX = 4;
const BALL_SERVE_VY = 2;
const WINNING_SCORE = 11;

export type GameState = {
  playerY: number;
  aiY: number;
  ballX: number;
  ballY: number;
  ballVx: number;
  ballVy: number;
};

type Winner = 'player' | 'ai' | null;

const initialGameState: GameState = {
  playerY: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
  aiY: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
  ballX: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
  ballY: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
  ballVx: BALL_SERVE_VX,
  ballVy: BALL_SERVE_VY,
};

function resetBall(state: GameState) {
  state.ballX = CANVAS_WIDTH / 2 - BALL_SIZE / 2;
  state.ballY = CANVAS_HEIGHT / 2 - BALL_SIZE / 2;
  state.ballVx = Math.random() < 0.5 ? -BALL_SERVE_VX : BALL_SERVE_VX;
  state.ballVy = Math.random() < 0.5 ? -BALL_SERVE_VY : BALL_SERVE_VY;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
  },
  score: {
    fontVariantNumeric: 'tabular-nums',
  },
  canvasWrapper: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '240px',
  },
});

function drawScene(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2, 0);
  ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#fff';
  ctx.fillRect(PADDLE_MARGIN, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    CANVAS_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH,
    state.aiY,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
  );

  ctx.fillRect(state.ballX, state.ballY, BALL_SIZE, BALL_SIZE);
}

function PongGame() {
  const styles = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({ ...initialGameState });
  const heldKeysRef = useRef<Set<string>>(new Set());
  const playerScoreRef = useRef(0);
  const aiScoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [winner, setWinner] = useState<Winner>(null);

  const handleRestart = useCallback(() => {
    gameStateRef.current = { ...initialGameState };
    playerScoreRef.current = 0;
    aiScoreRef.current = 0;
    gameOverRef.current = false;
    setPlayerScore(0);
    setAiScore(0);
    setWinner(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let frameId = 0;

    const heldKeys = heldKeysRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        heldKeys.add(event.key);
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        heldKeys.delete(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const tick = () => {
      const state = gameStateRef.current;

      if (gameOverRef.current) {
        drawScene(ctx, state);
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (heldKeys.has('ArrowUp')) {
        state.playerY -= PLAYER_PADDLE_SPEED;
      }
      if (heldKeys.has('ArrowDown')) {
        state.playerY += PLAYER_PADDLE_SPEED;
      }
      if (state.playerY < 0) {
        state.playerY = 0;
      } else if (state.playerY > CANVAS_HEIGHT - PADDLE_HEIGHT) {
        state.playerY = CANVAS_HEIGHT - PADDLE_HEIGHT;
      }

      const aiCenter = state.aiY + PADDLE_HEIGHT / 2;
      const ballCenter = state.ballY + BALL_SIZE / 2;
      const delta = ballCenter - aiCenter;
      if (delta < -AI_DEAD_ZONE) {
        state.aiY -= Math.min(AI_PADDLE_SPEED, -delta);
      } else if (delta > AI_DEAD_ZONE) {
        state.aiY += Math.min(AI_PADDLE_SPEED, delta);
      }
      if (state.aiY < 0) {
        state.aiY = 0;
      } else if (state.aiY > CANVAS_HEIGHT - PADDLE_HEIGHT) {
        state.aiY = CANVAS_HEIGHT - PADDLE_HEIGHT;
      }

      state.ballX += state.ballVx;
      state.ballY += state.ballVy;

      if (state.ballY < 0) {
        state.ballY = 0;
        state.ballVy = -state.ballVy;
      } else if (state.ballY > CANVAS_HEIGHT - BALL_SIZE) {
        state.ballY = CANVAS_HEIGHT - BALL_SIZE;
        state.ballVy = -state.ballVy;
      }

      const playerPaddleRight = PADDLE_MARGIN + PADDLE_WIDTH;
      if (
        state.ballVx < 0 &&
        state.ballX < playerPaddleRight &&
        state.ballX + BALL_SIZE > PADDLE_MARGIN &&
        state.ballY + BALL_SIZE > state.playerY &&
        state.ballY < state.playerY + PADDLE_HEIGHT
      ) {
        state.ballX = playerPaddleRight;
        const nextVx = Math.min(-state.ballVx * BALL_SPEEDUP, MAX_BALL_SPEED);
        state.ballVx = nextVx;
        const offset =
          (state.ballY + BALL_SIZE / 2) - (state.playerY + PADDLE_HEIGHT / 2);
        const normalized = offset / (PADDLE_HEIGHT / 2);
        state.ballVy += normalized * PADDLE_DEFLECTION;
      }

      const aiPaddleLeft = CANVAS_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH;
      if (
        state.ballVx > 0 &&
        state.ballX + BALL_SIZE > aiPaddleLeft &&
        state.ballX < aiPaddleLeft + PADDLE_WIDTH &&
        state.ballY + BALL_SIZE > state.aiY &&
        state.ballY < state.aiY + PADDLE_HEIGHT
      ) {
        state.ballX = aiPaddleLeft - BALL_SIZE;
        const nextVx = Math.max(-state.ballVx * BALL_SPEEDUP, -MAX_BALL_SPEED);
        state.ballVx = nextVx;
        const offset =
          (state.ballY + BALL_SIZE / 2) - (state.aiY + PADDLE_HEIGHT / 2);
        const normalized = offset / (PADDLE_HEIGHT / 2);
        state.ballVy += normalized * PADDLE_DEFLECTION;
      }

      if (state.ballX + BALL_SIZE < 0) {
        aiScoreRef.current += 1;
        setAiScore(aiScoreRef.current);
        if (aiScoreRef.current >= WINNING_SCORE) {
          gameOverRef.current = true;
          setWinner('ai');
        }
        resetBall(state);
      } else if (state.ballX > CANVAS_WIDTH) {
        playerScoreRef.current += 1;
        setPlayerScore(playerScoreRef.current);
        if (playerScoreRef.current >= WINNING_SCORE) {
          gameOverRef.current = true;
          setWinner('player');
        }
        resetBall(state);
      }

      drawScene(ctx, state);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      heldKeys.clear();
    };
  }, []);

  return (
    <div className={styles.root}>
      <Text size={800} weight="semibold" className={styles.score}>
        {playerScore} | {aiScore}
      </Text>
      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ display: 'block' }}
        />
        {winner && (
          <div className={styles.overlay}>
            <MessageBar intent={winner === 'player' ? 'success' : 'error'}>
              <MessageBarBody>
                <MessageBarTitle>
                  {winner === 'player' ? 'You win!' : 'AI wins!'}
                </MessageBarTitle>
              </MessageBarBody>
            </MessageBar>
          </div>
        )}
      </div>
      {winner && (
        <Button appearance="primary" onClick={handleRestart}>
          Restart
        </Button>
      )}
    </div>
  );
}

export default PongGame;
