import { Duration } from "./lib/time/duration";
import { VideoResponseSmall } from "./models/video";

export type VideoFilter = (video: VideoResponseSmall) => boolean;

const shortMaxDuration = new Duration({seconds: 59});

export type FilterString = 'long' | 'shorts' | 'all';

export const filtres = {
    get stringValues() {
        return Object.keys(filtres.values) as unknown as (keyof typeof filtres['values'])[]
    },

    nextFilter(value: FilterString) {
        return this.stringValues[(this.stringValues.indexOf(value) + 1) % this.stringValues.length]
    },

    values: {
        long: (v) => Duration.fromISO8601(v.details.duration).isMore(shortMaxDuration),
        shorts: (v) => Duration.fromISO8601(v.details.duration).isLessOrEqual(shortMaxDuration),
        all: (_) => true,
    } as Record<FilterString, VideoFilter>
}
