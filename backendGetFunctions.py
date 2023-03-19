import pandas as pd
from matplotlib import pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import os


"""
    Used to combine data
"""


def getStateDf(state, year):
    folder = "data/WICAgencies{}ytd/".format(year)

    stateDict = {
        "Date": pd.read_csv("data/WICAgencies{}ytd/Children_Participating.csv".format(year)).columns[1:-1]
    }

    for dataFile in os.listdir(folder):
        file = folder + dataFile
        stateDf = pd.read_csv(file).dropna()

        if len(stateDf.columns) == 14:
            stateData = stateDf[stateDf[stateDf.columns[0]] == state]

            stateData = np.array(stateDf[stateDf[stateDf.columns[0]] == state]).flatten()
            stateData = stateData[1:-1]

            stateDict[str(dataFile)[0:-4]] = stateData

    return pd.DataFrame(stateDict).drop(["Infants_Fully_Breastfed", "Infants_Fully_Formula-fed",
                                         "Infants_Partially_Breastfed", "Postpartum_Women_Participating",
                                         "Pregnant_Women_Participating", "Rebates_Received",
                                         "Total_Breastfeeding_Women", "Women_Fully_Breastfeeding",
                                         "Women_Partially_Breastfeeding"], axis=1)


def trunc(df):
    for i, date in enumerate(df["Date"]):
        df.loc[i, "Date"] = date[:-9]
    return df


def getFourYearDf(state):
    years = ["2013", "2014", "2015", "2016"]
    returnDf = pd.DataFrame()

    for year in years:
        returnDf = pd.concat([returnDf, trunc(getStateDf(state, year))], axis=0)

    return returnDf.reset_index(drop=True)


"""
    Used to actually create graphs for frontend
"""


def number_format(x, pos):
    return '{:,.0f}'.format(x)


def getParticipantGraph(df, participant):
    plt.figure(figsize=(16, 5))
    plt.plot(df["Date"], df[participant], label=participant)

    plt.title("Partipants in WIC")
    plt.ylabel("Number of Participants")  # set a meaningful ylabel
    plt.xlabel("Date")  # set the xlabel to "Date"
    plt.xticks(rotation=45, fontsize=8)

    plt.legend()

    plt.gca().yaxis.set_major_formatter(ticker.FuncFormatter(number_format))

    plt.show()

