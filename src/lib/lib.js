export function calculateRatingScore(star) {
    if (typeof star !== "number" || star < 1 || star > 5) return 0;
    return star * 2;
}