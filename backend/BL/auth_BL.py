from flask import make_response
import jwt
import requests
from pymongo import MongoClient
from BL.user_BL import UserBL


class AuthBL:
    def __init__(self):
        self.__key = "secret"
        self.__algorithm = "HS256"
        self.user_bl = UserBL()
        self.__mongo_client = MongoClient(port=27017)
        self.__db = self.__mongo_client["Factory"]


    
    def get_token(self, username, password):
        user_id = self.__check_user(username,password)
        if user_id is not None:
            token = jwt.encode({"userid" : user_id},self.__key, self.__algorithm )
            return make_response({"token" : token }, 200)
        else:
            return make_response({"error" : "Your not authorized" }, 401)



    def verify_token(self, token):
        data = jwt.decode(token, self.__key, self.__algorithm)
        user_id = data["userid"]
        #Check existance of that user id...
        user_exist_status = self.user_bl.check_exist(user_id)
        if user_exist_status == True:
            return [True,user_id]
        else:
            return [False,user_id]


    def __check_user(self,username, pwd):
        #Check existance of that user in data source and if exists - returns a unique value
        resp = requests.get("https://jsonplaceholder.typicode.com/users")
        users = resp.json()
        user_names = list(map(lambda x: x["username"],users))
        user_emails = list(map(lambda x: x["email"],users))
        user_obj = list(filter(lambda x: x["username"] == username,users))
        user_fullname = user_obj[0]["name"]
        if username in user_names and pwd in user_emails:
            users_from_db = self.user_bl.get_all_users()
            user_logged_in = list((filter(lambda x: x["FullName"] == user_fullname,users_from_db)))
            if len(user_logged_in) == 0:
                user = {}
                user["FullName"] = user_fullname
                user["UserName"] = username
                user["MaxActions"] = 20
                user["actionAllowed"] = 20
                self.user_bl.add_user(user)
                # return "userid"
                return user_fullname
            else:
                return user_fullname
        else:
            return 