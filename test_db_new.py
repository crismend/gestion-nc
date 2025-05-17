# -*- coding: utf-8 -*-
import os
import psycopg2

db_url = os.environ.get('DATABASE_URL')
print(f'Intentando conectar a: {db_url}')

try:
    conn = psycopg2.connect(db_url)
    print('Conexión exitosa!')
    conn.close()
except Exception as e:
    print(f'Error al conectar: {e}')