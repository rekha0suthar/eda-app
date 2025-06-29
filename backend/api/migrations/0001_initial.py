# Generated by Django 4.2.7 on 2025-06-22 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RetailData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('market', models.CharField(max_length=100)),
                ('channel', models.CharField(max_length=100)),
                ('region', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('subcategory', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=100)),
                ('variant', models.CharField(max_length=100)),
                ('pack_type', models.CharField(max_length=100)),
                ('ppg', models.CharField(max_length=100)),
                ('pack_size', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('month', models.IntegerField()),
                ('week', models.IntegerField()),
                ('date', models.DateTimeField()),
                ('br_cat_id', models.CharField(max_length=100)),
                ('sales_value', models.FloatField()),
                ('volume', models.FloatField()),
                ('volume_units', models.FloatField()),
                ('d1', models.FloatField(blank=True, null=True)),
                ('d2', models.FloatField(blank=True, null=True)),
                ('d3', models.FloatField(blank=True, null=True)),
                ('d4', models.FloatField(blank=True, null=True)),
                ('d5', models.FloatField(blank=True, null=True)),
                ('d6', models.FloatField(blank=True, null=True)),
                ('av1', models.FloatField(blank=True, null=True)),
                ('av2', models.FloatField(blank=True, null=True)),
                ('av3', models.FloatField(blank=True, null=True)),
                ('av4', models.FloatField(blank=True, null=True)),
                ('av5', models.FloatField(blank=True, null=True)),
                ('av6', models.FloatField(blank=True, null=True)),
                ('ev1', models.FloatField(blank=True, null=True)),
                ('ev2', models.FloatField(blank=True, null=True)),
                ('ev3', models.FloatField(blank=True, null=True)),
                ('ev4', models.FloatField(blank=True, null=True)),
                ('ev5', models.FloatField(blank=True, null=True)),
                ('ev6', models.FloatField(blank=True, null=True)),
                ('prep_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'retail_data',
                'indexes': [models.Index(fields=['year'], name='retail_data_year_8b0c18_idx'), models.Index(fields=['brand'], name='retail_data_brand_85dbca_idx'), models.Index(fields=['pack_type'], name='retail_data_pack_ty_f63df9_idx'), models.Index(fields=['channel'], name='retail_data_channel_e3931a_idx')],
            },
        ),
    ]
