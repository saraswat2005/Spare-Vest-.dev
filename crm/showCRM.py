import pandas as pd
import pickle
from dash import Dash, dcc, html, Output, Input, State
import plotly.express as px
import dash

# Load datasets
main_df = pd.read_csv('data_without_last_300.csv')
last_300 = pd.read_csv('last_300.csv')

cryptos = [
    ('BTC', 'Close (BTC)', 'Volume (BTC)'),
    ('ETH', 'Close (ETH)', 'Volume (ETH)'),
    ('USDT', 'Close (USDT)', 'Volume (USDT)'),
    ('BNB', 'Close (BNB)', 'Volume (BNB)')
]

current_df = main_df.copy()

external_stylesheets = [
    'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/darkly/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap'
]

app = Dash(__name__, external_stylesheets=external_stylesheets)

def make_graph(id_suffix, title):
    return dcc.Graph(id=f'plot-{id_suffix}', figure=px.line(title=title), config={'displayModeBar': False})

def compute_live_ranking(df):
    live_results = []
    for name, close_col, _ in cryptos:
        if len(df) > 0:
            start_price = df[close_col].iloc[0]
            end_price = df[close_col].iloc[-1]
            growth_pct = ((end_price - start_price) / start_price) * 100 if start_price != 0 else 0
            live_results.append({
                'crypto': name,
                'start_price': start_price,
                'end_price': end_price,
                'growth_pct': growth_pct
            })
    return sorted(live_results, key=lambda x: x['growth_pct'], reverse=True)

def render_ranking_table(ranking):
    return html.Table([
        html.Thead(html.Tr([
            html.Th('Rank'), html.Th('Crypto'), html.Th('Growth (%)'), html.Th('Start Price'), html.Th('End Price')
        ])),
        html.Tbody([
            html.Tr([
                html.Td(i+1),
                html.Td(row['crypto']),
                html.Td(f"{row['growth_pct']:.2f}", style={'color': 'lime' if row['growth_pct'] > 0 else 'red'}),
                html.Td(f"{row['start_price']:.2f}"),
                html.Td(f"{row['end_price']:.2f}"),
            ]) for i, row in enumerate(ranking)
        ])
    ], style={'width': '100%', 'color': '#fff', 'backgroundColor': '#222', 'marginBottom': 30, 'borderRadius': 10, 'overflow': 'hidden'})

app.layout = html.Div([
    html.H1("Simulate Inserting Last 300 Rows for Each Crypto", style={'color': '#fff', 'textAlign': 'center', 'marginTop': 20, 'fontFamily': 'Roboto'}),
    html.Div(id='ranking-table'),
    html.Div([
        html.Label('Rows per second:', style={'color': '#fff', 'marginRight': 10, 'fontFamily': 'Roboto'}),
        dcc.Input(id='rows-per-sec', type='number', value=1, min=1, step=1, style={'width': '80px', 'marginRight': 20}),
        html.Button('Start Simulation', id='start-btn', n_clicks=0, style={'marginRight': 10}),
        html.Button('Pause', id='pause-btn', n_clicks=0),
    ], style={'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginBottom': 20}),
    dcc.Interval(id='interval', interval=1000, n_intervals=0, disabled=True),
    dcc.Store(id='current-index', data=0),
    dcc.Store(id='current-data', data=current_df.to_dict('records')),
    dcc.Store(id='is-running', data=False),
    *[
        html.Div([
            html.Div([
                html.H2(f"{name} Closing Price", style={'color': '#fff', 'fontFamily': 'Roboto'}),
                make_graph(f'{name}-close', f"{name} Closing Price")
            ], style={'width': '48%', 'display': 'inline-block', 'vertical-align': 'top', 'backgroundColor': '#222', 'padding': 10, 'borderRadius': 10, 'margin': 5}),
            html.Div([
                html.H2(f"{name} Volume", style={'color': '#fff', 'fontFamily': 'Roboto'}),
                make_graph(f'{name}-volume', f"{name} Volume")
            ], style={'width': '48%', 'display': 'inline-block', 'vertical-align': 'top', 'backgroundColor': '#222', 'padding': 10, 'borderRadius': 10, 'margin': 5}),
        ], style={'marginBottom': 30, 'marginTop': 10}) for name, _, _ in cryptos
    ]
], style={'backgroundColor': '#181818', 'minHeight': '100vh', 'paddingBottom': 30})

@app.callback(
    Output('interval', 'disabled'),
    Output('is-running', 'data'),
    [Input('start-btn', 'n_clicks'), Input('pause-btn', 'n_clicks')],
    State('is-running', 'data')
)
def toggle_interval(start_clicks, pause_clicks, is_running):
    ctx = dash.callback_context
    if not ctx.triggered:
        return True, False
    button_id = ctx.triggered[0]['prop_id'].split('.')[0]
    if button_id == 'start-btn':
        return False, True
    elif button_id == 'pause-btn':
        return True, False
    return True, False

@app.callback(
    [Output('ranking-table', 'children')] +
    [Output(f'plot-{name}-close', 'figure') for name, _, _ in cryptos] +
    [Output(f'plot-{name}-volume', 'figure') for name, _, _ in cryptos] +
    [Output('current-index', 'data'), Output('current-data', 'data')],
    Input('interval', 'n_intervals'),
    State('rows-per-sec', 'value'),
    State('current-index', 'data'),
    State('current-data', 'data'),
    State('is-running', 'data')
)
def update_plots(n_intervals, rows_per_sec, current_index, current_data, is_running):
    if not is_running:
        df = pd.DataFrame(current_data)
        ranking = compute_live_ranking(df)
        ranking_table = render_ranking_table(ranking)
        figures = []
        for name, close_col, vol_col in cryptos:
            fig_close = px.line(df, x='Date', y=close_col, title=f"{name} Closing Price", template='plotly_dark')
            fig_close.update_layout(paper_bgcolor='#222', plot_bgcolor='#222', font_color='#fff')
            figures.append(fig_close)
        for name, close_col, vol_col in cryptos:
            fig_vol = px.line(df, x='Date', y=vol_col, title=f"{name} Volume", template='plotly_dark')
            fig_vol.update_layout(paper_bgcolor='#222', plot_bgcolor='#222', font_color='#fff')
            figures.append(fig_vol)
        return [ranking_table] + figures + [current_index, current_data]
    for _ in range(rows_per_sec):
        if current_index < len(last_300):
            next_row = last_300.iloc[current_index]
            current_data.append(next_row.to_dict())
            current_index += 1
        else:
            break
    df = pd.DataFrame(current_data)
    ranking = compute_live_ranking(df)
    ranking_table = render_ranking_table(ranking)
    figures = []
    for name, close_col, vol_col in cryptos:
        fig_close = px.line(df, x='Date', y=close_col, title=f"{name} Closing Price", template='plotly_dark')
        fig_close.update_layout(paper_bgcolor='#222', plot_bgcolor='#222', font_color='#fff')
        figures.append(fig_close)
    for name, close_col, vol_col in cryptos:
        fig_vol = px.line(df, x='Date', y=vol_col, title=f"{name} Volume", template='plotly_dark')
        fig_vol.update_layout(paper_bgcolor='#222', plot_bgcolor='#222', font_color='#fff')
        figures.append(fig_vol)
    return [ranking_table] + figures + [current_index, current_data]

if __name__ == '__main__':
    app.run(debug=True)


