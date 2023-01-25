# Dome-music generative music framework

## Methodology & Workflow
   ```@app/audio
   @app/melody
   @app/rhythm
   @app/scale
   @app/time-pitch
   @app/utils```



### resources
    [1] hand-create abc-instances in @scale or @ctpt with tonic C (middle-c)
    [2] create {D,E,F,G,A,B}-transpositions (abc notation):
    @app/scale/C2transpose 
    [3] convert {0,1}-rhythm sequence to integer 'interval' sequnce needed for @app/melody/seq2str:
    @app/rhythm/b2int 
    [4] play wav-file: @app/audio/playwav


### check
    Ensure that @/@genome is no longer active - move vital files to phenome
    [1a] @app/utils/midi2ph copies @/@genome/midi to @/<genre>/<project>/midi
    [1b] @app/utils/source2ph copies @/@genome/source to @/<genre>/<project>/source
    [2] @app/utils/g2ph copies @/@genome/* to @/<genre>/<project>/*


### preparation 
    [1] @app/utils/createphtrack creates @/<genre>/<project>/track (min. phenome)
    [2] @app/utils/createphtree creates @/<genre>/<project>/* (max. phenome)
    [3] @app/utils/initg cleans @/@genome/* and initializes @/@genome/axiom/.aut
    [4] @app/utils/ph2g initializes @/@genome/ with @/<genre>/<project>/*


### genome
    [1] Select and copy @axiom/.aut (.str,.mid) -> @/@genome/axiom (str,mid)
    [2] @app/melody/aut2seq: axiom/.aut -> seq/.seq
    [3] @app/melody/seq2str: seq/.seq -> str/.str
    [4a] @app/melody/str2abc: str/.str -> abc/{k.abc}
                                         str/{k.str}
    [4b] @app/melody/str2abc-single: str/.str -> abc/.abc
    [5] @app/time-pitch/time-pitch-abc: abc/k.abc -> abc/k.abc 
    [6] @app/melody/set-abcfile-MIDIprogram: abc/.abc -> abc/.abc
    
    [7a] @app/melody/abc2mid: abc/{k.abc} -> mid/{k.mid} - play using EasyABC
    [7b] @app/melody/abc2str-single: abc/k.abc -> mid/k.mid (also corrects %MIDI -> %%MIDI)



### g -> ph    
    [1a] @app/utils/midi2ph copies @/@genome/midi to @/<genre>/<project>/midi
    [1b] @app/utils/source2ph copies @/@genome/source to @/<genre>/<project>/source
    [2] @app/utils/g2ph copies @/@genome/* to @/<genre>/<project>/*


### phenome
    [1a] EasyABC: @/<genre>/<project>/abc/.abc -> @/<genre>/<project>/midi/.mid 
                 @/<genre>/<project>/score/.pdf  @/<genre>/<project>/score/.pdf 
    [*compose] 
    [1b] MuseScore: @/<genre>/<project>/midi/.mid -> @/<genre>/<project>/source/.wav 
    [*convert midi to wav/mp3 ONLY]          

    [2] Aiva: @/<genre>/<project>/midi/.mid -> @/<genre>/<project>/midi/.mid
                                           @/<genre>/<project>/track/.mp3(.wav) 


    [3] performance, CD, vinyl:
    audio -> @/<genre>/<project>/source/.wav 

    [4] @app/time-pitch/time-pitch: @/<genre>/<project>/source/.wav -> audio

    [5] ec2: @/<genre>/<project>/source/.wav -> @/<genre>/<project>/source/.wav 

    [6] isse: @/<genre>/<project>/source/.wav -> @/<genre>/<project>/source/.wav 


    [7a] Waveform/Novum: midi -> Novum -> Waveform -> @/<genre>/<project>/track/.wav 
    [7b] Waveform/Novum: Waveform -> Waveform -> @/<genre>/<project>/track/.wav 
    [*compose]                              
