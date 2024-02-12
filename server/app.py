from config import app, db
from flask import make_response, request, session
from models import User, UserCodeJoin, ProviderCode
from sqlalchemy import UniqueConstraint

@app.route('/')
def index():
    return ''

# users ------------------------------------------------------------------------
@app.route('/users', methods=['POST'])
def users():
    if request.method == 'POST':
        form_data = request.get_json()
        try:
            new_user_obj = User(
                email = form_data['email'],
                _password_hash = form_data['_password_hash'],
                type = form_data['type']
            )
            db.session.add(new_user_obj)
            db.session.commit()
            response = make_response(
                new_user_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to users"]},
                400
            )
            return response
        return response

@app.route('/user/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_by_id(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == 'GET':
            response = make_response(
                user.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(user, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    user.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to users id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(user)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "User not found"},
            404
        )
    return response

# codes ------------------------------------------------------------------------
@app.route('/codes', methods=['POST'])
def codes():
    if request.method == 'POST':
        form_data = request.get_json()
        try:
            new_code_obj = ProviderCode(
                code = form_data['code']
            )
            db.session.add(new_code_obj)
            db.session.commit()
            response = make_response(
                new_code_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to codes"]},
                400
            )
            return response
        return response

@app.route('/code/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def codes_by_id(id):
    code = ProviderCode.query.filter(ProviderCode.id == id).first()
    if code:
        if request.method == 'GET':
            response = make_response(
                code.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(code, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    code.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to codes id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(code)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "Code not found"},
            404
        )
    return response

# users_codes ------------------------------------------------------------------------
@app.route('/users_codes', methods=['POST'])
def users_codes():
    if request.method == 'POST':
        form_data = request.get_json()
        try:
            new_user_code_obj = UserCodeJoin(
                userFK = form_data['userFK'],
                codeFK = form_data['_password_hash']
            )
            db.session.add(new_user_code_obj)
            db.session.commit()
            response = make_response(
                new_user_code_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to users_codes"]},
                400
            )
            return response
        return response

@app.route('/user_code/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_codes_by_id(id):
    user_code = UserCodeJoin.query.filter(UserCodeJoin.id == id).first()
    if user_code:
        if request.method == 'GET':
            response = make_response(
                user_code.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(user_code, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    user_code.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to users_codes id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(user_code)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "UserCodeJoin not found"},
            404
        )
    return response

# run python app.py
if __name__ == '__main__':
    app.run(port=8000, debug=True)