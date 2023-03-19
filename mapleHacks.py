#!/usr/bin/env python
# coding: utf-8

# In[41]:


import pandas as pd
from matplotlib import pyplot as plt
import matplotlib.ticker as ticker
import seaborn as sns
from numpy import percentile
from numpy.random import randn
import numpy as np
import os
import math
from scipy.stats import norm, stats


# In[12]:


def createStateDf(state, year):
    folder = "data/WICAgencies{}ytd/".format(year)
    
    stateDict = {
        "Date": pd.read_csv("data/WICAgencies{}ytd/Children_Participating.csv".format(year)).columns[1:-1]
    }
    
    for dataFile in os.listdir(folder):
        file = folder + dataFile
        stateDf = pd.read_csv(file).dropna()
        
        
        if len(stateDf.columns) == 14:
            stateData = stateDf[ stateDf[stateDf.columns[0]] == state ]
         
            stateData = np.array(stateDf[ stateDf[stateDf.columns[0]] == state ]).flatten()
            stateData = stateData[1:-1]
            
            stateDict[str(dataFile)[0:-4]] = stateData
        
    return pd.DataFrame(stateDict).drop(["Infants_Fully_Breastfed", "Infants_Fully_Formula-fed", 
                                         "Infants_Partially_Breastfed","Postpartum_Women_Participating", 
                                         "Pregnant_Women_Participating","Rebates_Received", 
                                         "Total_Breastfeeding_Women", "Women_Fully_Breastfeeding",
                                         "Women_Partially_Breastfeeding"], axis=1)


def trunc(df):
    for i, date in enumerate(df["Date"]):
        df.loc[i, "Date"] =  date[:-9]
    return df
        

def createFourYearDf(state):
    years = ["2013", "2014", "2015", "2016"]
    returnDf = pd.DataFrame()
    
    for year in years:
        returnDf = pd.concat([returnDf, trunc(createStateDf(state, year))], axis=0)
    
    return returnDf.reset_index(drop=True)

dfNewYork = createFourYearDf("New York")
dfNewYork.head()


# In[21]:


def number_format(x, pos):
    return '{:,.0f}'.format(x)

def graphParticipant(df, participant, cityName=""):
    plt.figure(figsize=(16, 5))
    plt.plot(df["Date"], df[participant], label=participant)

    plt.title("Partipants in WIC")
    plt.ylabel("Number of Participants") # set a meaningful ylabel
    plt.xlabel("Date") # set the xlabel to "Date"
    plt.xticks(rotation=45, fontsize=8)

    plt.legend()

    plt.gca().yaxis.set_major_formatter(ticker.FuncFormatter(number_format))
    plt.show()
    
    if cityName != "":
        fig.savefig('{}--{}.png'.format(cityName, participant))
        
graphParticipant(dfNewYork, "Total_Infants")


# # CREATING AND TRAINING LSTM MODEL

# In[50]:


from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM, Flatten
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
from keras.layers import ConvLSTM2D
from matplotlib import pyplot as plt


# In[138]:


def makeLSTM_TrainAndTest(state, catg, split=0.8):
    df = createFourYearDf("New York")["Total_Number_of_Participants"]
    dataSet = df.values
    dataSet = dataSet.astype("int32")
    
    # Scalarizing Our Inputs for LSTM Model
    scaler = MinMaxScaler(feature_range=(0, 1)) 
    dataSet = scaler.fit_transform(dataSet.reshape(-1, 1))
    
    
    # Training/Testing Dataset
    N_train = int(dataSet.shape[0] * split)
    N_test = dataSet.shape[0] - N_train
    train, test = dataSet[0:N_train,:], dataSet[N_train:len(dataSet),:]

    return train, test, scaler, dataSet
    
train, test, scaler, dataSet = makeLSTM_TrainAndTest("New York", "Total_Number_of_Participants")


# In[139]:


def to_sequences(dataset, seq_size=1):
    x = []
    y = []

    for i in range(len(dataset)-seq_size-1):
        window = dataset[i:(i+seq_size), 0]
        x.append(window)
        y.append(dataset[i+seq_size, 0])
        
    return np.array(x),np.array(y)
    

