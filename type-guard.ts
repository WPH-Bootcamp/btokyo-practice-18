function printLen(x: string | number) {
  if (typeof x === "string") {
    // type guard: di sini x dipersempit jadi string
    console.log(x.length);
  } else {
    // 9 -> '9'
    console.log(x.toString().length)
  }
}

printLen("helloworld")

function printLenBad(x: string | string[]) {
  // ❌ Tidak aman: x mungkin array, .length-nya ada sih, tapi perilaku beda;
  // dan kalau mau call string method malah bisa salah.
  console.log(x.length);

  // ❌ Potensi salah:
  // console.log(x.toUpperCase()); // Error: x bisa string[] juga
}


