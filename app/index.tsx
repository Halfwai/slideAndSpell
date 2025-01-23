import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Menu from '@/components/Menu'

import { COLOURS } from '@/constants/colours'

import { SessionContext } from '@/utils/context'

export default function App() {
    const session = useContext(SessionContext);
    return (
        <View style={{flex: 1, backgroundColor: COLOURS.blue}}>            
            {session && session.user ? <Menu />
                : 
            <Auth />
            }
        </View>
    )
}
