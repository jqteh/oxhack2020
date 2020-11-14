import json

data = '{"status":"succeeded","createdDateTime":"2020-11-14T16:38:10Z","lastUpdatedDateTime":"2020-11-14T16:38:11Z","analyzeResult":{"version":"3.0.0","readResults":[{"page":1,"angle":-0.0396,"width":2976,"height":3968,"unit":"pixel","language":"en","lines":[{"boundingBox":[813,901,1710,876,1711,995,813,1024],"text":"xt y = 3","words":[{"boundingBox":[872,900,1127,897,1120,1019,863,1024],"text":"xt","confidence":0.564},{"boundingBox":[1193,896,1316,892,1310,1012,1186,1017],"text":"y","confidence":0.986},{"boundingBox":[1423,889,1547,884,1542,1001,1418,1007],"text":"=","confidence":0.986},{"boundingBox":[1637,880,1711,877,1708,992,1633,996],"text":"3","confidence":0.986}]},{"boundingBox":[428,1424,1515,1391,1519,1541,430,1561],"text":"2 = AC + Fq","words":[{"boundingBox":[484,1433,603,1426,604,1561,485,1559],"text":"2","confidence":0.959},{"boundingBox":[650,1423,769,1417,771,1561,652,1561],"text":"=","confidence":0.981},{"boundingBox":[864,1412,1070,1404,1073,1558,866,1561],"text":"AC","confidence":0.986},{"boundingBox":[1165,1400,1284,1397,1288,1549,1168,1555],"text":"+","confidence":0.981},{"boundingBox":[1340,1395,1515,1392,1518,1534,1343,1546],"text":"Fq","confidence":0.89}]},{"boundingBox":[2094,1429,2817,1429,2817,1577,2094,1578],"text":"3x+ 3=","words":[{"boundingBox":[2115,1429,2544,1431,2542,1578,2114,1579],"text":"3x+","confidence":0.786},{"boundingBox":[2594,1431,2813,1432,2811,1577,2592,1578],"text":"3=","confidence":0.931}]},{"boundingBox":[356,1743,1675,1781,1664,2007,352,1940],"text":"0 = h2 + 9","words":[{"boundingBox":[404,1751,588,1743,583,1928,401,1938],"text":"0","confidence":0.673},{"boundingBox":[662,1743,846,1744,838,1928,656,1927],"text":"=","confidence":0.841},{"boundingBox":[1019,1748,1252,1765,1239,1951,1009,1933],"text":"h2","confidence":0.747},{"boundingBox":[1289,1768,1472,1788,1456,1978,1275,1956],"text":"+","confidence":0.981},{"boundingBox":[1570,1802,1667,1816,1649,2007,1553,1993],"text":"9","confidence":0.852}]}]}]}}'
json_data = json.loads(data)

d = json_data['analyzeResult']
raw_data = d['readResults']







