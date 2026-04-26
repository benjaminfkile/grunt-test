import React, { useEffect, useRef } from 'react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 20;
const BALL_SIZE = 10;

export type GameState = {
  playerY: number;
  aiY: number;
  ballX: number;
  ballY: number;
  ballVx: number;
  ballVy: number;
  playerScore: number;
  aiScore: number;
};

const initialGameState: GameState = {
  playerY: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
  aiY: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
  ballX: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
  ballY: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
  ballVx: 4,
  ballVy: 2,
  playerScore: 0,
  aiScore: 0,
};

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({ ...initialGameState });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let frameId = 0;

    const tick = () => {
      const state = gameStateRef.current;
      state.ballX += state.ballVx;
      state.ballY += state.ballVy;
      drawScene(ctx, state);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ display: 'block' }}
    />
  );
}

export default PongGame;
