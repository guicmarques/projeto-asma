export interface Chat {
    id : string;
    message : string;
    isMe : boolean;
    createdAt : string;
    type : 'human' | 'bot'; 
}