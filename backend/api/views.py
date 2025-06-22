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
from .services import (
    get_filtered_queryset,
    get_sales_by_year,
    get_volume_by_year,
    get_monthly_trend,
    get_market_share,
    get_year_wise_sales_vertical,
)

def get_chart_colors():
    return [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF'
    ]

@api_view(['GET'])
def get_data(request):
    params = request.GET
    queryset = get_filtered_queryset(params)
    serializer = RetailDataSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_filters(request):
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
    chart_data = get_sales_by_year(request.GET)
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def volume_by_year(request):
    chart_data = get_volume_by_year(request.GET)
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def monthly_trend(request):
    chart_data = get_monthly_trend(request.GET)
    serializer = ChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def market_share(request):
    metric = request.GET.get('metric', 'sales')
    chart_data = get_market_share(request.GET, metric)
    serializer = ChartDataSerializer(chart_data)
    return Response(serializer.data)

@api_view(['GET'])
def year_wise_sales_vertical(request):
    chart_data = get_year_wise_sales_vertical(request.GET)
    serializer = StackedChartDataSerializer(chart_data)
    return Response(serializer.data) 