/**
 * Handlers for buttons on feed page
 */
export function buttonsHandlers() {
  const editProfileButton = document.querySelector('.settings__edit');
  const cancelButton = document.querySelector('.cancel');
  const navigationButtons = document.querySelector('.navigation__buttons');
  const navigationField = document.querySelector('.navigation__field');
  const navigationProfile = document.querySelector('.navigation__profile');

  editProfileButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigationButtons.style.display = 'none';
    navigationField.style.display = 'none';
    navigationProfile.style.display = 'flex';
  });

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigationButtons.style.display = 'flex';
    navigationField.style.display = 'flex';
    navigationProfile.style.display = 'none';
  });
}
