from flask_wtf import FlaskForm
from wtforms import PasswordField,StringField,BooleanField,IntegerField,TextAreaField,SubmitField,validators
from wtforms.validators import InputRequired, Email, Length

## login and registration
class LoginForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(), Length(min=2, max=60)], render_kw={"placeholder": "Email"})
    password = PasswordField('password', validators=[InputRequired(), Length(min=2, max=80)], render_kw={"placeholder": "Password"})
    remember = BooleanField('remember me')

class RegisterForm(FlaskForm):
    firstname = StringField('First Name', validators=[validators.InputRequired()], render_kw={'placeholder': 'Enter first name', 'class': 'input'})
    lastname = StringField('Last Name', validators=[validators.InputRequired()], render_kw={'placeholder': 'Enter last name', 'class': 'input'})
    number = StringField('Phone Number', validators=[validators.InputRequired()], render_kw={'placeholder': 'Enter phone number', 'class': 'input'})
    email = StringField('Email', validators=[validators.InputRequired(), validators.Email(message='Invalid Email')], render_kw={'placeholder': 'Enter email', 'class': 'input'})
    password = PasswordField('Password', validators=[validators.InputRequired(), validators.Length(min=4)], render_kw={'placeholder': 'Enter password', 'class': 'input'})
    terms = BooleanField('I agree to the SMAJI Terms and Conditions', validators=[InputRequired()])

class DeviceForm(FlaskForm):
    id = IntegerField('Device Id', validators=[InputRequired()], render_kw={"placeholder": "Device Id"})
    location = StringField('Device Location', validators=[InputRequired()], render_kw={"placeholder": "Device Location"})
    #token = StringField('API token', validators=[InputRequired()], render_kw={"placeholder": "API code"})
    #example_code = TextAreaField('Example code', render_kw={"value": "Lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet"})
