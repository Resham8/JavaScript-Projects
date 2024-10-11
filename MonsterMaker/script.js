let colorBtn = document.getElementById("color-btn");
let faceBtn = document.getElementById("face-btn");
let hornsBtn = document.getElementById("horns-btn");
let tailBtn = document.getElementById("tail-btn");

let docRoot = document.querySelector(":root");

let tricolorSets = [
  ["#ff4f51", "#a8d530", "#42aaff"], 
  ["#ffa711", "#42aaff", "#904ae8"], 
  ["#904ae8", "#f3d55b", "#ff4f51"], 
];

let colors = ["#a8d530", "#42aaff", "#f3d55b", "#ff4f51", "#904ae8", "#ffa711", "transparent"];
let [counter1, counter2, counter3, counter4] = Array(4).fill(0);

colorBtn.addEventListener("click", () => {
  counter2 = (counter2 + 1) % tricolorSets.length;

  docRoot.style.setProperty("--color-monster-top", tricolorSets[counter2][0]);
  docRoot.style.setProperty("--color-monster-middle", tricolorSets[counter2][1]);
  docRoot.style.setProperty("--color-monster-bottom", tricolorSets[counter2][2]);
});

faceBtn.addEventListener("click", () => {
  counter1 = (counter1 + 1) % 6;
  document.getElementById("face").setAttribute("src", `face-${counter1}.png`);
});

hornsBtn.addEventListener("click", () => {
  counter3 = (counter3 + 1) % colors.length;
  docRoot.style.setProperty("--color-horns", colors[counter3]);
});

tailBtn.addEventListener("click", () => {
  counter4 = (counter4 + 1) % colors.length;
  docRoot.style.setProperty("--color-tail", colors[counter4]);
});
