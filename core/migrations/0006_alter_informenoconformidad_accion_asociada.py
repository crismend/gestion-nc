# Generated by Django 5.1.7 on 2025-05-15 21:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_informeaccion_origen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informenoconformidad',
            name='accion_asociada',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='no_conformidades_asociadas', to='core.informeaccion'),
        ),
    ]
