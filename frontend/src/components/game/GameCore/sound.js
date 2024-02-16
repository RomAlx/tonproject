////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
import $ from "jquery"
import { Sound } from "createjs-module";

export let soundVars = {
	enableDesktopSound: true, //sound for dekstop
	enableMobileSound : true, //sound for mobile and tablet
	soundOn: false,
	soundMute : true,
	musicMute : true,
	soundID : 0,
	soundPushArr : [],
	soundLoopPushArr : [],
	musicPushArr : [],
	audioFile : null,
}

export function setVarsSound(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (soundVars.hasOwnProperty(name)) {
        soundVars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in sound.js.`);
    }
}

$.sound = {};
export function playSound(soundName, vol){
	if(soundVars.soundOn){
		var thisSoundID = soundVars.soundID;
		soundVars.soundPushArr.push(thisSoundID);
		soundVars.soundID++;

		var defaultVol = vol === undefined ? 1 : vol;
		$.sound[thisSoundID] = Sound.play(soundName);
		$.sound[thisSoundID].defaultVol = defaultVol;
		setSoundVolume(thisSoundID);

		$.sound[thisSoundID].removeAllEventListeners();
		$.sound[thisSoundID].addEventListener ("complete", function() {
			var removeSoundIndex = soundVars.soundPushArr.indexOf(thisSoundID);
			if(removeSoundIndex !== -1){
				soundVars.soundPushArr.splice(removeSoundIndex, 1);
			}
		});
	}
}

export function playSoundLoop(soundName){
	if(soundVars.soundOn){
		if($.sound[soundName]==null){
			soundVars.soundLoopPushArr.push(soundName);

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
	if(soundVars.soundOn){
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
	if(soundVars.soundOn){
		if($.sound[soundName]!=null){
			$.sound[soundName].stop();
			$.sound[soundName]=null;

			var soundLoopIndex = soundVars.soundLoopPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVars.soundLoopPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function playMusicLoop(soundName){
	if(soundVars.soundOn){
		if($.sound[soundName]==null){
			soundVars.musicPushArr.push(soundName);

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
	if(soundVars.soundOn){
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
	if(soundVars.soundOn){
		if($.sound[soundName]!=null){
			$.sound[soundName].stop();
			$.sound[soundName]=null;

			var soundLoopIndex = soundVars.musicPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVars.musicPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function stopSound(){
	Sound.stop();
}

export function toggleSoundInMute(con){
	if(soundVars.soundOn){
		soundVars.soundMute = con;
		for(var n=0; n<soundVars.soundPushArr.length; n++){
			setSoundVolume(soundVars.soundPushArr[n]);
		}
		for(n=0; n<soundVars.soundLoopPushArr.length; n++){
			setSoundLoopVolume(soundVars.soundLoopPushArr[n]);
		}
		setAudioVolume();
	}
}

export function toggleMusicInMute(con){
	if(soundVars.soundOn){
		soundVars.musicMute = con;
		for(var n=0; n<soundVars.musicPushArr.length; n++){
			setMusicVolume(soundVars.musicPushArr[n]);
		}
	}
}

export function setSoundVolume(id, vol){
	if(soundVars.soundOn){
		var soundIndex = soundVars.soundPushArr.indexOf(id);
		if(soundIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVars.soundPushArr[soundIndex]].defaultVol : vol;
			$.sound[soundVars.soundPushArr[soundIndex]].volume = soundVars.soundMute === false ? defaultVol : 0;
			$.sound[soundVars.soundPushArr[soundIndex]].defaultVol = defaultVol;
		}
	}
}

export function setSoundLoopVolume(soundLoop, vol){
	if(soundVars.soundOn){
		var soundLoopIndex = soundVars.soundLoopPushArr.indexOf(soundLoop);
		if(soundLoopIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVars.soundLoopPushArr[soundLoopIndex]].defaultVol : vol;
			$.sound[soundVars.soundLoopPushArr[soundLoopIndex]].volume = soundVars.soundMute === false ? defaultVol : 0;
			$.sound[soundVars.soundLoopPushArr[soundLoopIndex]].defaultVol = defaultVol;
		}
	}
}

export function setMusicVolume(soundLoop, vol){
	if(soundVars.soundOn){
		var musicIndex = soundVars.musicPushArr.indexOf(soundLoop);
		if(musicIndex !== -1){
			var defaultVol = vol === undefined ? $.sound[soundVars.musicPushArr[musicIndex]].defaultVol : vol;
			$.sound[soundVars.musicPushArr[musicIndex]].volume = soundVars.musicMute === false ? defaultVol : 0;
			$.sound[soundVars.musicPushArr[musicIndex]].defaultVol = defaultVol;
		}
	}
}

/*!
 * 
 * PLAY AUDIO - This is the function that runs to play questiona and answer audio
 * 
 */
export function playAudio(audioName, callback){
	if(soundVars.soundOn){
		if(soundVars.audioFile==null){
			soundVars.audioFile = Sound.play(audioName);
			setAudioVolume();

			soundVars.audioFile.removeAllEventListeners();
			soundVars.audioFile.addEventListener ("complete", function() {
				soundVars.audioFile = null;
				
				if (typeof callback == "function")
					callback();
			});
		}
	}
}

export function stopAudio(){
	if(soundVars.soundOn){
		if(soundVars.audioFile != null){
			soundVars.audioFile.stop();
			soundVars.audioFile = null;
		}
	}
}

export function setAudioVolume(){
	if(soundVars.soundOn){
		if(soundVars.audioFile != null){
			soundVars.audioFile.volume = soundVars.soundMute === false ? 1 : 0;
		}
	}
}