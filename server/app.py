from config import app, db
from flask import make_response, request, session
from models import Client, ClientProvider, Provider
from sqlalchemy import UniqueConstraint
import random

@app.route('/')
def index():
    return ''

# Non-RESTful Routing:
@app.route('/client_signup', methods = ['POST'])
def client_signup():
    # allow for client to signup new account
    form_data = request.get_json()
    try:
        new_client = Client(
            email = form_data['email'],
        )
        # generates hashed password
        new_client._password_hash = form_data['password']

        db.session.add(new_client)
        db.session.commit()

        # gives new client an id and sets signed in client to session
        session['user_id'] = new_client.id

        if len(form_data['provider_code']) == 9: #if the inputed code is the expected length
            verified_code = Provider.query.filter(Provider.provider_code == form_data['provider_code']).first() #check if it's connected to a provider
            print(verified_code)
            if verified_code:
                try: #make a link between this new patient and the provider
                    new_client_provider = ClientProvider(
                        clientFK = new_client.id,
                        providerFK = verified_code.id
                    )
                except:
                    response = make_response(
                    {"ERROR": "Could not create ClientProviderJoin"},
                    400
                )
        response = make_response(
            new_client.to_dict(),
            201
        )
    except:
        response = make_response(
            {"ERROR": "Could not create client"},
            400
        )
    return response

@app.route('/provider_signup', methods = ['POST'])
def provider_signup():
    # allow for provider to signup new account
    form_data = request.get_json()
    while True:
        unique_code = random.randint(100000000, 999999999)
        already_exists = Provider.query.filter(Provider.provider_code == unique_code).first()
        print(already_exists)
        if not already_exists:
            break
    print(unique_code)

    try:
        new_provider = Provider(
            email = form_data['email'],
            provider_code = unique_code # i don't like this solution to generating unique provider codes
        )
        # generates hashed password
        new_provider._password_hash = form_data['password']

        db.session.add(new_provider)
        db.session.commit()

        # gives new provider an id and sets signed in provider to session
        session['user_id'] = new_provider.id

        response = make_response(
            new_provider.to_dict(),
            201
        )
    except:
        response = make_response(
            {"ERROR": "Could not create provider. Please try again."},
            400
        )
    return response

@app.route('/check_client_session', methods = ['GET'])
def check_client_session():
    # check current session
    client_id = session['user_id']
    client = Client.query.filter(Client.id == client_id).first()

    if client:
        response = make_response(
            client.to_dict(), 
            200
        )
    else:
        response = make_response(
            {}, 
            404
        )
    return response

@app.route('/check_provider_session', methods = ['GET'])
def check_provider_session():
    # check current session
    provider_id = session['user_id']
    provider = Provider.query.filter(Provider.id == provider_id).first()

    if provider:
        response = make_response(
            provider.to_dict(), 
            200
        )
    else:
        response = make_response(
            {}, 
            404
        )
    return response

@app.route('/client_login', methods = ['POST'])
def client_login():
    # check if client can signin to account
    form_data = request.get_json()
    
    email = form_data['email']
    password = form_data['password']
    
    client = Client.query.filter_by(email = email).first()
    if client:
        # authenticate client
        is_authenticated = client.authenticate(password)
        if is_authenticated:
            session['user_id'] = client.id
            response= make_response(client.to_dict(), 201)
        else:
            response= make_response({"ERROR" : "CLIENT CANNOT LOG IN"}, 400)
    else:
        response= make_response({"ERROR" : "CLIENT NOT FOUND"}, 404)
    return response

@app.route('/provider_login', methods = ['POST'])
def provider_login():
    # check if provider can signin to account
    form_data = request.get_json()
    
    email = form_data['email']
    password = form_data['password']
    
    provider = Provider.query.filter_by(email = email).first()
    if provider:
        # authenticate provider
        is_authenticated = provider.authenticate(password)
        if is_authenticated:
            session['user_id'] = provider.id
            response= make_response(provider.to_dict(), 201)
        else:
            response= make_response({"ERROR" : "PROVIDER CANNOT LOG IN"}, 400)
    else:
        response= make_response({"ERROR" : "PROVIDER NOT FOUND"}, 404)
    return response

@app.route('/logout', methods = ['DELETE'])
def logout():
    # remove session
    session['user_id'] = None
    response = make_response(
        {},
        204
    )
    return response

# clients ------------------------------------------------------------------------
@app.route('/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        clients = Client.query.all()
        client_dict = [client.to_dict() for client in clients]
        response = make_response(
            client_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_client_obj = Client(
                email = form_data['email'],
                _password_hash = form_data['_password_hash']
            )
            db.session.add(new_client_obj)
            db.session.commit()
            response = make_response(
                new_client_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to clients"]},
                400
            )
            return response
    return response

@app.route('/client/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def clients_by_id(id):
    client = Client.query.filter(Client.id == id).first()
    if client:
        if request.method == 'GET':
            response = make_response(
                client.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(client, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    client.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to clients id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(client)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "Client not found"},
            404
        )
    return response

# providers ------------------------------------------------------------------------
@app.route('/providers', methods=['GET', 'POST'])
def providers():
    if request.method == 'GET':
        providers = Provider.query.all()
        provider_dict = [provider.to_dict() for provider in providers]
        response = make_response(
            provider_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_provider_obj = Provider(
                email = form_data['email'],
                _password_hash = form_data['_password_hash'],
                provider_code = form_data['provider_code']
            )
            db.session.add(new_provider_obj)
            db.session.commit()
            response = make_response(
                new_provider_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to providers"]},
                400
            )
            return response
    return response

@app.route('/provider/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def providers_by_id(id):
    provider = Provider.query.filter(Provider.id == id).first()
    if provider:
        if request.method == 'GET':
            response = make_response(
                provider.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(provider, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    provider.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to providers id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(provider)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "provider not found"},
            404
        )
    return response

# clients_providers ------------------------------------------------------------------------
@app.route('/clients_providers', methods=['GET', 'POST'])
def clients_providers():
    if request.method == 'GET':
        clients_providers = ClientProvider.query.all()
        client_provider_dict = [client_provider.to_dict() for client_provider in clients_providers]
        response = make_response(
            client_provider_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_client_provider_obj = ClientProvider(
                clientFK = form_data['clientFK'],
                providerFK = form_data['_password_hash']
            )
            db.session.add(new_client_provider_obj)
            db.session.commit()
            response = make_response(
                new_client_provider_obj.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {"errors": ["validation errors in POST to clients_providers"]},
                400
            )
            return response
    return response

@app.route('/client_provider/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def clients_providers_by_id(id):
    client_provider = ClientProvider.query.filter(ClientProvider.id == id).first()
    if client_provider:
        if request.method == 'GET':
            response = make_response(
                client_provider.to_dict(),
                200
            )
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(client_provider, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(
                    client_provider.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {"errors": ["validation errors in PATCH to clients_providers id"]},
                    400
                )
                return response
        elif request.method == 'DELETE':
            db.session.delete(client_provider)
            db.session.commit()
            response = make_response(
                {},
                204
            )
    else:
        response = make_response(
            {"error": "ClientProvider not found"},
            404
        )
    return response

# run python app.py
if __name__ == '__main__':
    app.run(port=8000, debug=True)