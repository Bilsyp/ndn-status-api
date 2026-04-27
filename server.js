const express = require('express');
const { spawn } = require('child_process');
const cors = require("cors")
const app = express();
app.use(cors());
const PORT = 5555;

/* =========================
   ROUTES (nfdc route)
========================= */
app.get('/routes', (req, res) => {
  const proc = spawn('nfdc', ['route']);

  let output = '';
  let errorOutput = '';

  proc.stdout.on('data', (data) => {
    output += data.toString();
  });

  proc.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({
        error: 'Command failed',
        detail: errorOutput
      });
    }

    const lines = output
      .trim()
      .split('\n')
      .filter(line => line.includes('prefix='));

    const routes = lines.map(line => {
      const obj = {};
      line.split(' ').forEach(pair => {
        const [key, value] = pair.split('=');
        obj[key] = value;
      });
      return obj;
    });

    res.json(routes);
  });
});


/* =========================
   CS INFO (nfdc cs)
========================= */
app.get('/cs', (req, res) => {
  const proc = spawn('nfdc', ['cs']);

  let output = '';
  let errorOutput = '';

  proc.stdout.on('data', (data) => {
    output += data.toString();
  });

  proc.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({
        error: 'Command failed',
        detail: errorOutput
      });
    }

    const lines = output.trim().split('\n');

    const result = {};

    lines.forEach(line => {
      line = line.trim();

      // skip header
      if (line.startsWith('CS information')) return;

      // ambil key=value
      if (line.includes('=')) {
        const [key, value] = line.split('=');

        // bersihin spasi
        result[key.trim()] = isNaN(value)
          ? value.trim()
          : Number(value);
      }
    });

    res.json(result);
  });
});


app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
