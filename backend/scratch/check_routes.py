from main import app
from fastapi.routing import APIRoute

print("--- Registered Routes ---")
for route in app.routes:
    if isinstance(route, APIRoute):
        print(f"Path: {route.path}, Methods: {route.methods}, Name: {route.name}")
    else:
        print(f"Other: {route.path}")
