from django.db.models import Sum
import pandas as pd
import calendar
from .models import RetailData

def get_chart_colors():
    return [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF'
    ]

def get_filtered_queryset(params):
    queryset = RetailData.objects.all()
    channel = params.get('channel')
    brand = params.get('brand')
    pack_type = params.get('pack_type')
    ppg = params.get('ppg')
    year = params.get('year')
    if channel:
        queryset = queryset.filter(channel=channel)
    if brand:
        queryset = queryset.filter(brand=brand)
    if pack_type:
        queryset = queryset.filter(pack_type=pack_type)
    if ppg:
        queryset = queryset.filter(ppg=ppg)
    if year:
        queryset = queryset.filter(year=int(year))
    return queryset

def get_sales_by_year(params):
    queryset = get_filtered_queryset(params)
    data = queryset.values('year', 'brand').annotate(total_sales=Sum('sales_value')).order_by('year', 'brand')
    if not data:
        return {"labels": [], "datasets": []}
    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='year', columns='brand', values='total_sales').fillna(0)
    years = [str(year) for year in pivot_df.index]
    brands = pivot_df.columns
    colors = get_chart_colors()
    datasets = []
    for i, brand in enumerate(brands):
        datasets.append({
            'label': brand,
            'data': [float(value) for value in pivot_df[brand]],
            'backgroundColor': colors[i % len(colors)],
        })
    return {'labels': years, 'datasets': datasets}

def get_volume_by_year(params):
    queryset = get_filtered_queryset(params)
    data = queryset.values('year', 'brand').annotate(total_volume=Sum('volume')).order_by('year', 'brand')
    if not data:
        return {"labels": [], "datasets": []}
    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='year', columns='brand', values='total_volume').fillna(0)
    years = [str(year) for year in pivot_df.index]
    brands = pivot_df.columns
    colors = get_chart_colors()
    datasets = []
    for i, brand in enumerate(brands):
        datasets.append({
            'label': brand,
            'data': [float(value) for value in pivot_df[brand]],
            'backgroundColor': colors[i % len(colors)],
        })
    return {'labels': years, 'datasets': datasets}

def get_monthly_trend(params):
    queryset = get_filtered_queryset(params)
    data = queryset.values('year', 'month').annotate(
        total_sales=Sum('sales_value')
    ).order_by('year', 'month')
    labels = [f"{calendar.month_abbr[item['month']]} {item['year']}" for item in data]
    sales_data = [float(item['total_sales']) for item in data]
    return {
        'labels': labels,
        'data': sales_data,
        'borderColor': ['rgba(255, 99, 132, 1)'] * len(labels),
        'backgroundColor': ['rgba(255, 99, 132, 0.2)'] * len(labels)
    }

def get_market_share(params, metric):
    queryset = get_filtered_queryset(params)
    if metric == 'volume':
        annotation = {'total_volume': Sum('volume')}
        order_by_field = '-total_volume'
        data_field = 'total_volume'
    else:
        annotation = {'total_sales': Sum('sales_value')}
        order_by_field = '-total_sales'
        data_field = 'total_sales'
    data = queryset.values('brand').annotate(**annotation).order_by(order_by_field)
    labels = [item['brand'] for item in data]
    chart_values = [float(item[data_field]) for item in data]
    colors = get_chart_colors()
    return {
        'labels': labels,
        'data': chart_values,
        'backgroundColor': colors[:len(labels)],
        'borderColor': ['#FFFFFF'] * len(labels)
    }

def get_year_wise_sales_vertical(params):
    queryset = get_filtered_queryset(params)
    data = queryset.values('brand', 'year').annotate(total_sales=Sum('sales_value')).order_by('brand', 'year')
    if not data:
        return {"labels": [], "datasets": []}
    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='brand', columns='year', values='total_sales').fillna(0)
    brands = pivot_df.index.tolist()
    years = pivot_df.columns.tolist()
    colors = get_chart_colors()
    datasets = []
    for i, year in enumerate(years):
        datasets.append({
            'label': str(year),
            'data': [float(value) for value in pivot_df[year]],
            'backgroundColor': colors[i % len(colors)],
        })
    return {'labels': brands, 'datasets': datasets} 