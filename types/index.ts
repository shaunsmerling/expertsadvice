export type AHVideos = {
    title: string;
    captions: string;
    tokens: number;
    chunks: AHChunks[];
}

export type AHChunks = {
    title: string;
    captions: string;
    captionsTokens: number;
    embedding: number[]
}

export type AHJSON = {
    tokens: number
    videos: AHVideos[]
}


