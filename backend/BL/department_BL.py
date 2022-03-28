from ast import Str
from pymongo import MongoClient
from bson import ObjectId

class DepartmentBL:
  def __init__(self):
    self.__mongo_client = MongoClient(port=27017)
    self.__db = self.__mongo_client["Factory"]

  def get_all_departments(self):
    deps = []
    deps_cursor = self.__db["departments"].find({})
    for dep in deps_cursor:
      deps.append(dep)
    return deps

  def get_department(self,id):
    dep = self.__db["departments"].find_one({"_id":ObjectId(id)})
    return dep

  def add_department(self,obj):
    dep = {}
    dep["Name"] = obj["Name"]
    dep["Manager"] = obj["Manager"]

    self.__db["departments"].insert_one(dep)
    return "Created with ID: " + str(dep["_id"])

  def update_department(self,id,obj):
    dep = {}
    dep["Name"] = obj["Name"]
    dep["Manager"] = obj["Manager"]
    
    depp = self.__db["departments"].find_one({"_id":ObjectId(id)})
    all_emp = self.__db["employees"].find({})
    for e in all_emp:
      if "DepartmentId" in e:
        # for d in e["DepartmentId"]:
        for d in range(0,len(e["DepartmentId"])):
          if e["DepartmentId"][d]["Name"] == depp["Name"]:
          # if d["Name"] == depp["Name"]:
            self.__db["employees"].update_one({"_id":e["_id"]},{"$set":{"DepartmentId."+str(d)+".Name":obj["Name"]}})
            if e["DepartmentId"][d]["Manager"] == depp["Manager"]:
              self.__db["employees"].update_one({"_id":e["_id"]},{"$set":{"DepartmentId."+str(d)+".Manager":obj["Manager"]}})
              
    self.__db["departments"].update_one({"_id":ObjectId(id)},{"$set":dep}) 
    
    return "Updated!"

  def delete_department(self,id):
    dep = self.__db["departments"].find_one({"_id":ObjectId(id)})
    self.__db["departments"].delete_one({"_id":ObjectId(id)})
    all_emp = self.__db["employees"].find({})
    for e in all_emp:
      if "DepartmentId" in e:
        # for d in e["DepartmentId"]:
        for d in range(0,len(e["DepartmentId"])):
          if e["DepartmentId"][d]["Name"] == dep["Name"]:
          # if d["Name"] == dep["Name"]:
            self.__db["employees"].update_one({"_id":e["_id"]},{"$pull":{"DeparartmentId":{"$in":e["DepartmentId"][d]}}})
    return "Deleted!"
