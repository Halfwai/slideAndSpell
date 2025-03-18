import { createContext } from 'react';
import { Session } from '@supabase/supabase-js'

// UserContextType
interface UserContextType {
    session: Session | null,
    vibrate: boolean,
    setVibrate: Function,
    sound: boolean,
    setSound: Function,
}

// UserContext
export const UserContext = createContext<UserContextType | null>(null);