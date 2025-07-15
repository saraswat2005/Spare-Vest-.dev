import pandas as pd
import pickle

df = pd.read_csv('crypto_data.csv')

# List of cryptos and their closing price columns
cryptos = [
    ('BTC', 'Close (BTC)'),
    ('ETH', 'Close (ETH)'),
    ('USDT', 'Close (USDT)'),
    ('BNB', 'Close (BNB)')
]

results = []

for name, close_col in cryptos:
    start_price = df[close_col].iloc[0]
    end_price = df[close_col].iloc[-1]
    growth_pct = ((end_price - start_price) / start_price) * 100
    results.append({
        'crypto': name,
        'start_price': start_price,
        'end_price': end_price,
        'growth_pct': growth_pct
    })

# Rank by growth percentage
results = sorted(results, key=lambda x: x['growth_pct'], reverse=True)

# Save the results as a model
with open('crmModel.pkl', 'wb') as f:
    pickle.dump(results, f)

# Print the ranking
print('Crypto Ranking by Growth/Loss Percentage:')
for i, res in enumerate(results, 1):
    status = 'Growth' if res['growth_pct'] > 0 else 'Loss'
    print(f"{i}. {res['crypto']}: {res['growth_pct']:.2f}% ({status})")