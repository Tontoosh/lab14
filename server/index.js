const express = require("express");

const app = express();
const port = process.env.PORT || 3014;
const games = new Map();

app.use(express.json());

function createGame(name = "Lab11 Tic Tac Toe") {
  return {
    id: String(Date.now()),
    name,
    cells: Array(9).fill(""),
    currentPlayer: "X",
    winner: null,
    status: "in_progress",
    history: []
  };
}

function publicGame(game) {
  return {
    id: game.id,
    name: game.name,
    cells: game.cells,
    currentPlayer: game.currentPlayer,
    winner: game.winner,
    status: game.status,
    canUndo: game.history.length > 0
  };
}

function winnerFor(cells) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return null;
}

function findGame(req, res) {
  const game = games.get(req.params.id);
  if (!game) {
    res.status(404).json({ error: "Game not found" });
    return null;
  }
  return game;
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "lab11-tictactoe-api" });
});

app.get("/", (req, res) => {
  res.json({
    service: "Lab11 Tic Tac Toe API",
    status: "running",
    baseUrl: `http://localhost:${port}`,
    endpoints: [
      "GET /health",
      "POST /games",
      "GET /games/:id",
      "POST /games/:id/moves",
      "PUT /games/:id/reset",
      "DELETE /games/:id"
    ]
  });
});

app.post("/games", (req, res) => {
  const game = createGame(req.body.name);
  games.set(game.id, game);
  res.status(201).json(publicGame(game));
});

app.get("/games/:id", (req, res) => {
  const game = findGame(req, res);
  if (game) {
    res.json(publicGame(game));
  }
});

app.post("/games/:id/moves", (req, res) => {
  const game = findGame(req, res);
  if (!game) {
    return;
  }

  const { x, y } = req.body;
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || x > 2 || y < 0 || y > 2) {
    res.status(400).json({ error: "x and y must be integers from 0 to 2" });
    return;
  }

  if (game.status !== "in_progress") {
    res.status(409).json({ error: "Game is already finished" });
    return;
  }

  const index = y * 3 + x;
  if (game.cells[index]) {
    res.status(409).json({ error: "Cell is already occupied" });
    return;
  }

  game.history.push([...game.cells]);
  game.cells[index] = game.currentPlayer;
  game.winner = winnerFor(game.cells);

  if (game.winner) {
    game.status = "won";
  } else if (game.cells.every(Boolean)) {
    game.status = "draw";
  } else {
    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
  }

  res.json(publicGame(game));
});

app.put("/games/:id/reset", (req, res) => {
  const game = findGame(req, res);
  if (!game) {
    return;
  }

  game.cells = Array(9).fill("");
  game.currentPlayer = "X";
  game.winner = null;
  game.status = "in_progress";
  game.history = [];
  res.json(publicGame(game));
});

app.delete("/games/:id", (req, res) => {
  const deleted = games.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Lab11 Tic Tac Toe API running at http://localhost:${port}`);
});
