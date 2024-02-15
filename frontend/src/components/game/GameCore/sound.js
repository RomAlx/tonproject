////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
import $ from "jquery"
import { Sound } from "createjs-module";

export let soundVar = {
	enableDesktopSound: true, //sound for dekstop
	enableMobileSound : true, //sound for mobile and tablet
	soundOn: null,
	soundMute : false,
	musicMute : false,
	soundID : 0,
	soundPushArr : [],
	soundLoopPushArr : [],
	musicPushArr : [],
	audioFile : null,
}

export function setVarsSound(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (soundVar.hasOwnProperty(name)) {
        soundVar[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in sound.js.`);
    }
}

$.sound = {};
export function playSound(soundName, vol){
	if(soundVar.soundOn){
		var thisSoundID = soundVar.soundID;
		soundVar.soundPushArr.push(thisSoundID);
		soundVar.soundID++;

		var defaultVol = vol === undefined ? 1 : vol;
		$.sound[thisSoundID] = Sound.play(soundName);
		$.sound[thisSoundID].defaultVol = defaultVol;
		setSoundVolume(thisSoundID);

		$.sound[thisSoundID].removeAllEventListeners();
		$.sound[thisSoundID].addEventListener ("complete", function() {
			var removeSoundIndex = soundVar.soundPushArr.indexOf(thisSoundID);
			if(removeSoundIndex !== -1){
				soundVar.soundPushArr.splice(removeSoundIndex, 1);
			}
		});
	}
}

export function playSoundLoop(soundName){
	if(soundVar.soundOn){
		if($.sound[soundName]==null){
			soundVar.soundLoopPushArr.push(soundName);

			$.sound[soundName] = Sound.play(soundName);
			$.sound[soundName].defaultVol = 1;
			setSoundLoopVolume(soundName);

			$.sound[soundName].removeAllEventListeners();
			$.sound[soundName].addEventListener ("complete", function() {
				$.sound[soundName].play();
			});
		}
	}
}

export function toggleSoundLoop(soundName, con){
	if(soundVar.soundOn){
		if($.sound[soundName]!=null){
			if(con){
				$.sound[soundName].play();
			}else{
				$.sound[soundName].paused = true;
			}
		}
	}
}

export function stopSoundLoop(soundName){
	if(soundVar.soundOn){
		if($.sound[soundName]!=null){
			$.sound[soundName].stop();
			$.sound[soundName]=null;

			var soundLoopIndex = soundVar.soundLoopPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVar.soundLoopPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function playMusicLoop(soundName){
	if(soundVar.soundOn){
		if($.sound[soundName]==null){
			soundVar.musicPushArr.push(soundName);

			$.sound[soundName] = Sound.play(soundName);
			$.sound[soundName].defaultVol = 1;
			setMusicVolume(soundName);

			$.sound[soundName].removeAllEventListeners();
			$.sound[soundName].addEventListener ("complete", function() {
				$.sound[soundName].play();
			});
		}
	}
}

export function toggleMusicLoop(soundName, con){
	if(soundVar.soundOn){
		if($.sound[soundName]!=null){
			if(con){
				$.sound[soundName].play();
			}else{
				$.sound[soundName].paused = true;
			}
		}
	}
}

export function stopMusicLoop(soundName){
	if(soundVar.soundOn){
		if($.sound[soundName]!=null){
			$.sound[soundName].stop();
			$.sound[soundName]=null;

			var soundLoopIndex = soundVar.musicPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVar.musicPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function stopSound(){
	Sound.stop();
}

export function toggleSoundInMute(con){
	if(soundVar.soundOn){
		soundVar.soundMute = con;
		for(var n=0; n<soundVar.soundPushArr.length; n++){
			setSoundVolume(soundVar.soundPushArr[n]);
		}
		for(n=0; n<soundVar.soundLoopPushArr.length; n++){
			setSoundLoopVolume(soundVar.soundLoopPushArr[n]);
		}
		setAudioVolume();
	}
}

export function toggleMusicInMute(con){
	if(soundVar.soundOn){
		soundVar.musicMute = con;
		for(var n=0; n<soundVar.musicPushArr.length; n++){
			setMusicVolume(soundVar.musicPushArr[n]);
		}
	}
}

export function setSoundVolume(id, vol){
	if(soundVar.soundOn){
		var soundIndex = soundVar.soundPushArr.indexOf(id);
		if(soundIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVar.soundPushArr[soundIndex]].defaultVol : vol;
			$.sound[soundVar.soundPushArr[soundIndex]].volume = soundVar.soundMute === false ? defaultVol : 0;
			$.sound[soundVar.soundPushArr[soundIndex]].defaultVol = defaultVol;
		}
	}
}

export function setSoundLoopVolume(soundLoop, vol){
	if(soundVar.soundOn){
		var soundLoopIndex = soundVar.soundLoopPushArr.indexOf(soundLoop);
		if(soundLoopIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVar.soundLoopPushArr[soundLoopIndex]].defaultVol : vol;
			$.sound[soundVar.soundLoopPushArr[soundLoopIndex]].volume = soundVar.soundMute === false ? defaultVol : 0;
			$.sound[soundVar.soundLoopPushArr[soundLoopIndex]].defaultVol = defaultVol;
		}
	}
}

export function setMusicVolume(soundLoop, vol){
	if(soundVar.soundOn){
		var musicIndex = soundVar.musicPushArr.indexOf(soundLoop);
		if(musicIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVar.musicPushArr[musicIndex]].defaultVol : vol;
			$.sound[soundVar.musicPushArr[musicIndex]].volume = soundVar.musicMute === false ? defaultVol : 0;
			$.sound[soundVar.musicPushArr[musicIndex]].defaultVol = defaultVol;
		}
	}
}

/*!
 * 
 * PLAY AUDIO - This is the function that runs to play questiona and answer audio
 * 
 */
export function playAudio(audioName, callback){
	if(soundVar.soundOn){
		if(soundVar.audioFile==null){
			soundVar.audioFile = Sound.play(audioName);
			setAudioVolume();

			soundVar.audioFile.removeAllEventListeners();
			soundVar.audioFile.addEventListener ("complete", function() {
				soundVar.audioFile = null;
				
				if (typeof callback == "function")
					callback();
			});
		}
	}
}

export function stopAudio(){
	if(soundVar.soundOn){
		if(soundVar.audioFile != null){
			soundVar.audioFile.stop();
			soundVar.audioFile = null;
		}
	}
}

export function setAudioVolume(){
	if(soundVar.soundOn){
		if(soundVar.audioFile != null){
			soundVar.audioFile.volume = soundVar.soundMute === false ? 1 : 0;
		}
	}
}