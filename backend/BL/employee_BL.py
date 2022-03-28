from pymongo import MongoClient
from bson import ObjectId
import jwt

class EmployeeBL:
  def __init__(self):
    self.__mongo_client = MongoClient(port=27017)
    self.__db = self.__mongo_client["Factory"]

  def get_all_employees(self):
    emps = []
    emps_cursor = self.__db["employees"].find({})
    for emp in emps_cursor:
      emps.append(emp)
    return emps

  def get_employee(self,id):
    emp = self.__db["employees"].find_one({"_id":ObjectId(id)})
    return emp

  def get_employee_shifts(self,id):
    emp = self.__db["employees"].find_one({"_id":ObjectId(id)})
    if "Shifts" in emp:
      return emp["Shifts"]

  def add_employee(self,obj):
    emp = {}
    emp["FirstName"] = obj["FirstName"]
    emp["LastName"] = obj["LastName"]
    emp["StartWorkYear"] = obj["StartWorkYear"]
    if "DepartmentId" in obj:
      emp["DepartmentId"] = obj["DepartmentId"]
    if "Shifts" in obj:
      emp["Shifts"] = obj["Shifts"]

    self.__db["employees"].insert_one(emp)
    return "Created with ID: " + str(emp["_id"])

  def add_shift_to_employee(self,id,shift_id):
    emp = self.__db["employees"].find_one({"_id":ObjectId(id)})
    shift = self.__db["shifts"].find_one({"_id":ObjectId(shift_id)})
    shifts_array = []
    if "Shifts" in emp:
      for s in emp["Shifts"]:
        shifts_array.append(s)
    shifts_array.append(shift)
    
    self.__db["employees"].update_one({"_id":ObjectId(id)},{"$set" : {"Shifts": shifts_array}})
    # self.__db["employees"].insert_one({"_id":ObjectId(id)},{"Shifts": shifts_array})
    return "Shift added to employee ID: " + str(emp["_id"])

  def add_department_to_employee(self,id,department_id):
    emp = self.__db["employees"].find_one({"_id":ObjectId(id)})
    department = self.__db["departments"].find_one({"_id":ObjectId(department_id)})
    departments_array = []
    if "DepartmentId" in emp:
      for d in emp["DepartmentId"]:
        departments_array.append(d)
    departments_array.append(department)
    
    self.__db["employees"].update_one({"_id":ObjectId(id)},{"$set" : {"DepartmentId": departments_array}})
    # self.__db["employees"].insert_one({"_id":ObjectId(id)},{"Shifts": shifts_array})
    return "Department added to employee ID: " + str(emp["_id"])

  def update_employee(self,id,obj):
    emp = {}
    emp["FirstName"] = obj["FirstName"]
    emp["LastName"] = obj["LastName"]
    emp["StartWorkYear"] = obj["StartWorkYear"]
    if "Shifts" in obj:
      emp["Shifts"] = obj["Shifts"]
    if "DepartmentId" in obj:
      emp["DepartmentId"] = obj["DepartmentId"]

    self.__db["employees"].update_one({"_id":ObjectId(id)},{"$set":emp})    
    return "Updated!"

  def delete_employee(self,id):
    self.__db["employees"].delete_one({"_id":ObjectId(id)})
    return "Deleted!"
