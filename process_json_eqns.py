def process_json_eqns(data):
  import json
  import math

  from sympy.interactive import printing
  printing.init_printing(use_latex = True)

  import numpy as np
  import sympy as sp

  m = len(data['analyzeResult']['readResults'][0]['lines'])
  j = 0

  n = len(data['analyzeResult']['readResults'][0]['lines'][j]['words'])

  text = []
  text1 = []
  coordinates = []
  angles = [] # measured in radians

  while j < m:
    data1 = data['analyzeResult']['readResults'][0]['lines'][j]
    text.append(data1['text'])
    coordinates.append(data1['boundingBox'])
    text1.append(data1['text'])

    n = len(data['analyzeResult']['readResults'][0]['lines'][j]['words'])
    i=0
    integers = []

    for string in data1['boundingBox']:
      integers.append(int(string))
    if integers[1] == integers[3]:
      dydx = 0
    else:
      dydx = (integers[2]-integers[4])/(integers[1]-integers[3])
    angles.append(math.atan(dydx))


    while i < n:
      data2 = data1['words']
      text.append(data2[i]['text'])

      coordinates.append(data2[i]['boundingBox'])
      i+=1

    j+=1

  text2 = ''
  for item in text1:
    text2 = text2 + item + '\n'

  text3 = []

  for item in text1:
    previous_letter = ''
    word = ''
    new = ''
    for letter in item:
      if letter.isdigit() == 1 and previous_letter.isalpha() == True:
        new = new + '^' + letter
      else:
        new = new + letter
      previous_letter = letter
    word = word + new
    text3.append(word)
  text4 = ''

  for item in text3:
    text4 = text4+ item + '\n'

  #print(text)
  #print(text1)
  #print(text2)
  #print(text3)
  #print(text4)
  #display(coordinates)
  #print(angles) # print angles in degrees
  angles_degrees = []
  for item in angles:
    angles_degrees.append(math.degrees(item)) # print angles in degrees
  #print(angles_degrees)

  return text4 
