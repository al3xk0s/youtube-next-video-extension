import * as moment from 'moment';

export interface DurationValues {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export class Duration implements DurationValues {
    constructor({
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0,
    }: Partial<DurationValues>) {
        this._days = days;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
        this._milliseconds = milliseconds;
    }

    get days() { return this._days; }

    get hours() { return this._hours; }

    get minutes() { return this._minutes; }

    get seconds() { return this._seconds; }

    get milliseconds() { return this._milliseconds; }

    get inDays() { return this.inHours / 24 }

    get inHours() { return this.inMinutes / 60 }

    get inMinutes() { return this.inSeconds / 60 }

    get inSeconds() { return this.inMilliseconds / 1000 }

    get inMilliseconds() {
        return (((this._days * 24) * 60) * 60) * 1000 +
            ((this._hours * 60) * 60) * 1000+
            (this._minutes * 60) * 1000 +
            this._seconds * 1000 +
            this._milliseconds;
    }    

    private _days: number;
    private _hours: number;
    private _minutes: number;
    private _seconds: number;
    private _milliseconds: number;

    isLess(other: Duration) { return this.inMilliseconds < other.inMilliseconds }
    
    isMore(other: Duration) { return this.inMilliseconds > other.inMilliseconds }
    
    isEqual(other: Duration) { return this.inMilliseconds === other.inMilliseconds }

    isLessOrEqual(other: Duration) { return this.isLess(other) || this.isEqual(other) }
    isMoreOrEqual(other: Duration) { return this.isMore(other) || this.isEqual(other) }

    static fromISO8601 = (source: string) => {
        const momentDuration = moment.duration(source);

        return new Duration({
            seconds: momentDuration.asSeconds(),            
        });
    }
}
