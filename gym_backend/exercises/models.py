from django.db import models

class Exercise(models.Model):
    title = models.CharField(max_length=255)
    body_part = models.CharField(max_length=255)
    level = models.CharField(max_length=50)

    def __str__(self):
        return self.title
