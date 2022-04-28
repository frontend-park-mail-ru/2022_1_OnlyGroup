import {BaseComponent} from '_components/Base/Base';
import feedInfo from './FeedInfo.hbs';
import {FEED_VIEW_NAMES} from '../../Modules/ViewConsts';

/**
 * Feed info component
 */
export default class FeedInfo extends BaseComponent {
    /**
     * Create feed info component
     * @param {Array} styles
     */
    constructor({styles}) {
        super({styles});
        this.ready = false;
        this.interestsName = FEED_VIEW_NAMES.interests;
        this.horoscopeName = FEED_VIEW_NAMES.horoscope;
        this.setEvents({
            'action-like': this.profileChanged,
            'action-dislike': this.profileChanged,
            'info-ready': this.infoReady,
        });
    }

    /**
     * Render feed info component
     * @return {string}
     */
    render() {
        return feedInfo(this);
    }

    infoReady = ({info}) => {
        this.ready = true;
        this.aboutUser = info.aboutUser;
        this.name = `${info.firstName} ${info.lastName}`;
        this.age = info.age;
        this.city = info.City;
        this.interests = info.interests;
        this.horoscope = 'Все четко';
        this.stateChanged = true;
        this.reRender();
    }

    profileChanged = () => {
        this.ready = false;
        this.stateChanged = true;
        this.reRender();
    }
}
