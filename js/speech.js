// say things
var english_voice = '';

function speak(text) {
  var available_voices = window.speechSynthesis.getVoices();

  if(english_voice == '') {

    for(var i=0; i<available_voices.length; i++) {
      if(available_voices[i].lang === 'en-GB') {
        english_voice = available_voices[i];
        break;
      }
    }

    if(english_voice === '' && available_voices.length > 0) {
      english_voice = available_voices[0];
    }
  }
  var utter = new SpeechSynthesisUtterance();
  utter.text = text;
  if(english_voice != '') {
    utter.voice = english_voice;
  }


  // speak
  window.speechSynthesis.speak(utter);
}
