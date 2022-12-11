# dome-music @scales

### procedure
    for a new scaletype create a directory @scales/<scaletype>
    Then in the new directory create a new abc .abc-file (exp 'pentatonic')
    C-<scalename>.abc from @scale/C-template.abc (exp. 'C-minor.abc')
    NOTE:the T-field (title) should be abctype-abcname (2 args to C2transpose)
    The scale should use tonic 'C' (abc-notation for middle C)
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


