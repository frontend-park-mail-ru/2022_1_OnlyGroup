import { View } from "../view/baseView.js";
import feedView from "./feedView.hbs";

/**
 * View class for login page
 */
export class FeedView extends View {
    /**
     * Constructor
     * @param {Object} parent
     */
     constructor({
        parent,
    }) {
        super({
          parent: parent,
        });
    }

    /**
     * Render page function
     * @param {Object} props
     */
    render(props = {}) {
        this.parent.insertAdjacentHTML(
            "afterbegin",
            feedView(
                (props = {
                    name: props.name,
                    surname: props.surname,
                    age: props.age,
                    location: props.location,
                    avatar: props.avatar,
                    userName: props.userName,
                    userSurname: props.userSurname,
                    userAge: props.userAge,
                    userLocation: props.userLocation,
                    infoAboutUser: props.infoAboutUser,
                    userPhoto: props.userPhoto,
                    interests: props.interests,
                    horoscope: props.horoscope,
                    messages: props.messages,
                    matches: props.matches,
                })
            )
        );
        this.setHandlers();
    }

    /**
     * Function for get buttons from page
     * @returns {Array}
     */
    getButtons() {
        const buttons = [
            document.getElementById('edit-button'),
            document.getElementById('message-block__match-button'),
            document.getElementById('match-block__message-button'),
            document.getElementById('user-message__message-button'),
            document.getElementById('user-message__match-button'),
            document.getElementById('changeForm__cancel-button'),
            document.getElementById('changeForm__save-button'),
            document.getElementById('favorite-button'),
            document.getElementById('like-button'),
            document.getElementById('dislike-button'),
            document.querySelectorAll('.messageBlock__messages-message')
        ];

        return buttons;
    }

    /**
     * Function for get blocks from page
     * @returns {Array}
     */
    getBlocks() {
        const blocks = [
            document.getElementById('feedView__matchBlock'),
            document.getElementById('feedView__messageBlock'),
            document.getElementById('feedView__changeForm'),
            document.getElementById('feedView__userMessageBlock')
        ];

        return blocks;
    }

    /**
     * Function for set blocks visibility
     * @param {Array} blocks 
     * @param {Array} styles 
     * @param {Event} event 
     */
    setBlocksVisibility(blocks, styles, event) {
        event.preventDefault();
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.display = styles[i];
        }
    }

    /**
     * 
     * @param {Object} parent 
     * @param {Array} blocks 
     * @param {Array} styles 
     * @param {Event} event 
     */
    showMessageBlock(parent, blocks, styles, event) {
        this.setBlocksVisibility(blocks, styles, event);

        const userIcon = parent.querySelector('.user-message__icon').getAttribute('src');
        const userName = parent.querySelector('.messageBlock__messages-message__username').textContent;
        
        document.getElementById('user-icon').setAttribute('src', userIcon);
        document.getElementById('user-name').textContent = userName;
        document.getElementById('user-visit').textContent = 'Была недавно';
    }

    /**
     * Add event listeners on elements
     */
    setHandlers() {
        const buttons = this.getButtons();
        const blocks = this.getBlocks();

        buttons[0].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['none', 'none', 'flex', 'none'], event); });
        buttons[1].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['flex', 'none', 'none', 'none'], event); });
        buttons[2].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['none', 'flex', 'none', 'none'], event); });
        buttons[3].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['none', 'flex', 'none', 'none'], event); });
        buttons[4].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['flex', 'none', 'none', 'none'], event); });
        buttons[5].addEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['none', 'flex', 'none', 'none'], event); });
        for (let i = 0; i < buttons[10].length; i++) {
            buttons[10][i].addEventListener('click', (event) => { this.showMessageBlock(buttons[10][i], blocks, ['none', 'none', 'none', 'flex'], event); })
        }
    }

    /**
     * Remove event listeners from elements
     */
    removeHandlers() {
        const buttons = this.getButtons();
        const blocks = this.getBlocks();

        if (buttons[0]) {
            buttons[0].removeEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['display-none', 'display-none', 'display-flex', 'display-none'], event); });
        }

        if (buttons[1]) {
            buttons[1].removeEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['display-none', 'display-flex', 'display-none', 'display-none'], event); });
        }

        if (buttons[2]) {
            buttons[2].removeEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['display-flex', 'display-none', 'display-none', 'display-none'], event); });
        }

        if (buttons[3]) {
            buttons[3].removeEventListener('click', (event) => { this.setBlocksVisibility(blocks, ['display-none', 'display-flex', 'display-none', 'display-none'], event); });
        }
        
        this.parent.innerHtml = "";
    }
}