var animal = Math.random() > 0.5
    ? { meow: function () { return console.log('Meow'); } }
    : { bark: function () { return console.log('Bark'); } };
function isCat(animal) {
    // Mengembalikan true jika animal adalah Cat
    return animal.meow !== undefined;
}
if (isCat(animal)) {
    // Di dalam blok ini, TypeScript mengetahui bahwa `animal` adalah Cat
    animal.meow();
}
else {
    // Di dalam blok ini, TypeScript mengetahui bahwa `animal` adalah Dog
    animal.bark();
}
