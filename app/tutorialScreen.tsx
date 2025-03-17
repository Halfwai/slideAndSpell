import React from "react";
import { useRouter, RelativePathString } from "expo-router";

// Import components
import Tutorial from "@/components/submenuComponents/Tutorial";


export default function TutorialScreen() {
    const router = useRouter();
    return (
        <Tutorial 
            endTutorial={() => {
                router.push('/menu' as RelativePathString);
            }}
        />
    )
}