const buttons = document.querySelectorAll('.quiz button');
const feedback = document.querySelector('.feedback');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('correct', 'wrong'));
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
      feedback.innerHTML = '<span class="bonus">¡SUPER OLÉ BONUS! +100</span>';
    } else {
      button.classList.add('wrong');
      feedback.textContent = 'Miss Ñita dice: inténtalo otra vez 😉';
    }
  });
});

