document.addEventListener("DOMContentLoaded", () => {
  let iterations = 0;
  const titleElement = document.getElementById("maintitle");

  const interval = setInterval(() => {
    titleElement.innerHTML = titleElement.dataset.value.split("")
      .map((letter, index) => {
        if (index < iterations) {
          return titleElement.dataset.value[index];
        }
        return `<span style="color: #ffffff">${titleElement.dataset.value[index]}</span>`;
      })
      .join("");
    
    if (iterations >= titleElement.dataset.value.length) clearInterval(interval);

    iterations += Math.random()*(2-0.001)+0.001;
  }, 30);
});

function randomSentence() {
  let sentences = ["The chat website, everyone calls it.", "Javascript demos and projects.", "Your code? More like our code!", "Support me on buy me a coffee!", "Check out the pages!", "Computer is not my middle name!", "What I have created has not been approved by the Vatican.", "Do ctrl+u to view the source code!", "alt+f4", "The bowtie of websites.", "Optimize everything and everything.", Math.floor(Math.random() * 999) + " or something?"];
  
  return sentences[Math.floor(Math.random() * sentences.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pad").innerHTML = randomSentence();
});
