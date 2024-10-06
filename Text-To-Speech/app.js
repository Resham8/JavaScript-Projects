const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speakBtn = document.getElementById('speak-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const stopBtn = document.getElementById('stop-btn');

let speechSynthesis = window.speechSynthesis;
let voices = [];
let currentUtterance;

function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function speakText() {
    const textValue = textInput.value.trim();
        
    if (textValue === '') {
        alert('Please enter some text before speaking.');
        textInput.classList.add('error'); 
        return;
    }

    textInput.classList.remove('error');
    
    currentUtterance = new SpeechSynthesisUtterance(textValue);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    currentUtterance.voice = selectedVoice;

    currentUtterance.rate = 1;
    currentUtterance.pitch = 1;

    speechSynthesis.speak(currentUtterance);
}


function pauseSpeech() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
}

function resumeSpeech() {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}

function stopSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
}


speakBtn.addEventListener('click', speakText);
pauseBtn.addEventListener('click', pauseSpeech);
resumeBtn.addEventListener('click', resumeSpeech);
stopBtn.addEventListener('click', stopSpeech);

speechSynthesis.onvoiceschanged = loadVoices;
