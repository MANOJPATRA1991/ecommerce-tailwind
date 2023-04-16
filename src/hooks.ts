import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { ApplicationState, ApplicationDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
export const useAppDispatch: () => ApplicationDispatch = useDispatch;
