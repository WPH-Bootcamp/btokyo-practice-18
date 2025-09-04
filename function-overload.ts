// Overload signatures
function calculateArea(radius: number): number;
function calculateArea(length: number, width: number): number;

// Implementation signature
function calculateArea(arg1: number, arg2?: number): number {
  if (arg2 === undefined) {
    // Jika hanya satu argumen, hitung luas lingkaran
    return Math.PI * arg1 ** 2; // Luas lingkaran: π * r²
  }
  // Jika dua argumen, hitung luas persegi panjang
  return arg1 * arg2; // Luas persegi panjang: panjang * lebar
}

// Penggunaan

// Menghitung luas lingkaran dengan radius 5
const circleArea = calculateArea(5);
console.log(circleArea); // Output: 78.53981633974483 (approx)

// Menghitung luas persegi panjang dengan panjang 10 dan lebar 4
const rectangleArea = calculateArea(10, 4);
console.log(rectangleArea); // Output: 40

// Overload signatures
function sumNumbers(...args: number[]): number;
function sumNumbers(x: number[]): number;

// Implementation signature
function sumNumbers(...args: any[]): number {
  if (Array.isArray(args[0])) {
    // Jika argumen pertama adalah array
    return args[0].reduce((sum: number, num: number) => sum + num, 0);
  }
  // Jika argumen adalah beberapa angka
  return args.reduce((sum: number, num: number) => sum + num, 0);
}

// Penggunaan

// Menggunakan rest parameters
const sum1 = sumNumbers(1, 2, 3, 4);
console.log(sum1); // Output: 10

// Menggunakan array
const sum2 = sumNumbers([5, 10, 15]); // Note: This will sum the first array only
console.log(sum2); // Output: 30


type Person = {
  id: number;
  firstName: string;
  lastName: string;
  address?: string;
}

// Data contoh
const persons: Person[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', address: '123 Main St' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', address: '456 Oak Ave' },
  { id: 3, firstName: 'Alice', lastName: 'Smith', address: '789 Pine Rd' },
];

// Overload signatures
function findPerson(personId: number): Person[];
function findPerson(firstName: string, lastName: string): Person[];

// Implementation signature
function findPerson(arg1: number | string, arg2?: string): Person[] {
  if (arg2 === undefined) {
    // Pencarian berdasarkan personId
    const person = persons.find((p) => p.id === arg1);
    return person ? [person] : [];
  } else {
    // Pencarian berdasarkan nama depan dan belakang
    return persons.filter(
      (p) =>
        p.firstName.toLowerCase().includes((arg1 as string).toLowerCase()) &&
        p.lastName.toLowerCase().includes(arg2.toLowerCase())
    );
  }
}

// Penggunaan

// Mencari orang berdasarkan ID
const personById = findPerson(1);
console.log(personById);
// Output: [{ id: 1, firstName: 'John', lastName: 'Doe', address: '123 Main St' }]

// Mencari orang berdasarkan nama depan dan belakang
const personsByPartialName = findPerson('John', 'Doe');
console.log(personsByPartialName);
// Output: [{ id: 1, firstName: 'John', lastName: 'Doe', address: '123 Main St' }]