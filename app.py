from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)

# Ruta principal (pantalla inicial)
@app.route('/')
def inicio():
    return render_template('inicio.html', active='home')

# Ruta para la sección de introducción por pasos
@app.route('/Introduccion/<int:paso>')
def Introduccion(paso):
    if paso < 1 or paso > 5:
        return redirect(url_for('Introduccion', paso=1))
    return render_template(f'juego/Introduccion{paso}.html')

# Página principal por defecto (index)
# @app.route('/index')
# def index():
#     return render_template('index.html')

# Rutas adicionales
@app.route('/about')
def about():
    return render_template('about.html', active='about')

@app.route('/contact')
def contact():
    return render_template('contact.html', active='contact')

if __name__ == '__main__':
    app.run(debug=True)
