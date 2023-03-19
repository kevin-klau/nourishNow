import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM, Flatten
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.layers import ConvLSTM2D
from backendGetFunctions import getFourYearDf

df = getFourYearDf("New York")["Total_Number_of_Participants"]

df.values
print(df)