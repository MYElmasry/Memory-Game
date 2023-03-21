const controlButtons = document.querySelector(".control-buttons");
const nameSpan = document.querySelector(".name span");

controlButtons.addEventListener("click", getYourName);

async function getYourName() {
  const { value: yourName } = await Swal.fire({
    title: "What's your name?",
    input: "text",
    inputLabel: "You can cancel if you want to play as guest!!",
    showCancelButton: true,
  });

  nameSpan.innerHTML = yourName || "Guest";
  controlButtons.remove();
}

let duration = 1000;

const blocksContainer = document.querySelector(".memory-game-blocks");

const blocks = Array.from(blocksContainer.children);

let orderRange = shuffle([...blocks.keys()]);

console.log(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length == 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function checkMatchedBlocks(firstBlock, secondBlocks) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology == secondBlocks.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlocks.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlocks.classList.add("has-match");
    document.querySelector("#success").play();
  } else {
    triesElement.innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlocks.classList.remove("is-flipped");
    }, duration);
    document.querySelector("#fail").play();
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(arr) {
  let current = arr.length,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
  return arr;
}
