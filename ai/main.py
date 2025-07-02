from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Transaction(BaseModel):
    amount: float
    category: str

@app.post('/insights')
def generate_insight(tx: Transaction):
    """Return a placeholder financial insight."""
    # TODO: integrate AI model
    return {"message": "Insight generation not implemented"}

