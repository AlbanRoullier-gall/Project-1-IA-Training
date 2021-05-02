
import numpy as np
# import matplotlib.pyplot as plt
import cv2
# import pandas as pd
# import joblib
# from joblib import dump, load
import sys
import tensorflow as tf
from tensorflow import keras
# from tensorflow.keras import layers
from tensorflow.keras.applications import VGG19 
 






path = sys.argv[1]


detection_model = cv2.CascadeClassifier(r'python/haarcascade_frontalface_default.xml')
mask_label = {0:'AVEC MASQUE',1:'SANS MASQUE'}
color_label = {0:(0,255,0),1:(255,0,0)}

def predict(image_path):

    model = tf.keras.models.load_model('python/maskmodel.h5')
    
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # # We use detectMultiScale() to find faces 
    # # scaleFactor : Parameter specifying how much the image size is reduced at each image scale.
    # # minNeighbors : Parameter specifying how many neighbors each candidate rectangle should have to retain it. This parameter will affect the quality of the detected faces: higher value results in less detections but with higher quality.
    faces = detection_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=9)
    
    #Probabilité que ce soit un visage!!!
    
    #If faces are found, it returns the positions of detected faces as Rect(x,y,w,h)
    
    #cv2.cvtColor(img, cv2.COLOR_RGB2BGR) returns the image without swapping colour channels.
    # output_img = cv2.imread(image_path)
    # output_img = cv2.cvtColor(output_img, cv2.COLOR_RGB2BGR)

    
    # plt.figure(figsize=(20,20))
    # plt.imshow(output_img)
    

    output_img = cv2.imread(image_path, 0)
    output_img = cv2.cvtColor(output_img, cv2.COLOR_RGB2BGR)
    
    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        # crop of the face 
        crop = output_img[y:y+h,x:x+w]
        # resize(src, dsize) Resizing an image means changing the dimensions of it. dsize : desired size for the output image.
        crop = cv2.resize(crop,(128,128))
        #And let’s now reshape this 1D list into a 2D matrix, pretending that it is an image (/255 for the colors)
        crop = np.reshape(crop,[1,128,128,3])/255.0
        #numpy.argmax() : Returns the indices of the maximum values along an axis.
        prediction = model.predict(crop).argmax()
        #cv2.rectangle(image, start_point, end_point, color, thickness)
        cv2.rectangle(output_img,(x,y),(x+w,y+h),color_label[prediction],1)

    print(output_img)
    cv2.imwrite('D:\\Technocite\\DATASETS PROJET\\testPY\\outputs\\test.jpg', output_img) 
    
    # plt.imshow(output_img)

# def save(image_path):
#     output_img = cv2.imread(image_path, 0)
#     print(output_img)
#     output_img = cv2.cvtColor(output_img, cv2.COLOR_RGB2BGR)
#     cv2.imwrite('D:\\Technocite\\DATASETS PROJET\\testPY\\outputs\\test.jpg', output_img) 


predict("D:\\Technocite\\DATASETS PROJET\\testPY\\" + path)




#predict("..\\"+path)