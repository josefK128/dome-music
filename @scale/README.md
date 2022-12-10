# dome-music @scales

### procedure
    for a new scaletype create a directory @scales/<scaletype>
    Then in the new directory create a new abc .scl-file (exp 'pentatonic')
    C-<scalename>.scl from @scale/C-template.scl (exp. 'C-minor.scl')
    NOTE:the T-fiels (title) should be scltype-sclname (2 args to C2transpose)
    The scale should use tonic 'C' (abc-notation for middle C)
    Then the npm script scl2tranpose can be used to create
    tranpositions by 2,4,5,7,9 and 11 semitones.
    This will produce files <scltype>/D-<sclname>
                            <scltype>/E-<sclname>
                            <scltype>/F-<sclname>
                            <scltype>/G-<sclname>
                            <scltype>/A-<sclname>
                            <scltype>/B-<sclname>
    For example, with scltype='pentatonic' and sclname='minor produces
                            pentatonic/D-minor
                            pentatonic/E-minor
                            pentatonic/F-minor
                            pentatonic/G-minor
                            pentatonic/A-minor
                            pentatonic/B-minor


