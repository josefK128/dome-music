# Dome-music generative music framework

## Methodology & Workflow

### resources
    Create abc notation instances in @scale or @ctpt with tonic C (middle-c)
    @app/scale/C2transpose creates {D,E,F,G,A,B}-transpositions (abc notation)

### check
    Ensure that @/@genome is no longer active - move vital files to phenome
    @app/utils/midi2ph copies @/@genome/midi to @/<genre>/<project>/midi
    @app/utils/source2ph copies @/@genome/source to @/<genre>/<project>/source
    @app/utils/g2ph copies @/@genome/* to @/<genre>/<project>/*

### preparation 
    @app/utils/createphtrack creates @/<genre>/<project>/track (min. phenome)
    @app/utils/createphtree creates @/<genre>/<project>/* (max. phenome)
    @app/utils/initg cleans @/@genome/* and initializes @/@genome/axiom/.aut
    @app/utils/ph2g initializes @/@genome/ with @/<genre>/<project>/*

### genome
    Select and copy @axiom/.aut (.str,.mid) -> @/@genome/axiom (str,mid)
    @app/melody/aut2seq: axiom/.aut -> seq/.seq
    @app/melody/seq2str: seq/.seq -> str/.str
    @app/melody/str2abc: str/.str -> abc/{k.abc}
                                     str/{k.str}
    @app/melody/str2abc-single: str/.str -> abc/.abc
    @app/melody/set-abcfile-MIDIprogram: abc/.abc -> abc/.abc
    @app/time-pitch/time-pitch-abc: abc/.abc -> abc/.abc 
    @app/melody/abc2midi: abc/*.abc -> midi/*.mid (corrects %MIDI -> %%MIDI)

### g -> ph    
    @app/utils/midi2ph copies @/@genome/midi to @/<genre>/<project>/midi
    @app/utils/source2ph copies @/@genome/source to @/<genre>/<project>/source
    @app/utils/g2ph copies @/@genome/* to @/<genre>/<project>/*

### phenome
    Musescore: @/<genre>/<project>/midi/.mid -> @/<genre>/<project>/midi/.mid 
    [*compose]                                  @/<genre>/<project>/score/.pdf 
                                                @/<genre>/<project>/source/.wav 
                                                @/<genre>/<project>/track/.wav 
                                                @/<genre>/<project>/track/.mp3
    Aiva: @/<genre>/<project>/midi/.mid -> @/<genre>/<project>/source/.wav 
                                           @/<genre>/<project>/track/.wav 

    performance, CD, vinyl: -> @/<genre>/<project>/source/.wav 

    @app/time-pitch/time-pitch: @/<genre>/<project>/source/.wav -> 
                                               @/<genre>/<project>/source/.wav 
                                               @/<genre>/<project>/track/.wav 
    ec2: @/<genre>/<project>/source/.wav -> @/<genre>/<project>/source/.wav 
                                            @/<genre>/<project>/track/.wav 
    isse: @/<genre>/<project>/source/.wav -> @/<genre>/<project>/source/.wav 
                                             @/<genre>/<project>/track/.wav 

    waveform/Novum: @/<genre>/<project>/source/.wav -> 
    [*compose]                               @/<genre>/<project>/source/.wav 
                                             @/<genre>/<project>/track/.wav 
