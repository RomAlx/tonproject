from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def root():
    return {"HELLO": "WORLD!"}


@router.get("/items/")
async def read_items():
    return {"message": "Reading all items"}


@router.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
