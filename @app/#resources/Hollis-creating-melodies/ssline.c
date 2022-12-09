/*
 *                            COPYRIGHT
 *
 *  ssline.c
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
// Compile: gcc -lm -o ssline ssline.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <time.h>

int main( int argc, char *argv[] )
{
  if( argc < 3 )
    {
      printf("Usage: %s n m\n", argv[0]);
      printf("  Prints a random subset of the first n lines read from stdin.\n");
      printf("  The size of the subset is m. All subsets of size m have the\n");
      printf("  same probability. Result is printed to stdout.\n");
      printf("  n = number of lines to read from stdin\n" );
      printf("  m = subset size to sample\n" );
      exit( -1 );
    }

  int p;
  int np, n = atoi(argv[1]);
  int mp, m = atoi(argv[2]);
  int i, j, k;
  int c;
  
  srand(time(0));

  for(mp=m, np=n, i=0; mp>0; --np){
    p = mp*(RAND_MAX/np);
    if(rand() < p){
      k = n-np;
      --mp;
      while(i < k){
	c=getc(stdin);
        while(c!='\n' && c!=EOF) c=getc(stdin);
        ++i;}
      c=getc(stdin);
      while(c!='\n' && c!=EOF){
	putc(c,stdout);
	c=getc(stdin);}
      putc(c,stdout);
      ++i;}}

  return(0);
}
