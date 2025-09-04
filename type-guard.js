function printLen(x) {
    if (typeof x === "string") {
        // type guard: di sini x dipersempit jadi string
        console.log(x.length);
    }
    else {
        // di sini x: string[]
        console.log(x.join(", "));
    }
}
printLen("helloworld");
printLen(["hello", "world"]);
