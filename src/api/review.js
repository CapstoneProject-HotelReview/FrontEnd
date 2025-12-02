export async function addReview() {}

export async function rating() {
  const stars = document.querySelectorAll(".rate-btn span");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      stars.forEach((s) => s.classList.remove("selected"));
      star.classList.add("selected");
      console.log("Selected rating:", star.dataset.value);
    });
  });
}
