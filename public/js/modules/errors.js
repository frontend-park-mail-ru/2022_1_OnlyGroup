/**
 * Errors class
 */
export class Errors {
  /**
   * Set errors visibility on page
   * @param {Object} input - input element
   * @param {string} visibility - visibility value
   * @param {string} text - error text
   */
  static setErrorVisible(input, visibility, text) {
    const error = document.querySelector(`.${input.classList.item(0)}__error`);
    error.textContent = text;
    error.style.visibility = visibility;
  }
}
