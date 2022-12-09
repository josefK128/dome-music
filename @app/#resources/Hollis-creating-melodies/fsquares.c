/*
 *                            COPYRIGHT
 *
 *  fsquares.c
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
// Compile: gcc -lm -o fsquares fsquares.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

int nr, nc, a, b;
int maxstop, walklen;
char walkstr[132];

void walk( int i, int j, int nstop, int nstep )
{
  if( nstep==walklen && i==a && j==b ){
    printf("%s\n", walkstr);
    return;}

  if( nstep < walklen ){
    if(nstop<maxstop){walkstr[nstep]='s'; walk(i,j,nstop+1,nstep+1);}
    if(i<nc){walkstr[nstep]='r'; walk(i+1,j,0,nstep+1);}
    if(i>0){walkstr[nstep]='l'; walk(i-1,j,0,nstep+1);}
    if(j<nr){walkstr[nstep]='u'; walk(i,j+1,0,nstep+1);}
    if(j>0){walkstr[nstep]='d'; walk(i,j-1,0,nstep+1);}}
}

/*******************************************************************/

int main( int argc, char *argv[] )
{
  if( argc < 9 ){
    printf("Usage: fsquares nc nr x y a b s n\n");
    printf("  Generates paths in a finite square lattice from (x,y) to (a,b).\n");
    printf("  Walk is allowed to stop at a point for a number of steps.\n");
    printf("  Result is printed to stdout.\n");
    printf("  nc = number of columns\n");
    printf("  nr = number of rows\n");
    printf("  x = 0,1,...,nc-1\n");
    printf("  y = 0,1,...,nr-1\n");
    printf("  a = 0,1,...,nc-1\n");
    printf("  b = 0,1,...,nr-1\n");
    printf("  s = 0,1,... = number of stop steps allowed\n");
    printf("  n = walk length < 128\n");
    exit( -1 );}

  int x, y;

  nc = atoi( argv[1] );
  --nc; // index of max col
  nr = atoi( argv[2] );
  --nr; // index of max row

  x = atoi( argv[3] );
  if(x>nc || x<0){ printf("Invalid value: x = %d\n", x); return(-1);}
  y = atoi( argv[4] );
  if(y>nr || y<0){ printf("Invalid value: y = %d\n", y); return(-1);}

  a = atoi( argv[5] );
  if(a>nc || a<0){ printf("Invalid value: a = %d\n", a); return(-1);}
  b = atoi( argv[6] );
  if(b>nr || b<0){ printf("Invalid value: b = %d\n", b); return(-1);}

  maxstop = atoi( argv[7] );
  if(maxstop < 0){ printf("Invalid value: s = %d\n", maxstop); return(-1);}

  walklen = atoi( argv[8] );
  if(walklen > 128){ printf("Invalid value: n = %d\n", walklen); return(-1);}

  walkstr[walklen]='\0';
  walk(x, y, 0, 0);
  return(0);
}
