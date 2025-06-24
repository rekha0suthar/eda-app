from django.db import models

class RetailData(models.Model):
    """Model for storing FMCG retail data"""
    channel = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    pack_type = models.CharField(max_length=100)
    ppg = models.CharField(max_length=100)
    year = models.IntegerField()
    month = models.IntegerField()
    sales_value = models.FloatField()
    volume = models.FloatField()

    def __str__(self):
        return f"{self.year} - {self.brand}"

    class Meta:
        db_table = 'retail_data'
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['brand']),
            models.Index(fields=['pack_type']),
            models.Index(fields=['channel']),
        ] 