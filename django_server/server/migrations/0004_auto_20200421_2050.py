# Generated by Django 3.0.3 on 2020-04-21 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20200421_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question1',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question2',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question3',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question4',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question5',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question6',
            field=models.CharField(max_length=1),
        ),
        migrations.AlterField(
            model_name='asthmacontrolquestionnaire',
            name='question7',
            field=models.CharField(max_length=1),
        ),
    ]
