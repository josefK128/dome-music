# @app/melody/*.js

### aut2seq
    usage: npm run aut2seq autfilename seqfilename melodylength  nselections startState endStates

    If executed from @/@genome directory the paths are ./axiom and ./seq resp.
    Select a subset of finite automaton generated melodies and record them 
    in a file of state sequences used for melody - seq/<seqfile>.seq.

    There are two runs within the application:
    The first is to use wc to get the number of melodies generated by the fa.
    The second is to extract a subset of the melodies produced by the fa.
