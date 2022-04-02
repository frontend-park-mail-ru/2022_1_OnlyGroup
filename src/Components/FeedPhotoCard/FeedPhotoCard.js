import FeedPhotoCard from './FeedPhotoCard.hbs';

export class FeedPhotoCardComponent {
    static render(props, callback) {
        const template = FeedPhotoCard({userPhoto: props.userPhoto});
        // Event bus (callback)
        return template;
    }
}