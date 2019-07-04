var inquirer = require("inquirer");
var mysql = require("mysql");
var resultArray;  //global variable to hold search results

//declare var for purchases, total cost, and product cost
var purchaes = [];
var amounts = [];
var total = 0;
var sales = 0;

var update;  //hold query string for updating database

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon",
})
connection.connect();
console.log("I Connected")

loadQuery();

//functions

//buy a product
 function buyThis(){
     inqurier.prompt([
        {
             message: "What is the ITEM ID of the PRODUCT you would like to buy?",
             name: "id"
        },
        { 
            message: "How many UNITS would you like to buy?",
            name: "purchase",
        },
     ]).then(function(answer){
         //convert to integers
         var id = parseInt(answer.id);
         var quantity = parseInt(answer.purchase)

         //purcahse logic

         if (isNaN(answer.id) == true || id <=0 || id > resultArray.length) {
             //error message for invalid number entry 
             console.log("Error: INVALID ITEM ID")
         }
         else if (isNan(answer.purcahse) == true || quantity <= 0){
             //error for purchasing zero items
             console.log("You must order more than one")
         }
         else if (quantity > resultArray[id -1].stock_quantity){
         //error for not enough stock 
             console.log("WE ARE OUT OF THAT")
         }
         else {
             //for a sucessful order
             purchaes.push(resultArray[id - 1].product_name);
             amounts.push(quantity);

             //total of curent order and total order
             var orderCost = quantity * resultArray[id-1].price;
             orderCost = parseFloat(orderCost.toFixed(2));
             total += orderCost;
             total = parseFloat(total.toFixed(2))

             sales = resultArray[id - 1].product_sales + orderCost;

             console.log("You have selected ITEM" + id + "," + resultArray[id - 1].product_name + "." )
             console.log("This item costs $" + resultArray[id - 1].price + " per unit. You have ordered " + quantity + " units.");
            console.log("This purchase costs $" + orderCost + ".");
            
            //display quantites and ordered as well as cost
            console.log("YOU HAVE ORDERED")
            for (var i = 0; i < purchaes.length; i++){
                console.log(amounts[i] + "|" + purchaes[i]);
            }
            console.log("mYour total cost is " + total + ".");

			// query to update the database
			update = "UPDATE products SET stock_quantity = " + (resultArray[id - 1].stock_quantity - quantity) + ", product_sales = " + sales + " WHERE item_id = " + id;

			// updates the database
			connection.query(update, function (error, results, fields) {
				if (error) {
					console.log(error);
				};
            });
            keepGoing();
        }
    })
}
            
         


        
 


 function loadQuery(){
 //display all product information 
 connection.query("SELECT * FROM products", function (error, results, fields){
     if (error) {
         console.log(error);
     };

     //update resultsArray with query results

     resultArray = results;

     console.log("BAMAZON OFFERS THESE PRODUCTS")
     console.log("Item ID | Product Name | Department | Price | Stock Quantity")

     for ( var i = 0; i < results.length; i++){
         console.log(results[i].item_id + "|results[i].product_name + " | "results[i].department_name +" | " + results[i].price +" | "results[i].stock_quantity " | "results.stock_quantity")
     }
     buyThis();

 });
}

// function to continue
function keepGoing() {
	// asks if the user would like to puchase more items
	inquirer.prompt([
	{
		message: "Would you like to purchase any more products?",
		type: "confirm",
		default: true,
		name: "keepgoing"
	}
	]).then(function(answer) {
		if(answer.keepgoing == true) {
			console.log("\n");
			loadQuery();
		} else {
			console.log("Thank you for your purchase! Goodbye.");
			
			// closes mysql server connection 
			connection.end();
		}
	});
}
