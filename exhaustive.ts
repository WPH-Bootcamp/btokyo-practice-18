type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; height: number, base: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "square":
      return s.size * s.size;
    case "triangle":
      return (s.height * s.base) / 2;
    default: {
      // Exhaustive check:
      const _never: never = s; // ❗ compiler error jika ada kind baru yang belum ditangani
      console.log("Unhandled shape kind:", _never);
      return _never;
    }
  }
}

function areaLoose(s: Shape) {
  if (s.kind === "circle") return Math.PI * s.radius ** 2;
  // ❌ Lupa handle "square" → tidak ketahuan, bisa return undefined.
}

console.log(area({ kind: "circle", radius: 10 }));
console.log(area({ kind: "triangle", height: 10, base: 5 }));
console.log(areaLoose({ kind: "square", size: 10 })); // undefined
