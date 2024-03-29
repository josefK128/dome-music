# @app/melody/*.js - genome processing: axiom -> {abc,midi}

### aut2seq
    dome-music> npm run aut2seq autfilename seqfilename melodylength  nselections startState endStates

    process.chdir('@/@genome') => paths are ./axiom and ./seq resp.
    Select a subset of finite automaton generated melodies and record them 
    in a file of state sequences used for melody - seq/<seqfile>.seq.

    There are two runs within the application:
    The first is to use wc to get the number of melodies generated by the fa.
    The second is to extract a subset of the melodies produced by the fa.


### seq2str
    dome-music> npm run seq2str seqfile strfile scaletype sclfile rhythmtype rmfile nrepeats
    NOTE: seqfile is at @/@genome/seq/<seqfile>
    NOTE: strfile is at @/@genome/str/<strfile>
    NOTE: sclfile is at ./@scale/<scaletype>/<sclfile>
    NOTE: rmfile is at ./@scale/<rhythmtype>/<rmfile>
    read integer sequences representing abstract melodies.
    creates .str-file containing the supplied data and writes to @genome/str.


### str2abc
    dome-music> npm run str2abc strfile abcfile midiprogram key bpm unitnote   
    reads .str-file containg melody, scale and rhythm data, and cmdline
    arguments, used to create a .abc-file written to @genome/abc
    process.chdir('@/@genome') => paths are './str/' and './abc/' resp.

    key signature notes:
    key should ALMOST ALWAYS be'none'!!!
    Then all accidentals are written into the score

    For rare case where no accidentals are desired use key-sig:
    'b' indicates flat - i.e Eb is E-flat major
    '#' indicates sharp - i.e 'C# is C# major
    'm' indicates minor
    Thus Ebm is E-flat minor
    Thus C#m is C# minor
    variations are indicated by 2 symbols - K:Am g# is A harmonic minor
    K:Am f# g# is A melodic minor
    modes: append the full name or first 3 letters:
    Thus C#Aeolian or c#AEO  is C#-Aeolian 
    Thus C#Dorian or c#DOR  is C#-Dorlian 
    Thus C#Phrygian or c#PHR  is C#-Phrygian 
    Thus C#Lydian or c#LYD  is C#-Lydian 
    Thus C#Mixolydian or c#MIX  is C#-Mixolydian 
    Thus C#Aeolian or c#AEO  is C#-Aeolian
    Thus C#Locrian or c#LOC  is C#-Locrian

### abc2midi
    dome-music> npm run abc2midi [abcfile midifile]
    If abcfile and midifile are given, converts .abc-file to midi-file
    If abcfile and midifile are omitted, converts /abc/*.abc to midi/*.midi

