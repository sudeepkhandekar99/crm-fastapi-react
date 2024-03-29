from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator

# product = student 
class Student(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, nullable=False)
    email = fields.CharField(max_length=100, nullable=False)
    phone = fields.IntField(nullable=False)
    activity_details = fields.ForeignKeyField('models.Activity', related_name='activity_details')

# supplier = activity
class Activity(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, nullable=False)
    class_name = fields.CharField(max_length=100, nullable=False)

# create pydantic models
student_pydantic = pydantic_model_creator(Student, name="Student")
student_request = pydantic_model_creator(Student, name="StudentRequest", exclude_readonly=True)
activity_pydantic = pydantic_model_creator(Activity, name="Activity")
activity_request = pydantic_model_creator(Activity, name="ActivityRequest", exclude_readonly=True)


