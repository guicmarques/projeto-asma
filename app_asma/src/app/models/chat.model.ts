export interface Chat {
    message : string;
    isMe : boolean;
    createdAt : string;
    type : 'human' | 'bot'; 
}