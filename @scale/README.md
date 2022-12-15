# dome-music @scales

### procedure
    for a new scaletype create a directory @scales/<scaletype>.
    Then in the new directory create a new .abc-file C-<scalename>.abc
    from @scale/C-template.abc (exp. '@scale/<scltype>/C-minor.abc')
    The scale should use tonic 'C' (abc-notation for middle C)
    NOTE:the T-field (title) should be scltype-sclname (2 args to C2transpose)
    Then the npm script C2tranpose can be used to create
    tranpositions by 2,4,5,7,9 and 11 semitones.
    This will produce files <scltype>/D-<sclname>.abc
                            <scltype>/E-<sclname>.abc
                            <scltype>/F-<sclname>.abc
                            <scltype>/G-<sclname>.abc
                            <scltype>/A-<sclname>.abc
                            <scltype>/B-<sclname>.abc
    For example, with abctype='pentatonic' and abcname='minor produces
                            pentatonic/D-minor.abc
                            pentatonic/E-minor.abc
                            pentatonic/F-minor.abc
                            pentatonic/G-minor.abc
                            pentatonic/A-minor.abc
                            pentatonic/B-minor.abc


    NOTE: abc2abc.exe must remain in @scale since @app/scale/C2transpose.js
    uses process.chdir('@scale') so when exec is called for abc2abc the script
    looks for abc2abc.exe in @scale rather than in root directory.
