from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from models import *

app = FastAPI()

@app.get('/')
def index():
    return {"message":"go to /docs for the docs ;)"}

@app.post('/add_activity')
async def add_activity(payload: activity_request):
    activity_obj = await Activity.create(**payload.dict(exclude_unset=True))
    response = await activity_pydantic.from_tortoise_orm(activity_obj)
    return {"status": "success", "response": response}

@app.get('/get_all_activity')
async def get_all_activity():
    response = await activity_pydantic.from_queryset(Activity.all())
    return {"status": "success", "response": response}

@app.get('/get_activity/{name}')
async def get_activity_by_name(name: str):
    response = await activity_pydantic.from_queryset_single(Activity.get(name=name))
    return {"status": "success", "response": response}

@app.put('/update_activity/{id}')
async def update_activity_by_id(id: int, update_info: activity_request):
    activity_data = await Activity.get(id=id)
    update_info = update_info.dict(exclude_unset=True)
    activity_data.name = update_info['name']
    activity_data.class_name = update_info['class_name']
    await activity_data.save()
    response = await activity_pydantic.from_tortoise_orm(activity_data)
    return {"status": "success", "response": response}

@app.delete('/delete_activity/{id}')
async def delete_activity_by_id(id: int):
    activity_obj = await Activity.filter(id=id).first()
    if activity_obj:
        await activity_obj.delete()
        return {"status": "success", "message": "Activity deleted successfully"}
    else:
        return {"status": "error", "message": "Activity not found"}

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)