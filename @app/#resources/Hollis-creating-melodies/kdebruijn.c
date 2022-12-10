/*
 *                            COPYRIGHT
 *
 *  kdebruijn.c
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
// Compile: gcc -lm -o kdebruijn kdebruijn.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

int k; // number of symbols, 2,3,4,...
int n; // sequence order 2,3,4,...
int nv; // number of vertices
int ls; // length of sequence
int *vec; // vertex edge count
int *cvl; // cycle vertex list

int cycle(int i0)
{
  int clen = 1; // minimum edge count cycle length
  int i1,i2;

  cvl[0] = i0;
  i1 = (k*i0) % nv + vec[i0];
  ++vec[i0];
  cvl[1] = i1;
  while(i1 != i0){
    ++clen;
    i2 = (k*i1) % nv + vec[i1];
    ++vec[i1];
    cvl[clen] = i2;
    i1 = i2;}
  return(clen);
}

int main( int argc, char *argv[] )
{
  if(argc < 4)
    {
      printf("Usage: %s k n v\n", argv[0]);
      printf("  Generates a de Bruijn sequence for k symbols of order n.\n");
      printf("  A different sequence is generated for v = 0 to k^(n-1)-1.\n");
      exit(-1);
    }

  int i,j;
  int is0, is1;
  int v0, clen0, clen1;
  k = atoi(argv[1]);
  n = atoi(argv[2]);
  for(i=1, nv=1; i<n; ++i) nv*=k;
  ls = k*nv; // length of sequence
  v0 = atoi(argv[3]);
  vec = calloc(nv, sizeof(int));
  cvl = calloc(ls, sizeof(int));
  unsigned char *seq = calloc(ls,sizeof(unsigned char));

  is0 = 0;
  is1 = ls;
  i = 0;
  while(i < ls){
    clen0 = cycle(v0);
    clen1 = 0;
    i += clen0;
    for(j=1; j<clen0; ++j)
      if(vec[cvl[j]]<k){
	v0 = cvl[j];
	clen1 = clen0 - j;
	clen0 = j;
	break;}
    //    printf("%d %d\n", clen0, clen1);
    for(j=0; j<clen0; ++j)
      seq[is0+j] = (unsigned char)(cvl[j+1] - (k*cvl[j]) % nv);
    is0 += clen0;
    is1 -= clen1;
    for(j=0; j<clen1; ++j)
      seq[is1+j] = (unsigned char)(cvl[clen0+j+1] - (k*cvl[clen0+j]) % nv);
  }
  
  for(j=0; j<ls; ++j)
    printf("%c", '0'+seq[j]);
  printf("\n");

  return(0);
}
