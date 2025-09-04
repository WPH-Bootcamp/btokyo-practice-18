// Implementation signature
function calculateArea(arg1, arg2) {
    if (arg2 === undefined) {
        // Jika hanya satu argumen, hitung luas lingkaran
        return Math.PI * Math.pow(arg1, 2); // Luas lingkaran: π * r²
    }
    // Jika dua argumen, hitung luas persegi panjang
    return arg1 * arg2; // Luas persegi panjang: panjang * lebar
}
// Penggunaan
// Menghitung luas lingkaran dengan radius 5
var circleArea = calculateArea(5);
console.log(circleArea); // Output: 78.53981633974483 (approx)
// Menghitung luas persegi panjang dengan panjang 10 dan lebar 4
var rectangleArea = calculateArea(10, 4);
console.log(rectangleArea); // Output: 40
