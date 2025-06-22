#!/usr/bin/env python
"""
Script to load sample FMCG data into the database
"""
import os
import sys
import django
import pandas as pd
from decimal import Decimal

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eda_backend.settings')
django.setup()

from api.models import RetailData

def load_data():
    """Load sample data from CSV file"""
    csv_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'sample_fmcg_data.csv')
    
    if not os.path.exists(csv_file):
        print(f"CSV file not found: {csv_file}")
        return
    
    # Read CSV file
    df = pd.read_csv(csv_file)
    
    # Clear existing data
    RetailData.objects.all().delete()
    
    # Load data into database
    for _, row in df.iterrows():
        RetailData.objects.create(
            year=row['Year'],
            month=row['Month'],
            brand=row['Brand'],
            pack_type=row['Pack_Type'],
            ppg=row['PPG'],
            channel=row['Channel'],
            sales_value=Decimal(str(row['Sales_Value'])),
            volume_kg=Decimal(str(row['Volume_kg']))
        )
    
    print(f"Successfully loaded {len(df)} records into the database")

if __name__ == '__main__':
    load_data() 