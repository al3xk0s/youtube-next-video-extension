const OWNER = 'Next video extension';

export enum AdjacentVideoType {
    next,
    previos,
}

export enum MessageName {
    adjacentVideo,
    playlistVideos,
}

export type Message<N extends MessageName, T extends object> = {
    owner: typeof OWNER;
    name: N;
    args: T;
}

const createMessage = <N extends MessageName, T extends object>(name: N, args: T) : Message<N, T> => ({
    owner: OWNER,
    name,
    args,
});

export const Message = {
    match: (message: any) => typeof message === 'object' && 'owner' in message && 'args' in message,
    [MessageName.adjacentVideo]: (currentVideoID: string, type: AdjacentVideoType) => createMessage(MessageName.adjacentVideo, { type, currentVideoID }),
    [MessageName.playlistVideos]: (currentVideoID: string) => createMessage(MessageName.playlistVideos, { currentVideoID }),
};

type ArgsOfMessage<T extends MessageName> = ReturnType<typeof Message[T]>['args'];

export class MessageMatcher {
    constructor() {
        this._map = new Map<MessageName, (args: object) => Promise<void>>();
    }

    readonly addCase = <T extends MessageName, R>(messageName: T, listener: (args: ArgsOfMessage<T>) => Promise<R>) => {
        this._map.set(messageName, listener);
        return this;
    }

    readonly removeCase = (messageName: MessageName) => {
        this._map.delete(messageName);
    };

    readonly clearCases = () => this._map.clear();

    readonly execute = async (message: any) => {
        if(!Message.match(message)) return;
        const executor = this._map.get(message.name);

        if(executor == null) return;

        return await executor(message.args);
    }

    private _map: Map<MessageName, (args: object) => Promise<any>>;
}

export type BackendExtensionResponse<T> = {
    data?: T;
    isError: boolean;
    userMessage?: string;
}

export type BackendExtensionUrlResponse = BackendExtensionResponse<{url: string}>;