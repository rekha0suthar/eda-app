from django.db import models

class RetailData(models.Model):
    """Model for storing FMCG retail data"""
    year = models.IntegerField()
    month = models.CharField(max_length=20)
    brand = models.CharField(max_length=100)
    pack_type = models.CharField(max_length=50)
    ppg = models.CharField(max_length=50)
    channel = models.CharField(max_length=50)
    sales_value = models.DecimalField(max_digits=15, decimal_places=2)
    volume_kg = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = 'retail_data'
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['brand']),
            models.Index(fields=['pack_type']),
            models.Index(fields=['channel']),
        ]
    
    def __str__(self):
        return f"{self.brand} - {self.year} - {self.sales_value}" 