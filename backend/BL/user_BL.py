from pymongo import MongoClient
from bson import ObjectId
import json 
import os
import sys

class UserBL:
  def __init__(self):
    self.__mongo_client = MongoClient(port=27017)
    self.__db = self.__mongo_client["Factory"]

  def get_all_users(self):
    users = []
    users_cursor = self.__db["users"].find({})
    for user in users_cursor:
      users.append(user)
    return users

  def get_user(self,id):
    user = self.__db["users"].find_one({"_id":ObjectId(id)})
    return user

  def get_user_by_name(self,username):
    user = self.__db["users"].find_one({"UserName":username})
    return user["FullName"]

  def add_user(self,obj):
    user = {}
    user["FullName"] = obj["FullName"]
    user["UserName"] = obj["UserName"]
    user["MaxActions"] = obj["MaxActions"]
    user["actionAllowed"] = obj["actionAllowed"]

    self.__db["users"].insert_one(user)
    return "Created with ID: " + str(user["_id"])

  def check_exist(self,userfullname):
    user = self.__db["users"].find_one({"FullName":userfullname})
    if user is None:
      return False
    else:
      return True

  def decrese_user_NumOfActions(self,userfullname):
    user = self.__db["users"].find_one({"FullName":userfullname})
    if user["actionAllowed"] > 0:
      self.__db["users"].update_one({"_id":user["_id"]},{"$set": {"actionAllowed": user["actionAllowed"]-1}}) 
      userr = self.__db["users"].find_one({"FullName":userfullname})
      try:
        u = {}
        u["id"] = str(userr["_id"])
        u["FullName"] = userr["FullName"]
        u["UserName"] = userr["UserName"]
        u["MaxActions"] = userr["MaxActions"]
        u["actionAllowed"] = userr["actionAllowed"]
        with open(os.path.join(sys.path[0],"actions.json"),'r') as f:
          data = json.load(f)
          f.close
        data["actions"].append(u)
        with open(os.path.join(sys.path[0],"actions.json"),'w') as f:
          json.dump(data,f)
      except:
        obj={"actions":[]}
        u = {}
        u["id"] = str(userr["_id"])
        u["FullName"] = userr["FullName"]
        u["UserName"] = userr["UserName"]
        u["MaxActions"] = userr["MaxActions"]
        u["actionAllowed"] = userr["actionAllowed"]
        obj["actions"].append(u)
        with open(os.path.join(sys.path[0],"actions.json"),'w') as f:
          json.dump(obj,f)
      return True
    else:
      return False
