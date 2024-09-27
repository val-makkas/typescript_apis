interface Result {
  numdays: number,
  numtrain: number,
  target: number,
  avgtime: number,
  success: boolean,
  metric: number,
  explain: string
}

export const calculateExercises = (days: number[], target: number): Result => {
  let numtrain: number = 0;
  let sum: number = 0;
  days.forEach(day => {
    if (day !== 0) numtrain++;
    sum += day;
  });  
  const avg: number = sum / days.length;
  let metric: number;
  let explain: string; 
  if (avg >= target){
    metric = 3;
    explain = "Great!";
  }
  else if (avg + 1 >= target){
    metric = 2;
    explain = "not too bad";
  }
  else {
    metric = 1;
    explain = "try harder next time";
  }
  return {
    numdays: days.length,
    numtrain: numtrain,
    target: target,
    avgtime: avg,
    success: avg >= target,
    metric: metric,
    explain: explain
  };
};

interface Parse {
  target: number,
  array: number[]
}

const parseArgs = (args: string[]): Parse => {
  if (args.length < 4) throw new Error('Too few arguments');
  const arrayinfo: number[] = [];
  for (let index = 3; index < args.length; index++) {
    arrayinfo.push(Number(args[index]));
  }
  return {
    target: Number(args[2]),
    array: arrayinfo,
  };
};

try {
  if (require.main === module) {
    const result = parseArgs(process.argv);
    console.log(calculateExercises(result.array, result.target));
  }
}
catch (error: unknown) {
  let message = "Error.";
  if (error instanceof Error){
    message += error.message;    
  }
  console.log(message);
}


