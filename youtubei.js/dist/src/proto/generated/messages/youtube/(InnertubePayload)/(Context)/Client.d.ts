export declare namespace $.youtube.InnertubePayload.Context {
    type Client = {
        deviceMake: string;
        deviceModel: string;
        nameId: number;
        clientVersion: string;
        osName: string;
        osVersion: string;
        acceptLanguage: string;
        acceptRegion: string;
        androidSdkVersion: number;
        windowWidthPoints: number;
        windowHeightPoints: number;
    };
}
export type Type = $.youtube.InnertubePayload.Context.Client;
export declare function getDefaultValue(): $.youtube.InnertubePayload.Context.Client;
export declare function createValue(partialValue: Partial<$.youtube.InnertubePayload.Context.Client>): $.youtube.InnertubePayload.Context.Client;
export declare function encodeJson(value: $.youtube.InnertubePayload.Context.Client): unknown;
export declare function decodeJson(value: any): $.youtube.InnertubePayload.Context.Client;
export declare function encodeBinary(value: $.youtube.InnertubePayload.Context.Client): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.youtube.InnertubePayload.Context.Client;
