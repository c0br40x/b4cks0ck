#Written:@CodingChar

"""
Modulos:
"""

import pymongo, json, requests, datetime 

"""
MongoDB Post Database:
"""

class MongoDB:
    def __init__(self, author):
        self.author = author

    def GetIPv4(self):
        return json.loads(requests.get("http://ip-api.com/json/").text)["query"]

    def PostInfo(self):
        with open("./settings.json") as file:
            data = json.load(file)

        client = pymongo.MongoClient(data["MongoURI"], serverSelectionTimeoutMS = 5000)
        database = client["xk4t4n4"]
        data = database["schemas"]       
        ids = data.count_documents({})

        Structs = { 
            "id": int(ids), 
            "OneContent": "", 
            "TwoContent": "", 
            "ThreeContent": f"{self.GetIPv4()}", 
            "Author": f"{self.author}",
            "Fecha": datetime.datetime.now()             
        }

        data.insert_one(Structs)

"""
Run:
"""

if __name__ == "__main__":
    Mongo = MongoDB("CodingChar")
    Mongo.PostInfo()