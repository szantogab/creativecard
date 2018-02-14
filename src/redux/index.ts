import appState from './State';
import { UserState } from './UserStore';

export interface AppState {
    login: UserState;
}

appState.connect();

const sub = new Rx.BehaviorSubject<AppState>(null!);

appState.asObservable().subscribe((a: any) => sub.onNext(a));
export default sub;
