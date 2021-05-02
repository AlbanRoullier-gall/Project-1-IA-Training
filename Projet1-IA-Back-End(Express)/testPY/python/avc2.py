import pandas as pd
import numpy as np

# data = pd.read_csv('D:\Technocite\DATASETS PROJET\AVC\healthcare-dataset-stroke-data.csv')

# data.isnull().sum()
# data=data.replace(to_replace=np.nan,value=data.mean())
# data.isnull().sum()

# correlation=data.corr()

# data = data.drop(columns= ['id','ever_married','Residence_type','work_type'], axis = 1)

# from sklearn.preprocessing import LabelEncoder
# label_encoder=LabelEncoder()
# dataBIS = data.copy()
# dataBIS = pd.get_dummies(dataBIS)

# correl = dataBIS.corr()

# from sklearn.model_selection import train_test_split
# X=dataBIS.drop('stroke',axis=1)
# y=dataBIS['stroke']

# X_Train,X_Test,y_Train,y_Test= train_test_split(X,y,test_size=0.2,random_state=10)


# from sklearn.preprocessing import MinMaxScaler
# from sklearn.model_selection import GridSearchCV



# sc=MinMaxScaler(feature_range=(0,1))
# X=sc.fit_transform(X)


# from sklearn.metrics import accuracy_score

# from sklearn.ensemble import RandomForestClassifier
# rf=RandomForestClassifier(class_weight='balanced',max_depth=2)

# params3 = {'n_estimators':np.arange(80,100,1)}
# grid3 = GridSearchCV(rf, param_grid=params3, scoring='recall_macro')

# rf = grid3.fit(X_Train, y_Train)

# rf = RandomForestClassifier(class_weight='balanced',n_estimators=96, max_depth=2 )
# rf=rf.fit(X_Train,y_Train)

# predict3=rf.predict(X_Test)

# features = list(X_Train)

# feature_important=pd.Series(rf.feature_importances_,index=features).sort_values(ascending=False)

# accuracy_score(y_Test,predict3)

import joblib
from joblib import dump, load
import json
import sys

data = json.loads(sys.argv[1])
path = sys.argv[1]


def avc_predictor(age, hypertension, heart_disease, avg_glucose_level, bmi, female, male, other, unknown_smoke,
                  formely_smoked, never_smoked, smokes):
    model = load('python/randomforest1.joblib')

    X = np.array(
        [age, hypertension, heart_disease, avg_glucose_level, bmi, female, male, other, unknown_smoke, formely_smoked,
         never_smoked, smokes]).reshape(-1, 12)

    result_prediction_avc = model.predict(X)

    # taux_proba = accuracy_score(y_Test, predict3) * 100

    if (result_prediction_avc[0] == 1):
        return 1
    else:
        return 0

    #print("Taux de probabilité calculé par l'algorithme à titre indicatif non médical : " + str(taux_proba) + " % ")

sexeM = 0
sexeF = 0
sexeO = 0


if(int(data['sexe']) == 1):
    sexeF = 1
elif(int(data['sexe'])  == 2):
    sexeM = 1
elif(int(data['sexe'])  == 3):
    sexeO = 1

    


hypertension = 0
h_d = 0

if(data['hypertension']=='true'):
    hypertension = 1

if(data['maladie_cardiaque']=='true'):
    h_d = 1


age = int(data['age'])

avg = int(data['taux_glucose'])
bmi = int(data['IMC'])


unknown_smoke = 0
formely_smoked = 0
never_smoked = 0
smokes = 0



if(int(data['fumeur_statut']) == 1):
    smokes = 1
elif(int(data['fumeur_statut']) == 2):
    never_smoked = 1
elif( int(data['fumeur_statut']) == 3):
    formely_smoked = 1
elif( int(data['fumeur_statut']) == 4):
    unknown_smoke = 1





#if(int(data['age'] == '1'):
   # print(avc_predictor(int(data['age']),1,1,130,38,1,0,0,0,1,0,0))
#elif(int(data['age'] == '2')
    #print(avc_predictor(int(data['age']),1,1,130,38,0,1,0,0,1,0,0))

#print(avc_predictor(age,hypertension,h_d,avg,bmi,sexeF,sexeM,sexeO,unknown_smoke,formely_smoked,never_smoked,smokes))

print(avc_predictor(age,hypertension,h_d,avg,bmi,sexeF,sexeM,sexeO,unknown_smoke,formely_smoked,never_smoked,smokes))