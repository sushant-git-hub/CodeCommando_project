import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import statsmodels.api as sm
import folium
from folium.plugins import HeatMap
import webbrowser

# Load and Clean Data
file_path = r"C:\Users\91915\OneDrive\Desktop\corrected_india_store_data.csv"
df = pd.read_csv(file_path)

# Clean city/store type columns
df['City'] = df['City'].str.strip().str.lower()
df['Store Type'] = df['Store Type'].str.strip().str.lower()

# Convert numeric columns
numeric_cols = ['Foot Traffic', 'Avg Spending Capacity', 'Competition Density',
                'Population Density', 'Avg Income', 'Rating', 'Rent Cost']
df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')

# Define realistic latitude and longitude ranges for major cities
city_bounds = {
    "pune": (18.4, 18.7, 73.7, 74.0),
    "mumbai": (18.89, 19.30, 72.75, 72.95),
    "delhi": (28.40, 28.89, 76.85, 77.30),
    "bangalore": (12.85, 13.15, 77.45, 77.75),
    "chennai": (12.85, 13.20, 80.15, 80.30),
    "kolkata": (22.45, 22.75, 88.30, 88.50),
    "hyderabad": (17.20, 17.60, 78.25, 78.65),
    "ahmedabad": (23.00, 23.20, 72.50, 72.70),
    "lucknow": (26.75, 27.00, 80.80, 81.10),
    "jaipur": (26.75, 27.05, 75.75, 76.00)
}

# Regression Analysis
target_variable = 'Rating'
features = ['Foot Traffic', 'Avg Spending Capacity', 'Competition Density',
            'Population Density', 'Avg Income', 'Rent Cost']

X = sm.add_constant(df[features])
y = df[target_variable]
model = sm.OLS(y, X).fit()
weights = model.params.drop('const').div(model.params.drop('const').sum()).round(3)

# User Inputs
selected_city = input("Enter City: ").strip().lower()
selected_store_type = input("Enter Store Type: ").strip().lower()

# Filter by city and store type
filtered_df = df[
    (df['City'] == selected_city) &
    (df['Store Type'] == selected_store_type)
].copy()

# Ensure output remains within city boundaries
if selected_city in city_bounds:
    lat_min, lat_max, lng_min, lng_max = city_bounds[selected_city]
    filtered_df = filtered_df[
        (filtered_df['Latitude'].between(lat_min, lat_max)) &
        (filtered_df['Longitude'].between(lng_min, lng_max))
    ]

if filtered_df.empty:
    print(f"\n❌ No data available for '{selected_store_type.title()}' in {selected_city.title()}.")
else:
    # Calculate Suitability Score
    filtered_df['Suitability Score'] = (filtered_df[features] * weights).sum(axis=1).round(3)
    
    # Get Best Location
    best_idx = filtered_df['Suitability Score'].idxmax()
    best = filtered_df.loc[best_idx]
    lat, lng = float(best['Latitude']), float(best['Longitude'])
    
    # Print Results
    print(f"\n⭐ BEST LOCATION IN {selected_city.upper()} ⭐")
    print(f"📍 Coordinates: {lat:.6f}, {lng:.6f}")
    print(f"📊 Suitability Score: {best['Suitability Score']}/1.0")
    print(f"🏬 Store Type: {selected_store_type.title()}")
    
    # Create Interactive Map
    m = folium.Map(location=[lat, lng], zoom_start=14, tiles='cartodbpositron')
    
    # Heatmap with fixed gradient
    HeatMap(
        filtered_df[['Latitude', 'Longitude', 'Suitability Score']].values.tolist(),
        radius=20,
        gradient={'0.4': 'blue', '0.6': 'yellow', '1.0': 'red'}
    ).add_to(m)
    
    # Star marker for best location
    folium.Marker(
        location=[lat, lng],
        tooltip="Best Location",
        popup=f"Suitability: {best['Suitability Score']}",
        icon=folium.Icon(color='gold', icon='star', prefix='fa')
    ).add_to(m)
    
    # Save and display map
    map_file = f"{selected_city}_store_map.html"
    m.save(map_file)
    webbrowser.open(map_file)
    print(f"\n🗺 Map saved to: {map_file}")

# Show Correlation Matrix
plt.figure(figsize=(10,6))
sns.heatmap(df[numeric_cols].corr(), annot=True, cmap='coolwarm', fmt=".2f")
plt.title("Feature Correlation Matrix")
plt.show()