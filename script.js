// Import the uuidv4 function from the uuid library
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Array of food items
const burgerAndPizza = [
  {
    image: 'item graphic-1.png',
    foodName: 'Pizza',
    ingredients: ['pepperoni', 'mushroom', 'mozzarella'],
    price: 14,
    uuid: uuidv4() // Generate a unique identifier for the food item
  },
  {
    image: 'item graphic-2.png',
    foodName: 'Hamburger',
    ingredients: ['Beef', 'Cheese', 'lettuce'],
    price: 12,
    uuid: uuidv4() // Generate a unique identifier for the food item
  },
  {
    image: 'item graphic-3.png',
    foodName: 'Ayran',
    ingredients: ['Grain', 'hops', 'yeast', 'water'],
    price: 12,
    uuid: uuidv4() // Generate a unique identifier for the food item
  }
];

// Total price of ordered items
let totalPrice = 0;

// Generate HTML for each food item
const generateFoodHTML = (food) => {
  console.log('Generating HTML for:', food.foodName); // Log the food item being processed
  return `
    <section>
      <div class="card">
        <div class="flex-item-icon">
          <img src="/images/${food.image}" alt="">
          <div>
            <h1>${food.foodName}</h1>
            <p>${food.ingredients.join(', ')}</p>
            <p>$ ${food.price}</p>
          </div>
        </div>
        <p class="order" data-uuid="${food.uuid}" data-price="${food.price}"><span>+</span></p>
      </div>
    </section>
  `;
};

// Generate HTML for all food items
const generateAllFoodHTML = () => {
  console.log('Generating HTML for all food items...'); // Log before generating HTML for all food items
  return burgerAndPizza.map(generateFoodHTML).join('');
};

// Display the generated HTML on the page
const displayFoodItems = () => {
  console.log('Displaying food items...'); // Log before displaying food items
  const container = document.getElementById('container');
  if (container) {
    container.innerHTML = generateAllFoodHTML();
  }
};

// Handle order click event
const handleOrderClick = (uuid, price) => {
  console.log('Handling order click for UUID:', uuid); // Log the UUID being processed
  // Find the food item with the matching UUID
  const selectedFood = burgerAndPizza.find(food => food.uuid === uuid);
  if (selectedFood) {
    totalPrice += price; // Add the price of the selected item to the total price
  }
  return selectedFood;
};

// Event listener for order button clicks
const setupOrderButtonClickListeners = () => {
  console.log('Setting up order button click listeners...'); // Log before setting up listeners
  const orderButtons = document.querySelectorAll('.order');
  orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const uuid = e.currentTarget.dataset.uuid;
      const price = parseFloat(e.currentTarget.dataset.price); // Get the price of the selected item
      console.log('Order button clicked for UUID:', uuid); // Log the UUID when the order button is clicked
      if (uuid) {
        const selectedFood = handleOrderClick(uuid, price);
        if (selectedFood) {
          displayOrderedFood(selectedFood);
          displayTotalPrice(); // Display the updated total price
        }
      }
    });
  });
};

// Handle removal of ordered item
const handleRemoveItemClick = (uuid, price) => {
  console.log('Handling removal of item with UUID:', uuid);
  const removedFoodIndex = orderedItems.findIndex(item => item.uuid === uuid);
  if (removedFoodIndex !== -1) {
    // Remove the item from the orderedItems array
    orderedItems.splice(removedFoodIndex, 1);
    // Subtract the price of the removed item from the total price
    totalPrice -= price;
    // Remove the item from the display
    const removedItemElement = document.getElementById(uuid);
    if (removedItemElement) {
      removedItemElement.remove();
    }
    // Update the total price display
    displayTotalPrice();
  }
};

// Display the ordered food items
const displayOrderedFood = (food) => {
  console.log('Displaying ordered food:', food.foodName);
  const orderingFoodContainer = document.getElementById("ordering-food");
  if (orderingFoodContainer) {
    const displayheading = document.querySelector(".heading")
    displayheading.style.display = 'block';
    const itemHtml = `
      <section id="${food.uuid}">
        <div class="card-row">
        <h1 style="display: inline-block; margin-right: 10px;">${food.foodName}<a href="" style="cursor: pointer; margin-left: 5px; padding: 2px 10px; font-size: 18px; font-family: Verdana; color:#BBBBBB;  border-radius: 30px; text-decoration: none;" class="remove-item" data-uuid="${food.uuid}" data-price="${food.price}">Remove</a></h1>
          <p>$ ${food.price}</p>
        </div>
      </section>
    `;
    orderingFoodContainer.innerHTML += itemHtml;
    // Add event listener for remove button
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const uuid = e.currentTarget.dataset.uuid;
        const price = parseFloat(e.currentTarget.dataset.price);
        handleRemoveItemClick(uuid, price);
      });
    });
  }
};

// Display the total price of ordered items
const displayTotalPrice = () => {
  const totalPriceContainer = document.getElementById("total-price-display");
  if (totalPriceContainer) {
    totalPriceContainer.style.display = "block"; // Make the total price display visible
    totalPriceContainer.innerHTML = `
     <div class="total-price">
        <h3>Total Price: </h3>
        <p>$ ${totalPrice.toFixed(2)} </p>
     </div>
     <button class="complete-order">Complete Order</button>
     `; // Display total price with two decimal places
  }
  //calling the complete order function
  completeOrder();
};

// taking control of complete order button
const completeOrder = () => {
  const completeOrderBtn = document.querySelector(".complete-order");
  if (completeOrderBtn) {
    completeOrderBtn.addEventListener("click", function() {
      // taking control of div modal 
      const modal = document.getElementById("modal")
      //console.log(modal, "was taken control ");
      modal.style.display ='block'
    });
  } else {
    console.log("Button with class 'complete-order' not found");
  }
};



// Call the function to set up the event listener

// grapping the form
const modal = document.getElementById('modal')
// const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')

consentForm.addEventListener('submit', function(e){
  e.preventDefault()
  
  const consentFormData = new FormData(consentForm)
  const fullName = consentFormData.get('fullName')
  console.log(fullName)

  enterYourDetialsAndSendThem(fullName)
})

function enterYourDetialsAndSendThem(customer){
  // Replace ordering-food and total-price-display divs with a thank you message
  const orderingFoodContainer = document.getElementById("ordering-food");
  const totalPriceContainer = document.getElementById("total-price-display");
  if (orderingFoodContainer) {
    orderingFoodContainer.innerHTML = '';
  }
  if (totalPriceContainer) {
    totalPriceContainer.innerHTML = '';
  }

  const appreciateMessage = document.createElement('div');
  appreciateMessage.classList ='container'
  appreciateMessage.id = 'appreciate';
  appreciateMessage.innerHTML = `
    <p class = 'thanks-message' >Thanks, ${customer}! Your order is on its way.</p>
  `;
  document.body.appendChild(appreciateMessage);

  // make the modal disappear
  modal.style.display = 'none';

  // display a thank you message
  appreciateMessage.style.display = 'block';
}

// Initialize the application
console.log('Initializing the application...'); // Log before initializing
const init = () => {
  displayFoodItems(); // Display all food items
  setupOrderButtonClickListeners(); // Setup click event listeners for order buttons
  // displayTotalPrice(); // Display initial total price
};

// Call the init function when the DOM is loaded
console.log('Adding event listener for DOMContentLoaded...'); // Log before adding event listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded.'); // Log when DOM content is loaded
  init(); // Initialize the application
});
