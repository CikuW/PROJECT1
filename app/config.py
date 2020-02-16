class Config(object):
    SECRET_KEY = 'key'
    
class ProductionConfig(Config):
    DEBUG = False

class DebugConfig(Config):
    DEBUG = True
    MAIL_SERVER ='smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL =True
