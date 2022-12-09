/*
 *                            COPYRIGHT
 *
 *  fsquare2.c
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
// Compile: gcc -lm -o fsquare2 fsquare2.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

int nr, nc, a, b;
int walklen;
char walkstr[132];

void walk( int i, int j, int nstep )
{
  if( nstep==walklen && i==a && j==b ){
    printf("%s\n", walkstr);
    return;}

  if( nstep<walklen ){
    if(i<nc && (nstep ? walkstr[nstep-1]!='l' : 1)){
      walkstr[nstep]='r'; walk(i+1,j,nstep+1);}
    if(i>0  && (nstep ? walkstr[nstep-1]!='r' : 1)){
      walkstr[nstep]='l'; walk(i-1,j,nstep+1);}
    if(j<nr && (nstep ? walkstr[nstep-1]!='d' : 1)){
      walkstr[nstep]='u'; walk(i,j+1,nstep+1);}
    if(j>0  && (nstep ? walkstr[nstep-1]!='u' : 1)){
      walkstr[nstep]='d'; walk(i,j-1,nstep+1);}}
}

/*******************************************************************/

int main( int argc, char *argv[] )
{
  if( argc < 8 ){
    printf("Usage: fsquare2 nc nr x y a b n\n");
    printf("  Generates paths in a finite square lattice from (x,y) to (a,b).\n");
    printf("  fsquare2 does not allow the previous step to be retraced.\n");
    printf("  Result is printed to stdout.\n");
    printf("  nc = number of columns\n");
    printf("  nr = number of rows\n");
    printf("  x = 0,1,...,nc-1\n");
    printf("  y = 0,1,...,nr-1\n");
    printf("  a = 0,1,...,nc-1\n");
    printf("  b = 0,1,...,nr-1\n");
    printf("  n = path length < 128\n");
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

  walklen = atoi( argv[7] );
  if(walklen>128){ printf("Invalid value: pl = %d\n", walklen); return(-1);}

  walkstr[0]='\0';
  walkstr[walklen]='\0';
  walk(x, y, 0);
  return(0);
}
