from app.home import blueprint
from flask import render_template,request,redirect,url_for
from flask_login import login_required
import math
import socket

food_category = ["BREAKFAST", "BEVERAGES", "MAIN DISHES", "SIDE DISHES", "BITES"] ;
food_name = ["Two Eggs", "Two Eggs with bacon", "FULL SMITH BREAKFAST", "Plain Omelette", "Espresso-Single", "Espresso-Double", "African Mixed Tea Pot", "Milk", "Fruit Juice", "Smoothie", "Beef Burger", "Pan Fried Fish", "Pork Chops", "T-bone Steak", "Mixed Grill Platter", "Vegetable Ratatoule", "Chips", "Ugali", "Plain Rice", "Vegies", "Choma sausages", "Kebab", "American Pancakes", "Marble cake"];
food_description = ["With toast-and-Saut`e potatoes", "With toast and ham/ bacon and sausages", "Served with Tea/Coffee/Chocolate -Fresh Fruit Salad -Fresh Juice -two eggs of your choice -Bacon/ Sausage/ Baked Beans/ Tomatoe Relish/ Saut`eed Potatoes/Toast and Butter", "Made with 3 eggs/ served with Toast & Saut`e potatoes", "Serves 1 cup", "Serves 1 cup", "Serves 2 cups", "Serves 1 cup", "Mango/apple/passion", "Stawberry/Mango/Banana with vanilla yoghurt", "Made from Pure Ground Meat Grilled and Served on Sesame Toasted Burger buns/ Laid with Lettuce/ Crispy Fried Onion Rings Topped with Cheese/ Beef Bacon & Tomato confit and served with Chips", "Nile Perch Fillet in thick tomato sauce served with Roasted potatoes/ Mango Salsa & Vegetables", "Griddled & Served with Roast Potatoes/ Mustard Gravy & Vegetables", "Served with creamy mushroom sauce/ French fries and vegies", "A sizable portion of grilled spare ribs presented with chunky chips & BBQ sauce (Serves 2-3 pax)", "Served with chapati or rice", "1 serving", "Large piece", "1 serving", "Spinach/kales and terere", "2 choma sausges and a dash of chips", "1 large piece", "Drop scones with syrup", "Standard size"];
food_price = ["440","600", "1000", "500","150", "200", "200", "200", "200", "300", "800", "900","1200", "1200", "2500" ,"900", "250", "150", "230", "200", "450", "150", "150", "200", "200"];
food_ETA = ["15","15", "25", "10", "5", "5", "5", "5", "5", "15"," 45"," 45"," 45"," 45", "50", "30", "15", "15", "15", "10", "15", "10", "15", "5"];
food_image = ['img/product-img/two-eggs1.jpg','img/product-img/two-eggs2.jpg','img/product-img/fullb.jpg','img/product-img/breakfast.jpg','img/product-img/coffee2.jpg','img/product-img/coffee1.jpg','img/product-img/tea1.jpg','img/product-img/milk.jpg','img/product-img/juices.jpg','img/product-img/smoothies.jpg','img/product-img/burger.jpg','img/product-img/salmon.jpg','img/product-img/pork2.jpg','img/product-img/steak.jpg','img/product-img/platters.jpg','img/product-img/vegetarian.jpg','img/product-img/fries.jpg','img/product-img/ugali.jpg','img/product-img/rice.jpg','img/product-img/vegies.jpg','img/product-img/sausages.jpg','img/product-img/kebab.jpg','img/product-img/pancakes.jpg','img/product-img/cake.jpg' ];
food_quantity = ["34","65","23","0","90", "98", "65", "34", "7", "23", "56", "87","89", "89", "98" ,"89", "98", "42", "1", "5", "0", "0", "23", "13", "3"];

category_images=['img/product-img/two-eggs1.jpg','img/product-img/juices.jpg','img/product-img/pork2.jpg','img/product-img/fries.jpg','img/product-img/kebab.jpg']
category_price =['100','50','600','200','100']

menu = {"BREAKFAST":["Two Eggs", "Two Eggs with bacon", "FULL SMITH BREAKFAST", "Plain Omelette"], 
                    "BEVERAGES":["Espresso-Single", "Espresso-Double", "African Mixed Tea Pot", "Milk", "Fruit Juice", "Smoothie"],
                    "MAIN DISHES":["Beef Burger", "Pan Fried Fish", "Pork Chops", "T-bone Steak", "Mixed Grill Platter", "Vegetable Ratatoule"], 
                    "SIDE DISHES":["Chips", "Ugali", "Plain Rice", "Vegies"],
                    "BITES":["Choma sausages", "Kebab", "American Pancakes", "Marble cake"]}

carts = []
prices = []
images = []
quantity = []
ETA = []
confirmed_order_cart = []
confirmed_order_quantity = []

@blueprint.route('/esp',methods=['GET'])
def esp():
    return ("hello \n")


