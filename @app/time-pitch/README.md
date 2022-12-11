# @app/time-pitch/*.js  - time-dilation & pitch-shift
# time-pitch

## Usage
    dome-music> npm run time-pitch [wavpath]
    If wavpath is included sf will be copied to @app/time-pitch/track.wav
    If wavpath omitted the existing  @app/time-pitch/track.wav is used as sf
  
    opens Chrome with constant url to time-pitch process 
    NOTE: url is localhost:8081/@app/time-pitch/index.html. 
    NOTE: The wav-file used is ALWAYS @app/time-pitch/track.wav
    NOTE: The processed sf is played as audio (so must be recorded)
   

### Procedure
    run server: 
    dome-music> npm run live-server

    run script:
    dome-music> npm run time-pitch [wavpath]
    Launches app url - localhost:8081/@app/time-pitch/index.html. 

    click 'START' (processing will be performed on track.wav) 

    Interactively test time-dilations using slider (.5 to 2.0) 

    Interactively test pitch-shift using + and - (+-octave). 

    Use 'play' and 'pause' buttons.

    Record processed audio track through mixer to Turandot (exp.)



# time-pitch-abc    

## Usage
    dome-music> npm run time-pitch-abc abcfile tpfile double||half aor n 
    Must include the .abc-ext in abcfile and tpfile
    From <abcfile> creates time-pitch processed <tpfile> (.abc)
    arguments are one of 'double' - time dilate by 2.0*duration of all notes
                         'half' - time dilate by 0.5*duration of all notes
                         'double n' tdilate by 2.0 and transpose by n semitones
                         'half n' tdilate by 0.5 and transpose by n semitones
                         'n' transpose by n semitones

