type IReviewCan = {
    value: true;
} | {
    value: false;
    reason: 'NO_AUTH' | 'GAME_RATED' | 'REVIEW_ALREADY_REQUESTED' | 'REVIEW_WAS_REQUESTED' | 'UNKNOWN';
};
export declare const reviewCan: () => Promise<IReviewCan>;
export declare const reviewRun: () => Promise<boolean>;
export {};
