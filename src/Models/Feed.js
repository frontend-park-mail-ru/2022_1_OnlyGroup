import EventBus from '../Modules/EventBus';
import {API_FAILED, FEED_EVENTS} from '../Modules/EventBusEvents';
import {User} from './User';
import {Api} from '../Modules/Api';

/**
 * Feed model
 */
export class Feed {
    /**
     * Create feed model
     */
    constructor() {
        this.candidates = [];
        this.events = {
            [FEED_EVENTS.actionLike]: this.like,
            [FEED_EVENTS.actionDislike]: this.dislike,
        };
    }

    start = async () => {
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
        this.placeCandidate();
    }

    placeCandidate = async () => {
        if (this.candidates.length === 0) {
            const response = await Api.FindCandidate();
            if (!response.isOk()) {
                EventBus.emitEvent(API_FAILED, result);
                return;
            }
            this.candidates = response.Body.Candidates.map((value) => {
                if (value) {
                    return new User({id: value});
                }
            });
        }
        if (this.candidates.length === 0) {
            EventBus.emitEvent(FEED_EVENTS.noCandiates);
            return;
        }
        this.candidates[this.candidates.length-1].startFeed();
        if (this.candidates.length === 2) {
            this.candidates[this.candidates.length-2].preLoad();
        }
    }

    like = async () => {
        const likedCandidate = this.candidates.pop();
        likedCandidate.like();
        likedCandidate.stopFeed();
        this.placeCandidate();
    }

    dislike = async () => {
        const likedCandidate = this.candidates.pop();
        likedCandidate.dislike();
        likedCandidate.stopFeed();
        this.placeCandidate();
    }

    /**
     * Stop feed model
     */
    stop() {
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}
