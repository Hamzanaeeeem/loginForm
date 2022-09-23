import bcrypt
from flask import Flask
from flask_cors import CORS
import jwt
from flask import request
from db import get_user_by_username
from argon2 import PasswordHasher

app = Flask(__name__)
CORS(app)
ph = PasswordHasher()

@app.route("/login", methods=["POST", "GET"])
def hello_world():
    print(request.form.get("user"))
    print(request.form.get("password"))
    
    hashed_password_DB = get_user_by_username(request.form.get("user"))
    password = request.form.get("password")
    
    encoded_jwt = jwt.encode({"user": "hamza"}, "secret", algorithm="HS256")

    try:
    	ph.verify(hashed_password_DB, password)
    except:
        return {"success": False, "JWT": encoded_jwt}
    return {"success": True, "JWT": encoded_jwt}


@app.route("/protected", methods=["POST", "GET"]) 

def index() :
    #get jwt token from header verify jwt_token
    #if jwt_token is not valid => return access denied 
    #else => return protected data
    
    pass
     
