import Message from './Message.hbs';

export class MessageComponent {
    static render(props, callback) {
        const template = Message({
            userIcon: props.userIcon, 
            userName: props.userName, 
            userMessage: props.userMessage, 
            messageCount: props.messageCount,
            messageId: props.messageId,
        });
        // Event bus callback
        return template;
    }
}