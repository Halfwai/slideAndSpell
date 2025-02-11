import { createContext } from 'react';
import { Session } from '@supabase/supabase-js'

interface UserContextType {
    session: Session | null,
    vibrate: boolean,
    setVibrate: Function,
    sound: boolean,
    setSound: Function,
}

export const UserContext = createContext<UserContextType | null>(null);

export const InGameOptionsContext = createContext<{ vibrate: boolean, sound: boolean } | null>(null);