seq_size = 5  # Number of time steps to look back 
#Larger sequences (look further back) may improve forecasting.

trainX, trainY = to_sequences(train, seq_size)
testX, testY = to_sequences(test, seq_size)

print("Shape of training set: {}".format(trainX.shape))
print("Shape of test set: {}".format(testX.shape))


trainX, trainY


# In[140]:


def makeLSTM_Model(trainX, testX, trainY, testY):
    trainX = trainX.reshape((trainX.shape[0], 1, 1, 1, seq_size))
    testX = testX.reshape((testX.shape[0], 1, 1, 1, seq_size))

    # Creating LSTM Aritecture
    model = Sequential()
    model.add(ConvLSTM2D(filters=32, kernel_size=(1,1), activation='relu', input_shape=(1, 1, 1, seq_size)))
    model.add(Flatten())
    model.add(Dense(16))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    # model.summary()
    
    # RUNNING MODEL FITTING
    model.fit(trainX, trainY, validation_data=(testX, testY),
          verbose=2, epochs=200)
    
    return model

model = makeLSTM_Model(trainX, testX, trainY, testY)


# In[159]:


def makeLSTM_AccuracyScore(model, trainX, testX, trainY, testY, dataSet, name=""):
    # Reshaping trainX and testX
    trainX = trainX.reshape((trainX.shape[0], 1, 1, 1, seq_size))
    testX = testX.reshape((testX.shape[0], 1, 1, 1, seq_size))

    # Making Predictions
    trainPredict = model.predict(trainX)
    testPredict = model.predict(testX)
    
    # Reconverting Predictions to Actual Numbers Outside of 0-1 Scale
    trainPredict = scaler.inverse_transform(trainPredict)
    trainY = scaler.inverse_transform([trainY])
    testPredict = scaler.inverse_transform(testPredict)
    testY = scaler.inverse_transform([testY])
    
    # Generating RMSE and MAPE Scores
    rmseTrain = math.sqrt(mean_squared_error(trainY[0], trainPredict[:,0]))
    rmseTest = math.sqrt(mean_squared_error(testY[0], testPredict[:,0]))
    mapeTrain = mean_absolute_percentage_error(trainY[0], trainPredict[:,0])
    mapeTest = mean_absolute_percentage_error(testY[0], testPredict[:,0])
    
    # Displaying Scores
    print('RMSE Train Score: %.2f' % (rmseTrain))
    print('RMSE Test Score: %.2f' % (rmseTest))
    print('MAPE Test Score: %.2f' % (mapeTrain))
    print('MAPE Test Score: %.2f' % (mapeTest))
    
    # Displaying 
    predictions = np.concatenate((trainPredict.flatten(), testPredict.flatten()))
    actual = np.concatenate((trainY[0], testY[0]))
    
    plt.figure(figsize=(16, 5))
    plt.plot(predictions, label='Predicted Data')
    plt.plot(actual, label='Actual Data')
       
    plt.legend()
    plt.title('Testing Data and Prediction Data')
    plt.xlabel('Months After Starting Date of Data')
    plt.ylabel('Value')
    
    plt.gca().yaxis.set_major_formatter(ticker.FuncFormatter(number_format))
    plt.show()
    
    if name != "":
        fig.savefig('{}.png'.format(name))
        
makeLSTM_AccuracyScore(model, trainX, testX, trainY, testY, dataSet)


# In[160]:


def predictModel(state, catg, seq_size, save=False):
    train, test, scaler, dataSet = makeLSTM_TrainAndTest(state, catg)
    
    trainX, trainY = to_sequences(train, seq_size)
    testX, testY = to_sequences(test, seq_size)

    model = makeLSTM_Model(trainX, testX, trainY, testY)
    
    if save:
        fileName = "Pred_{}--{}.png".format(state, catg)
        makeLSTM_AccuracyScore(model, trainX, testX, trainY, testY, dataSet, fileName)
    else:
        makeLSTM_AccuracyScore(model, trainX, testX, trainY, testY, dataSet)

predictModel("Texas", "Total_Number_of_Participants", 5)

