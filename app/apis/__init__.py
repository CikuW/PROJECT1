
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}


def Login():
    f=open("app/apis/data_ip.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        data_ip = str(contents)
        return data_ip

def Gateway():
    f=open("app/apis/gateway_url.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        gateway = str(contents)
        return gateway

def new_ip():
    f=open("app/apis/new_ip.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        gateway = str(contents)
        return gateway

def analytics():
    f=open("app/apis/analytics.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        analytics = str(contents)
        return analytics

def ssl_():
    f=open("app/apis/ssl_files.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        ssl = str(contents)
        return ssl


