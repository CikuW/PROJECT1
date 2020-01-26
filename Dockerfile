FROM python:3.7

LABEL maintainer="Eric Muthemba <eric@diasporaai.com>"

RUN pip install --upgrade pip

COPY /main.py requirements.txt ./
COPY /app app

RUN pip install -r requirements.txt

EXPOSE 8080
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
#CMD python main.py