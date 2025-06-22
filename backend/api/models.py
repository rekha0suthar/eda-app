from django.db import models

class RetailData(models.Model):
    """Model for storing FMCG retail data"""
    market = models.CharField(max_length=100)
    channel = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    variant = models.CharField(max_length=100)
    pack_type = models.CharField(max_length=100)
    ppg = models.CharField(max_length=100)
    pack_size = models.CharField(max_length=100)
    year = models.IntegerField()
    month = models.IntegerField()
    week = models.IntegerField()
    date = models.DateTimeField()
    br_cat_id = models.CharField(max_length=100)
    sales_value = models.FloatField()
    volume = models.FloatField()
    volume_units = models.FloatField()
    d1 = models.FloatField(null=True, blank=True)
    d2 = models.FloatField(null=True, blank=True)
    d3 = models.FloatField(null=True, blank=True)
    d4 = models.FloatField(null=True, blank=True)
    d5 = models.FloatField(null=True, blank=True)
    d6 = models.FloatField(null=True, blank=True)
    av1 = models.FloatField(null=True, blank=True)
    av2 = models.FloatField(null=True, blank=True)
    av3 = models.FloatField(null=True, blank=True)
    av4 = models.FloatField(null=True, blank=True)
    av5 = models.FloatField(null=True, blank=True)
    av6 = models.FloatField(null=True, blank=True)
    ev1 = models.FloatField(null=True, blank=True)
    ev2 = models.FloatField(null=True, blank=True)
    ev3 = models.FloatField(null=True, blank=True)
    ev4 = models.FloatField(null=True, blank=True)
    ev5 = models.FloatField(null=True, blank=True)
    ev6 = models.FloatField(null=True, blank=True)
    prep_date = models.DateTimeField()

    def __str__(self):
        return f"{self.year} - {self.brand} - {self.variant}"

    class Meta:
        db_table = 'retail_data'
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['brand']),
            models.Index(fields=['pack_type']),
            models.Index(fields=['channel']),
        ] 