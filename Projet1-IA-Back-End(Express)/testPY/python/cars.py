
import json
import sys
data = json.loads(sys.argv[1])

# data = {
#   "year": '2000',
#   "kilometers": '10000',
#   "tax": '150',
#   "l_100km": '5',
#   "engineSize": '2',
#   "model": 'Corsa',
#   "gasoil": 'Petrol',
#   "transmission": 'Manual'
# }

import joblib
from joblib import dump, load

import os
user_name = os.getlogin()
path =  "D:\Technocite\DATASETS PROJET\Second-hand-car"
import pandas as pd
import numpy as np



audi = pd.read_csv(path + '/audi.csv')
audi=audi.assign(brand='Audi')
bmw = pd.read_csv(path + '/bmw.csv')
bmw=bmw.assign(brand='BMW')
mercedes_cclass = pd.read_csv(path + '/cclass.csv')
mercedes_cclass=mercedes_cclass.assign(brand='mercedes')
focus = pd.read_csv(path + '/focus.csv')
focus=focus.assign(brand='ford')
ford = pd.read_csv(path + '/ford.csv')
ford=ford.assign(brand='ford')
hyundai = pd.read_csv(path + '/hyundi.csv')
hyundai=hyundai.assign(brand='hyundai')
mercedes = pd.read_csv(path + '/merc.csv')
mercedes=mercedes.assign(brand='mercedes')
skoda = pd.read_csv(path + '/skoda.csv')
skoda=skoda.assign(brand='skoda')
toyota = pd.read_csv(path + '/toyota.csv')
toyota=toyota.assign(brand='toyota')
unclean_cclass = pd.read_csv(path + '/unclean_cclass.csv')
unclean_focus = pd.read_csv(path + '/unclean_focus.csv')
opel = pd.read_csv(path + '/vauxhall.csv')
opel=opel.assign(brand='opel.csv')
vw = pd.read_csv(path + '/vw.csv')
vw=vw.assign(brand='VW')


brands_list = [audi, bmw,mercedes, mercedes_cclass, focus,ford, hyundai,skoda,toyota,opel,vw]
df = pd.concat(brands_list, ignore_index = False)
df = pd.DataFrame(df)

df = df.drop(columns='brand')
df = pd.get_dummies(df)

del df['tax(£)']

df=df.fillna(df.mean())

indexNames = df[ df['year'] > 2021 ].index
df.drop(indexNames , inplace=True)

df['price']=((df['price'])/100)*117
df['tax']=((df['tax'])/100)*117
df.mpg = 282.481 / df.mpg
df = df.rename(columns = {'mpg' : 'l_100km'})

df.mileage = df.mileage * 1.60934
df = df.rename(columns = {'mileage' : 'km'})



data_user = [int(data['year']),int(data['kilometers']),float(data['tax']),float(data['l_100km']),float(data['engineSize']),data['model'],data['gasoil'],data['transmission']]

# data_user = [2017,25322.96490, 175.50, 5.098935, 1.4, 'A1', 'Petrol', 'Manual']
column_name = list(df)
column_name.remove('price')

def car_predictor(data_user, column_name):  

    model = load('python/randomforest_cars.joblib')

    df_clean = pd.DataFrame(np.zeros((1, 209)), columns = column_name)
 
                                               
    df_clean['year'] = data_user[0]
    df_clean['km'] = data_user[1]
    df_clean['tax'] = data_user[2]
    df_clean['l_100km'] = data_user[3]
    df_clean['engineSize'] = data_user[4]
    df_clean['model_ {}'.format(data_user[5])] = 1
    df_clean['fuelType_{}'.format(data_user[6])] = 1
    df_clean['transmission_{}'.format(data_user[7])] = 1
    
    #print(list(df_clean))
    X = df_clean.values.reshape(1,209)
    #print(df_clean.shape)
    
    result_prediction_price_car = model.predict(X)
    # print("The price of your car is estimated at : ")
    # print(round(result_prediction_price_car[0],2))
    
    return result_prediction_price_car[0]




print(car_predictor(data_user,column_name))








