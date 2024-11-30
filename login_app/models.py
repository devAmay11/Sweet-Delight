from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserListManager

class  CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True) 
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    full_name = models.CharField(max_length=50,default='')
    mobile = models.BigIntegerField(default='0')    
    is_active = models.BooleanField(default=True)
    otp = models.IntegerField(default=0)

    objects =  UserListManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.email