from .forms import LoginForm, RegisterForm, DeviceForm
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask import Flask, request, jsonify, make_response,render_template,redirect, url_for,flash
from werkzeug.security import generate_password_hash, check_password_hash
import json
from passlib.hash import pbkdf2_sha256
import requests
from app import login_manager
from app.base import blueprint
from app.apis import Login,headers,Gateway,new_ip,analytics,ssl_
import os
from flask_mail import Mail,Message
from flask import Flask

app = Flask(__name__)
credentials =[]
regitered_users = []

@blueprint.route('/')
def route_default():
    return redirect(url_for('base_blueprint.login'))


@blueprint.route('/<template>')
@login_required
def route_template(template):
    print(template+"********")
    return render_template(template + '.html')


@blueprint.route('/fixed_<template>')
@login_required
def route_fixed_template(template):
    return render_template('fixed/fixed_{}.html'.format(template))


@blueprint.route('/page_<error>')
def route_errors(error):
    return render_template('errors/page_{}.html'.format(error))

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        form_data = {}
        form_data["email"] = request.form['email']
        form_data["password"] = request.form['pass']
        user_login_url = Login() + "/user/login"
        data = json.dumps(form_data)
        login = requests.post(user_login_url,data=data, headers=headers)

        if (((form_data["email"]).lower() in regitered_users)):
            index_val = regitered_users.index((form_data["email"]).lower())
            print(index_val)
            print(credentials)
            credential = credentials[index_val]
            if ( form_data["password"] == credential["password"] ):
                if (credential["work"] == "Manager"):
                    return redirect(url_for('home_blueprint.manager'))
                if (credential["work"] == "Server"):
                    return redirect(url_for('home_blueprint.server'))
                if (credential["work"] == "chef"):
                    return redirect(url_for('home_blueprint.chef'))


    return  render_template('login/login.html', error=error)


@blueprint.route('/sign_up', methods =['POST', 'GET'])
def register():
    #form = RegisterForm(request.form)

    if request.method == 'POST':
        form_data = {}
        form_data["username"] = request.form['name']
        form_data["password"] = request.form['pass']#pbkdf2_sha256.encrypt(request.form['password'], rounds=200000, salt_size=16)
        form_data["email"] = request.form['email']
        form_data["work"] = request.form['bool']

        credentials.append(form_data)
        regitered_users.append(form_data["email"])

        if form_data["work"] == "server":
            return redirect(url_for('home_blueprint.server'))
        if form_data["work"] == "Manager":
            return redirect(url_for('home_blueprint.manager'))
        if form_data["work"] == "chef":
            return redirect(url_for('home_blueprint.chef'))


    return render_template('login/signup.html')#, form=form)


@blueprint.route('/welcome', methods=['POST', 'GET'])
def welcome():
    name = str(request.args['name'])
    return render_template('login/welcome.html', name=name)


@blueprint.route('/confirmation', methods=['POST', 'GET'])
def confirmation():
    pass

@blueprint.route('/logout')
@login_required
def logout():
    #logout_user()
    return redirect(url_for('base_blueprint.login'))

@blueprint.route('/logs')
def logs():
    error_file = open("error.log","r")
    error_file = error_file.read()
    error_file.replace("INFO","\n INFO")
    return(error_file)



@blueprint.route('/shutdown')
def shutdown():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    return 'Server shutting down...'

## Errors


@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template('errors/page_403.html'), 403


@blueprint.errorhandler(403)
def access_forbidden(error):
    return render_template('errors/page_403.html'), 403


@blueprint.errorhandler(404)
def not_found_error(error):
    return render_template('errors/page_404.html'), 404


@blueprint.errorhandler(500)
def internal_error(error):
    return render_template('errors/page_500.html'), 500


@blueprint.route('/report/<DeviceID>/<location>', methods =['POST', 'GET'])
def report(DeviceID,location,status):
    return redirect(url_for('home_blueprint.report',DeviceID=DeviceID,location=location))






# scheduler
