export declare class VideoSearchListDto {
    queryString: string;
    pageToken?: string;
}
export declare class VideoInfoResDTO {
    definition: 'HD' | 'SD';
    dimension: '2D' | '3D';
    duration: string;
    embeddable: boolean;
}
export declare class VideoThumbnailDto {
    url: URL;
    width: number;
    height: number;
}
export declare class VideoSaveReqDTO {
}
