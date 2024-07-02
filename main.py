from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
import os
print("MYSQL_PASSWORD:", os.environ.get('MYSQL_PASSWORD'))
print("MAIL_PASSWORD:", os.environ.get('MAIL_PASSWORD'))

app = Flask(__name__)
app.secret_key = 'many random bytes'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = 'toners'

mysql = MySQL(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Update with your SMTP server
app.config['MAIL_PORT'] = 465  # Update with your SMTP port
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'bilyokwaro95@gmail.com'  # Update with your email
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = 'bilyokwaro95@gmail.com'  # Update with your email
mail = Mail(app)



@app.route('/')
@app.route('/index.html')  # You can add this route as well for consistency
def home():
    return render_template('index.html')




@app.route('/explore.html')
def explore():
    return render_template('explore.html')

@app.route('/book.html')
def book():
    return render_template('book.html')

@app.route('/Products.html')
def products():
    return render_template('Products.html')

@app.route('/aboutus.html')
def about():
    return render_template('aboutus.html')

@app.route('/contacts.html')
def contacts():
    return render_template('contacts.html')

@app.route('/cart-page.html')
def cartpage():
    return render_template('cart-page.html')

@app.route('/viewmore.html')
def viewmore():
    return render_template('viewmore.html')


@app.route('/submit_contact_form', methods=['POST'])
def submit_contact_form():
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        phone_number = request.form['phone_number']
        message = request.form['message']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO message (name, email, phone_number, message) VALUES (%s, %s,%s, %s)",(name, email, phone_number, message))
        mysql.connection.commit()

    cur.close()
    flash("Data Inserted Successfully")

    msg = Message('New Contact Form Submission', recipients=['mwangangipmbithi@gmail.com'])
    msg.body = f"Name: {name}\nEmail: {email}\nPhone Number: {phone_number}\nMessage: {message}"
    mail.send(msg)
        
    return redirect(url_for('contacts'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)