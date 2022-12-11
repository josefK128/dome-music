# @app/utils/*.js - utility scripts for managing @/@genome and phenome 


### createphtrack 
    dome-music> npm run createphtrack <genre> <project> 
    creates minimal phenome directory tree @/<genre>/<project>/track

### createphtree 
    dome-music> npm run createtree <genre> <project>
    creates phenome directory tree @/<genre>/<project>/track
                                                      /axiom
                                                      /seq
                                                      /str
                                                      /abc
                                                      /midi
                                                      /score
                                                      /source


### g2ph
    dome-music> npm run g2ph <genre> <project>
    copies @/@genome/<all dirs> to @/<genre>/<project>/<all dirs> 
    (overwrites!!)
    and makes a directory in @/<genre>/<project> 
    if it doesn't already exist.


### initg
    dome-music> npm run initg autfilename
    (the directories below are assumed to already exist)
    empties @/@genome/axiom
                     /seq
                     /str
                     /abc
                     /midi
                     /score
                     /source
    Then <autfile> is copied to @/@genome/axiom.


### midi2ph
    dome-music> npm run midi2ph <genre> <project>
    copies @/@genome/midi/* to @/<genre>/<project>/midi/*


### ph2g
    dome-music> npm run ph2g <genre> <project>
    First empties all directories in @/@genome and then copies all files 
    from dirs axiom, seq, str, abc, midi and source in @/<genre><project>
    to the corresponding directories in @genome


### source2ph
    dome-music> npm run source2ph <genre> <project>
    copies @/@genome/source/* to @/<genre>/<project>/source/*


