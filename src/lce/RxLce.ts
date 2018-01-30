import { contentState, errorState, loadingState } from './LCE';

/**
 * Modifies an observable in a way that it conforms to the Load-Content-Error object.
 * @param observable$ The original observable stream.
 * @param content An optional content object during the loading state. By default it is null.
 */
export default function lceObservable<T>(observable$: Rx.Observable<T>, content: T | null = null) {
    return observable$
        .map(contentState)
        .catch((err: Error) => Rx.Observable.of(errorState(err)))
        .startWith(loadingState());
}

type typeMapFn<T> = (item: T) => T;

export function lceGraphQlPromise<T>(promise: Promise<T>, mapFn: typeMapFn<T> = (item) => item, content: T | null = null) {
    return Rx.Observable.fromPromise(promise)
        .map((result: any) => contentState(mapFn(result.data)))
        .catch((err: Error) => Rx.Observable.of(errorState(err)))
        .startWith(loadingState<T>(content));
}