from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Avg
from django.db.models.functions import TruncMonth
import pandas as pd
import numpy as np
import calendar
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
    channel = request.GET.get('channel')
    brand = request.GET.get('brand')
    pack_type = request.GET.get('pack_type')
    ppg = request.GET.get('ppg')
    year = request.GET.get('year')

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

@api_view(['GET'])
def get_data(request):
    """Get filtered retail data"""
    queryset = get_filtered_queryset(request)
    serializer = RetailDataSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_filters(request):
    """Get available filter options"""
    channels = RetailData.objects.values_list('channel', flat=True).distinct().order_by('channel')
    brands = RetailData.objects.values_list('brand', flat=True).distinct().order_by('brand')
    pack_types = RetailData.objects.values_list('pack_type', flat=True).distinct().order_by('pack_type')
    ppgs = RetailData.objects.values_list('ppg', flat=True).distinct().order_by('ppg')
    years = RetailData.objects.values_list('year', flat=True).distinct().order_by('year')
    
    data = {
        'channels': list(channels),
        'brands': list(brands),
        'pack_types': list(pack_types),
        'ppgs': list(ppgs),
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
            'data': [float(value) for value in pivot_df[brand]],
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
            'data': [float(value) for value in pivot_df[brand]],
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
    
    labels = [f"{calendar.month_abbr[item['month']]} {item['year']}" for item in data]
    sales_data = [float(item['total_sales']) for item in data]
    
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
    """Get market share data for pie/donut chart by sales or volume"""
    queryset = get_filtered_queryset(request)
    metric = request.GET.get('metric', 'sales')  # Default to sales

    if metric == 'volume':
        annotation = {'total_volume': Sum('volume')}
        order_by_field = '-total_volume'
        data_field = 'total_volume'
    else:  # Default to sales
        annotation = {'total_sales': Sum('sales_value')}
        order_by_field = '-total_sales'
        data_field = 'total_sales'

    data = queryset.values('brand').annotate(**annotation).order_by(order_by_field)

    labels = [item['brand'] for item in data]
    chart_values = [float(item[data_field]) for item in data]
    colors = get_chart_colors()

    chart_data = {
        'labels': labels,
        'data': chart_values,
        'backgroundColor': colors[:len(labels)],
        'borderColor': ['#FFFFFF'] * len(labels)
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
            'data': [float(value) for value in pivot_df[year]],
            'backgroundColor': colors[i % len(colors)],
        })

    chart_data = {'labels': brands, 'datasets': datasets}
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data) 