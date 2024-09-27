interface Bmi {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): Bmi => {
  if (args.length !== 4) throw new Error('Invalid arguments.');
 
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    };
  } else {
    throw new Error('Provided values not numbers.');
  }
};

export const calculateBmi = (weight: number, height: number) => {
  const bmi = ((weight / (height/100 * height/100)));
  if (bmi > 30.0){
    return 'Obese range';
  }
  else if (bmi > 25.0){
    return 'Overweight range';
  } 
  else if (bmi > 18.5){
    return 'Normal range';
  }
  else {
    return 'Underweight range';
  }
};

try {
  if (require.main === module) {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBmi(weight, height));
  }
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error){
    errorMessage += ' Error: ' + errorMessage;
  }
  console.log(errorMessage);
}


