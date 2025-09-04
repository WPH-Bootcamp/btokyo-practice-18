import fs from "fs/promises";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";

type Student = { id: number; name: string; grade: string; address: string };

const DB_PATH = path.resolve(process.cwd(), "students.json");

async function load(): Promise<Student[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data as Student[];
    return [];
  } catch {
    return [];
  }
}

async function save(rows: Student[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(rows, null, 2), "utf8");
}

function printRows(rows: Student[]) {
  if (!rows.length) {
    console.log("Tidak ada data.");
    return;
  }
  console.table(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      grade: r.grade,
      address: r.address,
    }))
  );
}

async function inputNonEmpty(rl: readline.Interface, prompt: string) {
  while (true) {
    const v = (await rl.question(prompt)).trim();
    if (v) return v;
    console.log("Tidak boleh kosong.");
  }
}

async function inputWithDefault(rl: readline.Interface, prompt: string, current: string) {
  const v = (await rl.question(`${prompt} (sekarang: ${current}) `)).trim();
  return v || current;
}

async function createStudent(rl: readline.Interface, rows: Student[]) {
  const name = await inputNonEmpty(rl, "Nama: ");
  const grade = await inputNonEmpty(rl, "Kelas/Grade: ");
  const address = await inputNonEmpty(rl, "Alamat: ");
  const id = Date.now();
  const s: Student = { id, name, grade, address };
  rows.push(s);
  await save(rows);
  console.log("Siswa ditambahkan dengan id:", id);
}

async function listStudents(rows: Student[]) {
  printRows(rows.sort((a, b) => a.id - b.id));
}

async function getById(rows: Student[], idStr: string) {
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    console.log("ID tidak valid.");
    return;
  }
  const s = rows.find((r) => r.id === id);
  if (!s) {
    console.log("Siswa tidak ditemukan.");
    return;
  }
  printRows([s]);
}

async function updateStudent(rl: readline.Interface, rows: Student[]) {
  const idStr = await inputNonEmpty(rl, "ID siswa: ");
  const id = Number(idStr);
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) {
    console.log("Siswa tidak ditemukan.");
    return;
  }
  const curr = rows[idx];
  const name = await inputWithDefault(rl, "Nama", curr.name);
  const grade = await inputWithDefault(rl, "Kelas/Grade", curr.grade);
  const address = await inputWithDefault(rl, "Alamat", curr.address);
  rows[idx] = { ...curr, name, grade, address };
  await save(rows);
  console.log("Siswa diperbarui.");
}

async function deleteStudent(rl: readline.Interface, rows: Student[]) {
  const idStr = await inputNonEmpty(rl, "ID siswa: ");
  const id = Number(idStr);
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) {
    console.log("Siswa tidak ditemukan.");
    return;
  }
  rows.splice(idx, 1);
  await save(rows);
  console.log("Siswa dihapus.");
}

function matches(s: Student, q: string) {
  const t = q.toLowerCase();
  return (
    String(s.id).includes(t) ||
    s.name.toLowerCase().includes(t) ||
    s.grade.toLowerCase().includes(t) ||
    s.address.toLowerCase().includes(t)
  );
}

async function searchStudents(rl: readline.Interface, rows: Student[]) {
  const q = (await rl.question("Kata kunci: ")).trim().toLowerCase();
  const res = rows.filter((r) => matches(r, q));
  printRows(res);
}

async function main() {
  const rl = readline.createInterface({ input, output });
  let rows = await load();
  while (true) {
    console.log("\n=== CRUD Siswa ===");
    console.log("1. Tambah");
    console.log("2. Daftar");
    console.log("3. Detail by ID");
    console.log("4. Ubah by ID");
    console.log("5. Hapus by ID");
    console.log("6. Cari");
    console.log("0. Keluar");
    const choice = (await rl.question("Pilih: ")).trim();
    if (choice === "1") await createStudent(rl, rows), (rows = await load());
    else if (choice === "2") await listStudents(rows);
    else if (choice === "3") {
      const id = await inputNonEmpty(rl, "ID siswa: ");
      await getById(rows, id);
    } else if (choice === "4") {
      await updateStudent(rl, rows);
      rows = await load();
    } else if (choice === "5") {
      await deleteStudent(rl, rows);
      rows = await load();
    } else if (choice === "6") await searchStudents(rl, rows);
    else if (choice === "0") break;
    else console.log("Pilihan tidak dikenal.");
  }
  rl.close();
}

main();
