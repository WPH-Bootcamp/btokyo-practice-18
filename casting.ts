const el = document.querySelector("#count"); 
if (el) {
  const span = el as HTMLSpanElement; // kita yakin #count adalah <span>
  span.textContent = "42";
}

const input = 20;