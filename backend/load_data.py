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
            market=row['Market'],
            channel=row['Channel'],
            region=row['Region'],
            category=row['Category'],
            subcategory=row['SubCategory'],
            brand=row['Brand'],
            variant=row['Variant'],
            pack_type=row['PackType'],
            ppg=row['PPG'],
            pack_size=row['PackSize'],
            year=row['Year'],
            month=row['Month'],
            week=row['Week'],
            date=datetime.strptime(row['Date'], '%d-%m-%Y %H:%M'),
            br_cat_id=row['BrCatId'],
            sales_value=row['SalesValue'],
            volume=row['Volume'],
            volume_units=row['VolumeUnits'],
            d1=row.get('D1'),
            d2=row.get('D2'),
            d3=row.get('D3'),
            d4=row.get('D4'),
            d5=row.get('D5'),
            d6=row.get('D6'),
            av1=row.get('AV1'),
            av2=row.get('AV2'),
            av3=row.get('AV3'),
            av4=row.get('AV4'),
            av5=row.get('AV5'),
            av6=row.get('AV6'),
            ev1=row.get('EV1'),
            ev2=row.get('EV2'),
            ev3=row.get('EV3'),
            ev4=row.get('EV4'),
            ev5=row.get('EV5'),
            ev6=row.get('EV6'),
            prep_date=datetime.strptime(row['PrepDate'], '%d-%m-%Y %H:%M')
        ))

    # Bulk create records
    print(f"Loading {len(records)} records into the database...")
    RetailData.objects.bulk_create(records)
    print(f"Successfully loaded {len(records)} records into the database")

if __name__ == '__main__':
    load_data() 