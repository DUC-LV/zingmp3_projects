Install require:

python 3.9
setup

database:
    create super user:
        username: duc
        password: 080999


source env/Script/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver



Web
# API_URL=http://192.168.146.1:9000
# SECURED_API_URL=http://192.168.146.1:9001
API_URL=http://api.tv360.vn
SECURED_API_URL=http://api-v2.tv360.vn
# API_URL=http://local-a.tivi360.vn:9000
# KPI_URL=http://log.tv360.vn
API_KEY=1a15ca3721c5489624045790b1915b0b4fef28
API_SIGNATURE=kxa2o11pu5ffq1qw3nf8qrwn6xkkk1i4w3uzk8ifq4gc8wqsoiwkmzzdlgi180qjga54fax32ylejnkbpch4m0vuxxym6fs25sdcy92n1schrx7hf7ypajixd99xi01shagnh491g2mtp8gj3tt28kjm8l8bvmh82fz4dvfkrshi5y5dpcl5u7mq0vdgj5w8rf5nn5y0
HOST_PROXY=proxy-tct:3128
HOST_REDIRECT_ENABLED=0
SETTING_CACHE_TTL=15m
CACHE_TTL=10m
NEXT_PUBLIC_ALLOWED_DOMAINS_REDIRECT=localhost
PORT=4000
BIG_BANNER_DISABLED=1
NEXT_PUBLIC_MOIAT_URL = http://online.gov.vn/Home/WebDetails/78748
NEXT_PUBLIC_DMCA_HREF = //www.dmca.com/Protection/Status.aspx?id=1a959ebc-0667-458d-a57c-52bb0a51b2e5
wap
# API_URL=http://192.168.146.1:9000
# SECURED_API_URL=http://192.168.146.1:9001
API_URL=http://api.tv360.vn
SECURED_API_URL=http://api-v2.tv360.vn
#API_URL=http://local-a.tivi360.vn:9000
#KPI_URL=http://log.tv360.vn
API_KEY=1a15ca3721c5489624045790b1915b0b4fef28
API_SIGNATURE=kxa2o11pu5ffq1qw3nf8qrwn6xkkk1i4w3uzk8ifq4gc8wqsoiwkmzzdlgi180qjga54fax32ylejnkbpch4m0vuxxym6fs25sdcy92n1schrx7hf7ypajixd99xi01shagnh491g2mtp8gj3tt28kjm8l8bvmh82fz4dvfkrshi5y5dpcl5u7mq0vdgj5w8rf5nn5y0
HOST_PROXY=proxy-tct:3128
HOST_REDIRECT_ENABLED=0
SETTING_CACHE_TTL=15m
CACHE_TTL=10m
NEXT_PUBLIC_ALLOWED_DOMAINS_REDIRECT=localhost
PORT=3000
BIG_BANNER_DISABLED=1

