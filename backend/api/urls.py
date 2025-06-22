from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.get_data, name='get_data'),
    path('filters/', views.get_filters, name='get_filters'),
    path('charts/sales-by-year/', views.sales_by_year, name='sales_by_year'),
    path('charts/volume-by-year/', views.volume_by_year, name='volume_by_year'),
    path('charts/monthly-trend/', views.monthly_trend, name='monthly_trend'),
    path('charts/market-share/', views.market_share, name='market_share'),
    path('charts/year-wise-sales-vertical/', views.year_wise_sales_vertical, name='year_wise_sales_vertical'),
] 