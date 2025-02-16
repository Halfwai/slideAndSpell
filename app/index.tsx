import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/app/Auth'

import Menu from '@/app/Menu'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'

import { COLOURS } from '@/constants/colours'

import { UserContext } from '@/utils/context'

export default function App() {
    const context = useContext(UserContext);
    return (
        <View style={{flex: 1, backgroundColor: COLOURS.blue}}>            
            {context && context.session && context.session.user ? 
                <Menu />
                    : 
                <Auth />
            }
        </View>
    )
}
