import Tutorial from "@/components/Tutorial";
import { useRouter, RelativePathString } from "expo-router";

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