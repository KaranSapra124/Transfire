export const Links = [
    {
        title: "Home",
        Link: "/"
    },
    {
        title: "About",
        Link: "/About"
    },
    {
        title: "Translate",
        Link: "/Translate"
    },
    {
        title: "Login",
        Link: "/Login"
    },
    {
        title: "SignUp",
        Link: "/SignUp"
    }
]

export const TranslateImg = "./Pictures/translate-removebg-preview.png"

export const PostUrl = "https://text-translator2.p.rapidapi.com/translate";
export const ApiKey = "9928a29368msh011e41a469b5800p1d2f15jsne16aae1096fa";
export const GetUrl = "https://text-translator2.p.rapidapi.com/getLanguages";

export const SpeechSynthesis = (text) => {
    // Check if the browser supports the Speech Synthesis API
    if ('speechSynthesis' in window) {
        const synthesis = window.speechSynthesis;

        // Create a new SpeechSynthesisUtterance object
        const utterance = new SpeechSynthesisUtterance();

        // Set the text you want to be spoken
        utterance.text = text;

        // Set optional properties (e.g., voice, rate, pitch)
        utterance.voice = synthesis.getVoices()[1]; // Use the first available voice
        utterance.rate = 1.0; // Speech rate (1.0 is the default)
        utterance.pitch = 1.0; // Speech pitch (1.0 is the default)

        // Event handler for when speech synthesis starts
        utterance.onstart = () => {
            console.log('Speech synthesis started.');
        };

        // Event handler for when speech synthesis ends
        utterance.onend = () => {
            console.log('Speech synthesis ended.');
        };

        // Event handler for speech synthesis errors
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
        };

        // Start speech synthesis
        synthesis.speak(utterance);
    } else {
        console.log('Speech synthesis is not supported in this browser.');
    }

}