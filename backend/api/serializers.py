from rest_framework import serializers
from .models import RetailData

class RetailDataSerializer(serializers.ModelSerializer):
    """Serializer for RetailData model"""
    class Meta:
        model = RetailData
        fields = '__all__'

class FilterOptionsSerializer(serializers.Serializer):
    """Serializer for filter options"""
    brands = serializers.ListField(child=serializers.CharField())
    pack_types = serializers.ListField(child=serializers.CharField())
    ppgs = serializers.ListField(child=serializers.CharField())
    channels = serializers.ListField(child=serializers.CharField())
    years = serializers.ListField(child=serializers.IntegerField())

class ChartDataSerializer(serializers.Serializer):
    """Serializer for chart data"""
    labels = serializers.ListField(child=serializers.CharField())
    data = serializers.ListField(child=serializers.FloatField())
    backgroundColor = serializers.ListField(child=serializers.CharField(), required=False)
    borderColor = serializers.ListField(child=serializers.CharField(), required=False) 