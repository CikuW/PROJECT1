
import subprocess
import os

while True:
    out = subprocess.Popen(['python', 'main.py'],
               stdout=subprocess.PIPE,
               stderr=subprocess.STDOUT)
    stdout,stderr = out.communicate()
    module = str(stdout.split(b"No module named ")[1])
    print(module.split("'")[1])
    cmd = "pip install " + module.split("'")[1]
    os.system(cmd)