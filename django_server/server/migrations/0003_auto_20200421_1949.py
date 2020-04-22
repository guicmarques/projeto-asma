# Generated by Django 3.0.3 on 2020-04-21 22:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('server', '0002_auto_20200421_1629'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofileinfo',
            name='altura',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4),
        ),
        migrations.AlterField(
            model_name='userprofileinfo',
            name='peso',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4),
        ),
        migrations.AlterField(
            model_name='userprofileinfo',
            name='rg',
            field=models.IntegerField(blank=True),
        ),
        migrations.CreateModel(
            name='AsthmaControlQuestionnaire',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question1', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question2', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question3', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question4', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question5', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question6', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('question7', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
                ('date', models.DateField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique_for_date='date')),
            ],
        ),
    ]
