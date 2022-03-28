from pymongo import MongoClient
from bson import ObjectId

class ShiftBL:
  def __init__(self):
    self.__mongo_client = MongoClient(port=27017)
    self.__db = self.__mongo_client["Factory"]

  def get_all_shifts(self):
    shifts = []
    shifts_cursor = self.__db["shifts"].find({})
    for shift in shifts_cursor:
      shifts.append(shift)
    return shifts

  def get_shift(self,id):
    shift = self.__db["shifts"].find_one({"_id":ObjectId(id)})
    return shift

  def add_shift(self,obj):
    shift = {}
    shift["Date"] = obj["Date"]
    shift["StartingHour"] = obj["StartingHour"]
    shift["EndingHour"] = obj["EndingHour"]

    self.__db["shifts"].insert_one(shift)
    return "Created with ID: " + str(shift["_id"])

  def update_shift(self,id,obj):
    shift = {}
    shift["Date"] = obj["Date"]
    shift["StartingHour"] = obj["StartingHour"]
    shift["EndingHour"] = obj["EndingHour"]

    self.__db["shifts"].update_one({"_id":ObjectId(id)},{"$set":shift})    
    return "Updated!"

  def delete_shift(self,id):
    self.__db["shifts"].delete_one({"_id":ObjectId(id)})
    return "Deleted!"
