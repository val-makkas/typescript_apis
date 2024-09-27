import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))){
    res.json({
      "height": height,
      "weight": weight,
      "bmi": calculateBmi(Number(weight),Number(height))
    });
  } else {
    res.json({
      "error": 'Malformatted params.'
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const exercises: number[] = daily_exercises as number[];

  try {
    const result = calculateExercises(exercises, Number(target));
    console.log(result);
    res.json(result);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    res.status(400).json({
      error: "something went wrong"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
