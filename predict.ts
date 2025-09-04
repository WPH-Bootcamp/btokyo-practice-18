type Cat = {
  meow: () => void;
};

type Dog = {
  bark: () => void;
};

type CutePet = Cat | Dog;

const animal: CutePet =
  Math.random() > 0.5
    ? { meow: () => console.log('Meow') }
    : { bark: () => console.log('Bark') };

function isCat(animal: CutePet): animal is Cat {
  // Mengembalikan true jika animal adalah Cat
  return (animal as Cat).meow !== undefined;
}

function isDog(animal: CutePet): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

if (isCat(animal)) {
  // Di dalam blok ini, TypeScript mengetahui bahwa `animal` adalah Cat
  animal.meow();
} else {
  // Di dalam blok ini, TypeScript mengetahui bahwa `animal` adalah Dog
  animal.bark();
}


interface Animal {
  name: string;
}

interface Bird extends Animal {
  fly: () => void;
}

interface Fish extends Animal {
  swim: () => void;
}

const animals: (Bird | Fish)[] = [
  { name: 'Eagle', fly: () => console.log('Flying') },
  { name: 'Shark', swim: () => console.log('Swimming') },
  { name: 'Penguin', swim: () => console.log('Swimming') },
];

// Fungsi type predicate untuk memeriksa apakah animal adalah Bird
function isBird(animal: Animal): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function isFish(animal: Animal): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

// Filter burung dari array animals
const birds = animals.filter(isBird);

birds.forEach((bird) => bird.fly()); // TypeScript tahu bahwa `bird` adalah Bird di sini