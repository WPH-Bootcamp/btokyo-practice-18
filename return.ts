function checkLength(a: string) {
  return a.length;
}

const result2: ReturnType<typeof checkLength> = 5; // number

const result = typeof checkLength('Hello'); // number
