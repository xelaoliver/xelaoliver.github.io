document.getElementById("time").innerHTML = new Date().getHours()+":"+new Date().getMinutes().toString().padStart(2, "0");

document.getElementById("words").innerHTML = document.body.innerText.trim().split(/\s+/).length;

document.addEventListener("DOMContentLoaded", () => {
  // thanks hyperplexed!
  
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const titleElement = document.getElementById("maintitle");

  let iterations = 0;

  const interval = setInterval(() => {
    titleElement.innerText = titleElement.innerText.split("")
      .map((letter, index) => {
        if (index < iterations) {
          return titleElement.dataset.value[index];
        }

        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");

    if (iterations >= titleElement.dataset.value.length) clearInterval(interval);

    iterations += .05;
  }, 30);
});
