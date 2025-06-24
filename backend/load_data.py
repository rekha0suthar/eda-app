#!/usr/bin/env python
"""
Script to load sample FMCG data into the database
"""
import os
import sys
import django
import pandas as pd
from datetime import datetime

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eda_backend.settings')
django.setup()

from api.models import RetailData

def load_data():
    """Load sample data from CSV file"""
    csv_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'dataset.csv')

    if not os.path.exists(csv_file):
        print(f"CSV file not found: {csv_file}")
        return

    # Read CSV file
    df = pd.read_csv(csv_file, sep='\\t', engine='python')

    # Clear existing data
    print("Deleting existing data...")
    RetailData.objects.all().delete()
    print("Existing data deleted.")

    # Prepare data for bulk creation
    records = []
    print("Preparing data for loading...")
    for _, row in df.iterrows():
        records.append(RetailData(
            channel=row['Channel'],
            brand=row['Brand'],
            pack_type=row['PackType'],
            ppg=row['PPG'],
            year=row['Year'],
            month=row['Month'],
            sales_value=row['SalesValue'],
            volume=row['Volume']
        ))

    # Bulk create records
    print(f"Loading {len(records)} records into the database...")
    RetailData.objects.bulk_create(records)
    print(f"Successfully loaded {len(records)} records into the database")

if __name__ == '__main__':
    load_data() 