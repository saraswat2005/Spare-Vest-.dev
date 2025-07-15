import pandas as pd

df = pd.read_csv('crypto_data.csv')

# Get the last 300 rows
last_300 = df.tail(300)

# Get the remaining rows (excluding the last 300)
remaining = df.iloc[:-300]

# Save the last 300 rows to a new CSV file
last_300.to_csv('last_300.csv', index=False)

# Save the remaining rows to another CSV file
remaining.to_csv('data_without_last_300.csv', index=False)
