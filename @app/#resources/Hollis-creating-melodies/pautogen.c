/*
 *                            COPYRIGHT
 *
 *  pautogen.c
 *  Copyright (C) 2013-2020 Exstrom Laboratories LLC
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
/*  Compile: gcc -lm -o pautogen pautogen.c */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

#define MAXLINE 65536
#define MAXBUFF 128

typedef struct {
  char name;     // state name (single character)
  int nt;        // number of transitions
  char **a;      // transition outputs
  int *s;        // transition states
  double *p;     // transition probabilities
} Tstate;

typedef struct {
  int ns;        // number of states
  Tstate *state; // list of states
} Tautomaton;

Tautomaton aut;

int ReadAutomaton(char *filename)  // read the automaton file
{
  FILE *fp;
  size_t nline=MAXLINE;
  size_t len;
  char *line;
  char buff[MAXBUFF];
  int c,ns,nt;
  int i,j,k,l;
 
  fp = fopen(filename, "r");
  if(fp == NULL){
    printf("Error: cannot open %s\n", filename);
    return(0);}

  line = (char *)malloc(MAXLINE*sizeof(char));
  if(line == NULL){
    printf("Error: cannot allocate memory\n", filename);
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
    aut.state[i].p = (double *)malloc(nt*sizeof(double));
    for(j=0, k=0; j<nt; ++j){
      while(isspace(line[k])) ++k;
      if(line[k]!='(') return(0);
      for(++k, l=0; line[k]!=',' && l<MAXBUFF; ++l, ++k) buff[l] = line[k];
      if(l==MAXBUFF) return(0); else buff[l] = '\0';
      aut.state[i].s[j] = atoi(buff);
      for(++k, l=0; line[k]!=',' && l<MAXBUFF; ++l, ++k) buff[l] = line[k];
      if(l==MAXBUFF) return(0); else buff[l] = '\0';
      aut.state[i].a[j] = strdup(buff);
      for(++k, l=0; line[k]!=')' && l<MAXBUFF; ++l, ++k) buff[l] = line[k];
      if(l==MAXBUFF) return(0); else buff[l] = '\0';
      aut.state[i].p[j] = strtod(buff,NULL);
      ++k;}}

  fclose(fp);
  free(line);
  return(1);
}

void step(int start, int nstep)
{
  int i, j, is;
  double u, x;

  for(i=0, is=start; i<nstep; ++i){
    u = (double)rand()/RAND_MAX;
    for(j=0, x=0.0; j<aut.state[is].nt; ++j){
      x += aut.state[is].p[j];
      if(u < x){
	printf("%s",aut.state[is].a[j]);
	is = aut.state[is].s[j];
        break;}}}
  printf("\n");
}

int main( int argc, char *argv[] )
{
  if( argc < 5 ){
    printf( "Usage: %s file.pat n s seed\n", argv[0] );
    printf( "  Generates words of a given length accepted by a probabilistic\n" );
    printf( "  automaton. Result is printed to stdout.\n" );
    printf( "  file.pat  = probabilistic automaton file\n" );
    printf( "  n = length of words\n" );
    printf( "  s = start state\n" );
    printf( "  seed = random number seed [0..4294967295]\n" );
    exit( -1 );}

  if(ReadAutomaton(argv[1])==0){
    printf("Error reading automaton file\n");
    return(1);}

  int nstep = atoi(argv[2]);
  int start = atoi(argv[3]);
  unsigned int seed = (unsigned int)strtoul(argv[4], NULL, 10);
  srand(seed);
  step(start, nstep);
  return(0);
}
