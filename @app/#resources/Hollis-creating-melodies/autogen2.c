/*
 *                            COPYRIGHT
 *
 *  autogen2.c
 *  Copyright (C) 2013-2018 Exstrom Laboratories LLC
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  A copy of the GNU General Public License is available on the internet at:
 *  http://www.gnu.org/copyleft/gpl.html
 *
 *  or you can write to:
 *
 *  The Free Software Foundation, Inc.
 *  675 Mass Ave
 *  Cambridge, MA 02139, USA
 *
 *  Exstrom Laboratories LLC contact:
 *  stefan(AT)exstrom.com
 *
 *  Exstrom Laboratories LLC
 *  Longmont, CO 80503, USA
 *
 */
/*  Compile: gcc -lm -o autogen2 autogen2.c */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

#define MAXLINE 512
#define MAXBUFF 64

typedef struct {
  char name;     // state name (single character)
  int nt;        // number of transitions
  char **a;      // transition outputs
  int *s;        // transition states
} Tstate;

typedef struct {
  int ns;        // number of states
  Tstate *state; // list of states
} Tautomaton;

Tautomaton aut;
char **aout;   // automaton output
int nstep;     // number of steps to take
int nes;       // number of end states
int *endstate; // list of end states

int ReadAutomaton(char *filename)  // read the automaton file
{
  FILE *fp;
  size_t nline=MAXLINE;
  size_t len;
  char *line = (char *)malloc(MAXLINE*sizeof(char));
  char buff[MAXBUFF];
  int c,ns,nt;
  int i,j,k,l;
 
  fp = fopen(filename, "r");
  if(fp == NULL){
    printf("Error: cannot open %s\n", filename);
    return(0);}
  fscanf(fp,"%d\n",&ns); // number of states
  aut.ns = ns;
  aut.state = (Tstate *)malloc(ns*sizeof(Tstate));

  for(i=0; i<ns; ++i){
    fscanf(fp, "%d", &j);
    if(j != i) printf("Warning: out of order state %d", j);
    fgets(line, nline, fp);
    len = strlen(line);
    for(j=0, nt=0; j<len; ++j)
      if(line[j] == '(') ++nt;
    aut.state[i].nt = nt;
    aut.state[i].a = (char **)malloc(nt*sizeof(char *));
    aut.state[i].s = (int *)malloc(nt*sizeof(int));
    for(j=0, k=0; j<nt; ++j){
      while(isspace(line[k])) ++k;
      if(line[k]!='(') return(0);
      for(++k, l=0; line[k]!=',' && l<MAXBUFF; ++l, ++k) buff[l] = line[k];
      if(l==MAXBUFF) return(0); else buff[l] = '\0';
      aut.state[i].s[j] = atoi(buff);
      for(++k, l=0; line[k]!=')' && l<MAXBUFF; ++l, ++k) buff[l] = line[k];
      if(l==MAXBUFF) return(0); else buff[l] = '\0';
      aut.state[i].a[j] = strdup(buff);
      ++k;}}

  fclose(fp);
  free(line);
  return(1);
}

void step(int istate, int istep)
{
  int i,j;

  if(istep == nstep){
    for(i=0; i<nes; ++i)
      if(istate == endstate[i]){
	for(j=0; j<nstep; ++j) printf("%s", aout[j]);
	printf("\n");
	break;}
    return;}

  if(istep < nstep){
    for(i=0; i<aut.state[istate].nt; ++i){
      aout[istep]=aut.state[istate].a[i];
      step(aut.state[istate].s[i], istep+1);}}
}

int main( int argc, char *argv[] )
{
  if( argc < 5 ){
      printf( "Usage: %s file.aut2 n s e1 e2 ...\n", argv[0] );
      printf( "  Generates all words of a given length accepted by an automaton.\n" );
      printf( "  Result is printed to stdout.\n" );
      printf( "  file.aut2  = automaton input file\n" );
      printf( "  n = length of words\n" );
      printf( "  s = start state\n" );
      printf( "  ei = end state i\n" );
      exit( -1 );}

  if( ReadAutomaton(argv[1]) == 0 ){
      perror( "Error reading automaton file.\n" );
      return(-1);}

  int i;
  nstep = atoi(argv[2]);
  int start = atoi(argv[3]);
  aout = (char **)malloc(nstep*sizeof(char*));
  nes = argc - 4; // number of endstates
  endstate = (int *)malloc(nes*sizeof(int));
  for(i=0; i<nes; ++i) endstate[i]=atoi(argv[4+i]);
  step(start,0);
  return(0);
}
