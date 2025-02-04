import { createContext } from 'react';
import { Session } from '@supabase/supabase-js'

export const SessionContext = createContext<Session | null>(null);

export const InGameOptionsContext = createContext<{ vibrate: boolean, sound: boolean } | null>(null);