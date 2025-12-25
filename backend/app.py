from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os

app = (Flask(__name__))
CORS(app)

filePath = os.path.join(os.path.dirname(__file__), "tasks.json")

def getData():
    if not os.path.exists(filePath):
        return []
    
    with open(filePath, "r", encoding="utf-8") as file:
        return json.load(file)
    
def saveData(data):
    with open(filePath, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)
    
@app.route('/tasks', methods=["GET"])
def getTasks():
    data = getData()
    return jsonify(data)

@app.route('/tasks/<int:id>', methods=["PUT"])
def editStatus(id):
    data = request.get_json()
    newStatus = data.get("newStatus")

    tasks = getData()
    for task in tasks:
        if task["id"] == id:
            task["status"] = newStatus
            break

    saveData(tasks)
    return jsonify({"msg": "succes"})

@app.route('/tasks/', methods=["POST"])
def createTask():
    data = getData()

    newReq = request.get_json()
    newId = max([task["id"] for task in data], default=0) +1

    newTask = {
        "id": newId,
        "status": "todo",
        "title": newReq.get("title"),
        "desc": newReq.get("desc"),
        "deadline": newReq.get("deadline")
    }

    data.append(newTask)
    saveData(data)
    return jsonify({"msg": "succes"})





if __name__ == '__main__':
    app.run(debug=True)