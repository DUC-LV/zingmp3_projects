Install require:

python 3.9
setup

database:
    create super user:
        username: duc
        password: 080999

cd src -> pip install virtualenv virtualenv env

source env/Script/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
