/*
 *                            COPYRIGHT
 *
 *  str2abc.c
 *  Copyright (C) 2017-2018 Exstrom Laboratories LLC
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
// Compile: gcc -lm -o str2abc2 str2abc2.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <ctype.h>
#define MAXBUF 16384

/***********************************************************************************/

int main(int argc, char *argv[])
{
  if( argc < 5 ){
    printf("\nUsage: %s file.str inst key tempo unit\n", argv[0]);
    printf("  Converts strings in a file into abc notation.\n");
    printf("  Result is printed to stdout.\n");
    printf("  file.str = input file\n");
    printf("  inst = MIDI instrument (program) number\n");
    printf("  key = musical key, e.g. C\n");
    printf("  tempo = beats per minute, e.g. 180\n");
    printf("  unit = unit note length, e.g. 1/4 is a quarter note\n");
    return(-1);}

  FILE *fp = fopen(argv[1],"r");
  if(fp == NULL){
    printf("Error opening %s\n", argv[1]);
    return(1);}

  int inst = atoi(argv[2]);
  char *key = strdup(argv[3]);
  int tempo = atoi(argv[4]);
  char *unit = strdup(argv[5]);
  char buff[MAXBUF];
  char *nstr; // note string pointer
  char *rstr; // rhythm string pointer
  int nn, r, ir, ln, lr, i, j, inote, it;
  char t;

  printf("X: 1\n");
  fgets(buff,MAXBUF,fp); // read title
  printf("T: %s", buff);
  fgets(buff,MAXBUF,fp); // read composer
  printf("C: %s", buff);
  fgets(buff,MAXBUF,fp); // read transcriber
  printf("Z: %s", buff);
  printf("M: 4/4\n");
  printf("K: %s\n", key);
  printf("Q: %d\n", tempo);
  printf("L: %s\n", unit);
  printf("%%%MIDI program %d\n", inst);

  fscanf(fp,"%d", &nn);
  char **note = (char **)malloc(nn*sizeof(char *));
  for(i = 0; i<nn; ++i){
    fscanf(fp,"%s",buff);
    note[i]=strdup(buff);}
  fgetc(fp);

  while(fgets(buff,MAXBUF,fp)){
    for(i = 0; isblank(buff[i]); ++i);
    nstr = buff+i;
    for(;isalnum(buff[i]); ++i);
    buff[i++] = '\0';
    for(;isblank(buff[i]); ++i);
    rstr = buff+i;
    for(;isalnum(buff[i]); ++i);
    buff[i++] = '\0';
    r = atoi(buff+i);
    ln = strlen(nstr);  // length of note string
    lr = strlen(rstr);  // length of rhythm string
    for(ir=0; ir<r; ++ir){
      for(i=0, j=0; i<ln; ++i, ++j){
	if(isdigit(nstr[i]))
	  inote = (nstr[i] - '0') % nn;
	else if(islower(nstr[i]))
	  inote = (nstr[i] - 'a' + 10) % nn;
	else if(isupper(nstr[i]))
	  inote = (nstr[i] - 'A' + 36) % nn;
	else
	  inote = 0;
	t = rstr[j % lr];
	if(isdigit(t))
	  it = t - '0';
	else if(islower(t))
	  it = t - 'a' + 10;
	else if(isupper(t))
	  it = t - 'A' + 36;
	else
	  it = 0;
	printf("%s%1d", note[inote], it);}}
    printf("\n");}
  return(0);
}
