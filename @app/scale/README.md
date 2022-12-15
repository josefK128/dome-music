# @app/@scale/C2transpose.js - create {D,E,F,G,A,B} tonic scales from C-scale

### Usage 
    dome-music> npm run C2transpose scltype sclname 
    NOTE: <scltype> can consist of a relative path of directories from @scale.
    From <scltype>/<sclname>(C) creates scale-files transposed by 2,4,5,7,9 and 11 semitones.
    These are named <scltype>/<sclname>(C replaced by transposed tonic)
    Therefore the base <sclfile> in C is transposed to D,E,F,G,A and B
    Exp: npm run C2transpose pentatonic/minor C.abc  produces
                             pentatonic/minor/D.abc
                             pentatonic/minor/E.abc
                             pentatonic/minor/F.abc
                             pentatonic/minor/G.abc
                             pentatonic/minor/A.abc
                             pentatonic/minor/B.abc


