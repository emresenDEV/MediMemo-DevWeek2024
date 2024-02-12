from config import app, db
from flask import make_response, request, session
from models import Client, ClientProvider, Provider
from sqlalchemy import UniqueConstraint

@app.route('/')
def index():
    return ''

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