@blueprint.route('/cart')
def cart():
    count= menuitems()
    price = 0
    for i in range (0,len(carts)):
        price = price + (int(prices[i])*int(quantity[i]))
    try:
        my_ETA = round(max(ETA)*1.25) 
    except:
        my_ETA = 0

    return render_template('cart.html',cart=carts,price=prices, images=images, quantities=quantity,Total = price,my_ETA=my_ETA, count=count )

@blueprint.route('/cart/<template>')
def cart_delete(template):
  
    index = carts.index(template)
    del(carts[index])
    del(prices[index])
    del(images[index])
    del(quantity[index])
    del(ETA[index])

    return  redirect(url_for('home_blueprint.cart'))

@blueprint.route('/my_basket/<template>/<template1>',methods=["GET"])
def my_basket(template,template1):

    if template not in carts:
        prices.append(int(food_price[food_name.index(template)]))
        images.append(food_image[food_name.index(template)])
        carts.append(template)
        quantity.append(template1)
        ETA.append(int(food_ETA[food_name.index(template)]))
    else:
        item_index = carts.index(template)
        quantity[item_index] = str(int(quantity[item_index])+ int(template1)) 


    return("None")

@blueprint.route('/checkout',methods=['GET','POST'])
def checkout():
    count= menuitems()
    if request.method == 'POST':
        form_data = {}
        form_data["username"] = request.form['name']
        form_data["comment"] = request.form['comment']#pbkdf2_sha256.encrypt(request.form['password'], rounds=200000, salt_size=16)
        form_data["phone_number"] = request.form['phone_number']
        form_data["email"] = request.form['email']
        print(form_data)
        return render_template('shop.html')


    
    price = 0
    for i in range (0,len(carts)):
        price = price + (int(prices[i])*int(quantity[i]))
    try:
        my_ETA = round(max(ETA)*1.25)
    except:
        my_ETA = 0

    ip = my_ip_address()
    return render_template('checkout.html',ip=ip,prices=price,my_ETA = my_ETA, count=count)


@blueprint.route('/manager')
def manager():
    ip = my_ip_address()
    return render_template('test.html',ip =ip,food_name=food_name,food_description=food_description,food_price=food_price,food_quantity=food_quantity)

@blueprint.route('/chef')
def chef():
    print(confirmed_order_cart)
    return render_template('chef.html',cart=confirmed_order_cart,quantity=confirmed_order_quantity)

@blueprint.route('/server')
def server():
    return render_template('server.html')


@blueprint.route('/order',methods=["POST"])
def order():
    print("____________________________________")
    print(request.get_json["name"])
    return ("None")

def menuitems():
    count = 0
    for i in range(len(carts)):
        count += int(quantity[i])
    return (count)    


@blueprint.route('/index')
def index(): 
    count= menuitems()   
    return render_template('index.html',food_images=category_images,food_prices=category_price,food_categories=food_category, count=count)

@blueprint.route('/shop/<template>',methods=["GET","POST"])
def shop(template):
  count= menuitems()  
  food_names = menu[template]
  food_descriptions = []
  food_prices = []
  food_images = []
  for name in food_names:
    food_index = food_name.index(name)
    food_descriptions.append(food_description[food_index])
    food_prices.append(food_price[food_index])
    food_images.append(food_image[food_index])

  return render_template('shop.html',category = template ,food_names = food_names,food_descriptions = food_descriptions ,food_prices = food_prices ,food_images=food_images,food_category=food_category, count=count)

@blueprint.route('/product/<template>/<template1>', methods=['GET', 'POST'])
def product(template,template1):
    count= menuitems()
    index = (int(template)-1)

    keys = list(menu.keys())

    pos = keys.index(template1)

    print(keys)
    print(template1)


    for i in range (pos):
        index = len(menu[keys[i]]) + index

    img = food_image[index]
    name = food_name[index]

    if (int(food_quantity[index]) != 0):
        instock = 1
    else:
        instock = 0
    price =  food_price[index]
    description = food_description[index]
    ip = my_ip_address()

    return render_template('product-details.html',ip = ip,my_img=img, name =name, instock=instock, price= price, description=description, count=count)


@blueprint.route('/<template>')
@login_required
def route_template(template):
    return render_template(template + '.html')

@blueprint.route('/edit/<template>/<template1>')
def edit(template,template1):
    print (template1)
    return "none"

@blueprint.route('/entertainment')
def entertainment():
    try:
        for i in range(len(carts)):
            confirmed_order_cart.append(carts[i])
            confirmed_order_quantity.append(quantity[i])
            food_index = food_name.index(carts[i])
            food_quantity[food_index] = str(int(food_quantity[food_index])- int(quantity[i]))
            if (int(food_quantity[food_index]) <= 0 ):
                food_quantity[food_index] = "0"
                foo


            print (food_quantity[food_index])
    except:
        pass
    
    return render_template('entertainment.html')

def my_ip_address():
    hostname = socket.gethostname()
    IPAddr = socket.gethostbyname(hostname)
    return (str(IPAddr))
 