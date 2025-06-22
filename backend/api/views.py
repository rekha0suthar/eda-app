from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Avg
from django.db.models.functions import TruncMonth
import pandas as pd
import numpy as np
from .models import RetailData
from .serializers import RetailDataSerializer, FilterOptionsSerializer, ChartDataSerializer, StackedChartDataSerializer

def get_chart_colors():
    return [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF'
    ]

def get_filtered_queryset(request):
    """Helper to get filtered queryset based on request params"""
    queryset = RetailData.objects.all()
    market = request.GET.get('market')
    channel = request.GET.get('channel')
    region = request.GET.get('region')
    category = request.GET.get('category')
    subcategory = request.GET.get('subcategory')
    brand = request.GET.get('brand')
    variant = request.GET.get('variant')
    pack_type = request.GET.get('pack_type')
    ppg = request.GET.get('ppg')
    pack_size = request.GET.get('pack_size')
    year = request.GET.get('year')

    if market:
        queryset = queryset.filter(market=market)
    if channel:
        queryset = queryset.filter(channel=channel)
    if region:
        queryset = queryset.filter(region=region)
    if category:
        queryset = queryset.filter(category=category)
    if subcategory:
        queryset = queryset.filter(subcategory=subcategory)
    if brand:
        queryset = queryset.filter(brand=brand)
    if variant:
        queryset = queryset.filter(variant=variant)
    if pack_type:
        queryset = queryset.filter(pack_type=pack_type)
    if ppg:
        queryset = queryset.filter(ppg=ppg)
    if pack_size:
        queryset = queryset.filter(pack_size=pack_size)
    if year:
        queryset = queryset.filter(year=int(year))
    return queryset

@api_view(['GET'])
def get_data(request):
    """Get filtered retail data"""
    queryset = get_filtered_queryset(request)
    serializer = RetailDataSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_filters(request):
    """Get available filter options"""
    markets = RetailData.objects.values_list('market', flat=True).distinct().order_by('market')
    channels = RetailData.objects.values_list('channel', flat=True).distinct().order_by('channel')
    regions = RetailData.objects.values_list('region', flat=True).distinct().order_by('region')
    categories = RetailData.objects.values_list('category', flat=True).distinct().order_by('category')
    subcategories = RetailData.objects.values_list('subcategory', flat=True).distinct().order_by('subcategory')
    brands = RetailData.objects.values_list('brand', flat=True).distinct().order_by('brand')
    variants = RetailData.objects.values_list('variant', flat=True).distinct().order_by('variant')
    pack_types = RetailData.objects.values_list('pack_type', flat=True).distinct().order_by('pack_type')
    ppgs = RetailData.objects.values_list('ppg', flat=True).distinct().order_by('ppg')
    pack_sizes = RetailData.objects.values_list('pack_size', flat=True).distinct().order_by('pack_size')
    years = RetailData.objects.values_list('year', flat=True).distinct().order_by('year')
    
    data = {
        'markets': list(markets),
        'channels': list(channels),
        'regions': list(regions),
        'categories': list(categories),
        'subcategories': list(subcategories),
        'brands': list(brands),
        'variants': list(variants),
        'pack_types': list(pack_types),
        'ppgs': list(ppgs),
        'pack_sizes': list(pack_sizes),
        'years': list(years)
    }
    
    serializer = FilterOptionsSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
def sales_by_year(request):
    """Get sales value data by year and brand for stacked bar chart"""
    queryset = get_filtered_queryset(request)
    data = queryset.values('year', 'brand').annotate(total_sales=Sum('sales_value')).order_by('year', 'brand')

    if not data:
        return Response({"labels": [], "datasets": []})

    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='year', columns='brand', values='total_sales').fillna(0)

    years = [str(year) for year in pivot_df.index]
    brands = pivot_df.columns
    colors = get_chart_colors()

    datasets = []
    for i, brand in enumerate(brands):
        datasets.append({
            'label': brand,
            'data': [float(value) / 1000000 for value in pivot_df[brand]],
            'backgroundColor': colors[i % len(colors)],
        })

    chart_data = {'labels': years, 'datasets': datasets}
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def volume_by_year(request):
    """Get volume data by year and brand for stacked bar chart"""
    queryset = get_filtered_queryset(request)
    data = queryset.values('year', 'brand').annotate(total_volume=Sum('volume')).order_by('year', 'brand')

    if not data:
        return Response({"labels": [], "datasets": []})

    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='year', columns='brand', values='total_volume').fillna(0)

    years = [str(year) for year in pivot_df.index]
    brands = pivot_df.columns
    colors = get_chart_colors()

    datasets = []
    for i, brand in enumerate(brands):
        datasets.append({
            'label': brand,
            'data': [float(value) / 1000000 for value in pivot_df[brand]],
            'backgroundColor': colors[i % len(colors)],
        })

    chart_data = {'labels': years, 'datasets': datasets}
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def monthly_trend(request):
    """Get monthly trend of sales value for line chart"""
    queryset = get_filtered_queryset(request)
    
    data = queryset.values('year', 'month').annotate(
        total_sales=Sum('sales_value')
    ).order_by('year', 'month')
    
    labels = [f"{item['year']}-{item['month']}" for item in data]
    sales_data = [float(item['total_sales']) / 1000000 for item in data]
    
    chart_data = {
        'labels': labels,
        'data': sales_data,
        'borderColor': ['rgba(255, 99, 132, 1)'] * len(labels),
        'backgroundColor': ['rgba(255, 99, 132, 0.2)'] * len(labels)
    }
    
    serializer = ChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def market_share(request):
    """Get market share data for pie/donut chart"""
    queryset = get_filtered_queryset(request)
    
    # Get market share by brand
    data = queryset.values('brand').annotate(
        total_sales=Sum('sales_value'),
        total_volume=Sum('volume')
    ).order_by('-total_sales')
    
    labels = [item['brand'] for item in data]
    sales_data = [float(item['total_sales']) for item in data]
    
    # Generate colors for pie chart
    colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
    ]
    
    chart_data = {
        'labels': labels,
        'data': sales_data,
        'backgroundColor': colors[:len(labels)],
        'borderColor': colors[:len(labels)]
    }
    
    serializer = ChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def year_wise_sales_vertical(request):
    """Get year-wise sales value by brand for vertical bar chart"""
    queryset = get_filtered_queryset(request)
    data = queryset.values('brand', 'year').annotate(total_sales=Sum('sales_value')).order_by('brand', 'year')

    if not data:
        return Response({"labels": [], "datasets": []})

    df = pd.DataFrame(list(data))
    pivot_df = df.pivot(index='brand', columns='year', values='total_sales').fillna(0)

    brands = pivot_df.index.tolist()
    years = pivot_df.columns.tolist()
    colors = get_chart_colors()

    datasets = []
    for i, year in enumerate(years):
        datasets.append({
            'label': str(year),
            'data': [float(value) / 1000000 for value in pivot_df[year]],
            'backgroundColor': colors[i % len(colors)],
        })

    chart_data = {'labels': brands, 'datasets': datasets}
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data) 