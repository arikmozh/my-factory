from cmath import log
from flask import jsonify, make_response, request
from flask import Flask, jsonify
from flask_cors import CORS
import json
from bson import ObjectId
from pymongo import MongoClient


from BL.auth_BL import AuthBL
from BL.employee_BL import EmployeeBL
from BL.department_BL import DepartmentBL
from BL.shift_BL import ShiftBL
from BL.user_BL import UserBL

app = Flask(__name__)

CORS(app)

class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)

app.json_encoder = MyEncoder

auth_bl = AuthBL()
user_bl = UserBL()
employee_bl = EmployeeBL()
department_bl = DepartmentBL()
shift_bl = ShiftBL()

mongo_client = MongoClient(port=27017)
db = mongo_client["Factory"]

@app.route('/getAllFactory',methods=['GET'])
def get_all_factory_data():
    all_data = {}
    all_data["users"] = []
    all_data["employees"] = []
    all_data["departments"] = []
    all_data["shifts"] = []

    users = db["users"].find({})
    for u in users:
        all_data["users"].append(u)
    employees = db["employees"].find({})
    for e in employees:
        all_data["employees"].append(e)
    departments = db["departments"].find({})
    for d in departments:
        all_data["departments"].append(d)
    shifts = db["shifts"].find({})
    for s in shifts:
        all_data["shifts"].append(s)

    return all_data

#------------------------------------------------- LOGIN -------------------------------------------------
@app.route('/auth/login', methods = ['POST'])
def login():
    username = request.json["username"]
    pwd = request.json["password"]
    token = auth_bl.get_token(username,pwd)
    return token

#--------------------------------------------- Users ------------------------------------------------
@app.route('/users/<string:username>', methods = ['GET']) #GET X DEPARTMENT
def get_user(username):
    # if request.headers and request.headers.get("x-access-token"):
    #     token = request.headers.get("x-access-token")
    #     exist = auth_bl.verify_token(token)
    #     if exist[0] == True:
    #         num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
    #         if num_of_actions_status == True:
    if(username!=""):
        userfullname = user_bl.get_user_by_name(username)
        return jsonify(userfullname)
    else:
            return make_response({"error" : "Your not authorized" }, 401)
#--------------------------------------------- DEPARTMENT ------------------------------------------------
@app.route('/departments', methods = ['GET']) #GET ALL DEPARTMENTS
def get_all_departments():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                departments = department_bl.get_all_departments()
                return jsonify(departments)
            else:
                return "Your actions got to the limit for today"
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/departments/<string:id>', methods = ['GET']) #GET X DEPARTMENT
def get_department(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                department = department_bl.get_department(id)
                return jsonify(department)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/departments', methods = ['POST']) #ADD DEPARTMENT
def add_department():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = department_bl.add_department(request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/departments/<string:id>', methods = ['PUT']) #UPDATE DEPARTMENT
def update_department(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = department_bl.update_department(id,request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/departments/<string:id>', methods=['DELETE']) # DELETE DEPARTMENT X
def delete_department(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = department_bl.delete_department(id)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)


#--------------------------------------------- EMPLOYEES -------------------------------------------------
@app.route('/employees', methods = ['GET']) #GET ALL EMPLOYEES
def get_all_employees():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                employees = employee_bl.get_all_employees()
                return jsonify(employees)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees/<string:id>', methods = ['GET']) #GET X EMPLOYEE
def get_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                employee = employee_bl.get_employee(id)
                return jsonify(employee)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees', methods = ['POST']) #ADD EMPLOYEE
def add_employee():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.add_employee(request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees/<string:id>/<string:shift>', methods = ['POST']) #ADD SHIFT TO EMPLOYEE
def add_shift_to_employee(id,shift):
    # /employees/id/?shift=""
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.add_shift_to_employee(id,shift)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees/department/<string:id>/<string:department>', methods = ['POST']) #ADD department TO EMPLOYEE
def add_department_to_employee(id,department):
    # /employees/id/department
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.add_department_to_employee(id,department)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)


@app.route('/employees/getShifts/<string:id>', methods = ['GET']) #GET All employee SHIFTs
def get_shifts_of_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.get_employee_shifts(id)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees/<string:id>', methods = ['PUT']) #UPDATE EMPLOYEE
def update_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.update_employee(id,request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/employees/<string:id>', methods=['DELETE']) # DELETE EMPLOYEE X
def delete_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = employee_bl.delete_employee(id)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

#------------------------------------------------ SHIFTS -------------------------------------------------
@app.route('/shifts', methods = ['GET']) #GET ALL SHIFTS
def get_all_shifts():  
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                shifts = shift_bl.get_all_shifts()
                return jsonify(shifts)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/shifts/<string:id>', methods = ['GET']) #GET X SHIFT
def get_shift(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                shift = shift_bl.get_shift(id)
                return jsonify(shift)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/shifts', methods = ['POST']) #ADD SHIFT
def add_shift():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = shift_bl.add_shift(request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/shifts/<string:id>', methods = ['PUT']) #UPDATE SHIFT
def update_shift(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = shift_bl.update_shift(id,request.json)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)

@app.route('/shifts/<string:id>', methods=['DELETE']) # DELETE SHIFT X
def delete_shift(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist[0] == True:
            num_of_actions_status = user_bl.decrese_user_NumOfActions(exist[1])
            if num_of_actions_status == True:
                status = shift_bl.delete_shift(id)
                return jsonify(status)
        else:
            return make_response({"error" : "Your not authorized" }, 401)
    else:
        return make_response({"error" : "Your not authorized" }, 401)



app.run()