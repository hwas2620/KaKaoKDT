from fastapi import FastAPI, HTTPException, Request
import datetime

app = FastAPI()

menu_db = {
    1: {"name": "아메리카노", "price": 4000, "description": "에스프레소에 물을 더해 부드럽게 마실 수 있는 커피입니다."},
    2: {"name": "카페라떼", "price": 4500, "description": "에스프레소와 우유가 조화롭게 어우러진 부드러운 커피입니다."},
    3: {"name": "카푸치노", "price": 4500, "description": "풍성한 우유 거품과 시나몬 파우더가 올라간 커피입니다."}
}

orders_db = {}
next_order_id = 1

@app.get("/menu")
def get_all_menu():
    return [{"item_id": id, **details} for id, details in menu_db.items()]

@app.get("/menu/{item_id}")
def get_menu_item(item_id: int):
    if item_id not in menu_db:
        raise HTTPException(status_code=404, detail="Menu not found")
    return {"item_id": item_id, **menu_db[item_id]}

@app.post("/orders")
async def create_order(request: Request):
    global next_order_id
    
    try:
        order_data = await request.json()
        order_items = order_data["items"]
    except:
        raise HTTPException(status_code=400, detail="Invalid JSON format or missing 'items' key")

    total_price = 0
    ordered_items_list = []
    
    if not isinstance(order_items, list):
        raise HTTPException(status_code=400, detail="'items' must be a list")

    for item in order_items:
        item_id = item.get("item_id")
        quantity = item.get("quantity")

        if not (isinstance(item_id, int) and isinstance(quantity, int) and quantity > 0):
             raise HTTPException(status_code=400, detail=f"Invalid item data: {item}")

        if item_id not in menu_db:
            raise HTTPException(status_code=400, detail=f"Menu item {item_id} not found")
        
        menu_item = menu_db[item_id]
        total_price += menu_item["price"] * quantity
        ordered_items_list.append({
            "item_id": item_id,
            "name": menu_item["name"],
            "quantity": quantity
        })
        
    new_order = {
        "order_id": next_order_id,
        "status": "pending",
        "ordered_items": ordered_items_list,
        "total_price": total_price,
        "order_time": datetime.datetime.now()
    }
    
    orders_db[next_order_id] = new_order
    next_order_id += 1
    
    return new_order

@app.get("/orders/{order_id}")
def get_order(order_id: int):
    if order_id not in orders_db:
        raise HTTPException(status_code=404, detail="Order not found")
    return orders_db[order_id]