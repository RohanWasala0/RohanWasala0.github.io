import anime from 'animejs';

const wrapper = document.getElementById("tiles");
const sectionElement = document.getElementById('hero');

// Check if the element was found
// if (sectionElement) {
//     // Do something with the tilesElement here
//     // For example, you can add content or modify its properties
//     console.log('Element found');
// } else {
//     console.log('Element with ID "tiles" not found');
// }

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  sectionElement.classList.toggle("toggled");
}

const handleOnClick = index => {
  toggle();
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    duration: 500,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = sectionElement.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(sectionElement.clientWidth / size);
  rows = Math.floor(sectionElement.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = function(){createGrid();}