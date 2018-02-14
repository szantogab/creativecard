/**
 * Functions for generating redux LCE (Load-Content-Error) objects.
 * @author Gabor Szanto
 */

export class LceState<T> {
    constructor(public readonly loading: boolean = false, public readonly content: T | null = null, public readonly error: Error | null = null) {
        this.loading = loading;
        this.content = content;
        this.error = error;
    }

    isLoading = () => this.loading;
    isError = () => this.error !== null;
    isSuccess = () => this.content && !this.loading;

    /**
     * Upon success, this returns a new LceState by invoking the given function and passing the original state's content to it.
     * On error or loading, this returns the original state.
     */
    mapWhenContent = (fn: any) => {
        if (this.isSuccess()) { return new LceState(this.loading, fn(this.content), this.error); }
        return this;
    }

    /**
     * Upon success, this function calls the given function to map the content of the result.
     * On erorr, this returns null.
     */
    mapOrNullWhenContent = (fn: any) => {
        if (this.isSuccess()) { return fn(this.content); }
        return null;
    }

    merge = (newState: LceState<T>) => new LceState(newState.loading, newState.content || this.content, newState.error);
}

export default function initialState<T>(initialContent?: T | null) {
    return new LceState(false, initialContent);
}

export function contentState<T>(content: T) {
    return new LceState(false, content, null);
}

export function errorState(error: Error) {
    return new LceState(false, null, error);
}

export function loadingState<T>(content?: T | null) {
    return new LceState(true, content, null);
}