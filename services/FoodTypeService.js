class FoodTypeService {

  static foodTypes = [
    {
      type: 'other',
      emoji: ':truck:'
    },
    {
      type: 'grapes',
      emoji:':grapes:'
    },
    {
      type: 'melon',
      emoji:':melon:'
    },
    {
      type: 'watermelon',
      emoji:':watermelon:'
    },
    {
      type: 'tangerine',
      emoji:':tangerine:'
    },
    {
      type: 'lemon',
      emoji:':lemon:'
    },
    {
      type: 'banana',
      emoji:':banana:'
    },
    {
      type: 'pineapple',
      emoji:':pineapple:'
    },
    {
      type: 'apple',
      emoji:':apple:'
    },
    {
      type: 'green_apple',
      emoji:':green_apple:'
    },
    {
      type: 'pear',
      emoji:':pear:'
    },
    {
      type: 'peach',
      emoji:':peach:'
    },
    {
      type: 'cherries',
      emoji:':cherries:'
    },
    {
      type: 'strawberry',
      emoji:':strawberry:'
    },
    {
      type: 'corn',
      emoji:':corn:'
    },
    {
      type: 'hot_pepper',
      emoji:':hot_pepper:'
    },
    {
      type: 'bread',
      emoji:':bread:'
    },
    {
      type: 'meat_on_bone',
      emoji:':meat_on_bone:'
    },
    {
      type: 'poultry_leg',
      emoji:':poultry_leg:'
    },
    {
      type: 'hamburger',
      emoji:':hamburger:'
    },
    {
      type: 'fries',
      emoji:':fries:'
    },
    {
      type: 'pizza',
      emoji:':pizza:'
    },
    {
      type: 'hotdog',
      emoji:':hotdog:'
    },
    {
      type: 'taco',
      emoji:':taco:'
    },
    {
      type: 'burrito',
      emoji:':burrito:'
    },
    {
      type: 'egg',
      emoji:':egg:'
    },
    {
      type: 'stew',
      emoji:':stew:'
    },
    {
      type: 'popcorn',
      emoji:':popcorn:'
    },
    {
      type: 'bento',
      emoji:':bento:'
    },
    {
      type: 'rice_cracker',
      emoji:':rice_cracker:'
    },
    {
      type: 'rice_ball',
      emoji:':rice_ball:'
    },
    {
      type: 'rice',
      emoji:':rice:'
    },
    {
      type: 'curry',
      emoji:':curry:'
    },
    {
      type: 'ramen',
      emoji:':ramen:'
    },
    {
      type: 'spaghetti',
      emoji:':spaghetti:'
    },
    {
      type: 'sweet_potato',
      emoji:':sweet_potato:'
    },
    {
      type: 'oden',
      emoji:':oden:'
    },
    {
      type: 'sushi',
      emoji:':sushi:'
    },
    {
      type: 'fried_shrimp',
      emoji:':fried_shrimp:'
    },
    {
      type: 'fish_cake',
      emoji:':fish_cake:'
    },
    {
      type: 'dango',
      emoji:':dango:'
    },
    {
      type: 'icecream',
      emoji:':icecream:'
    },
    {
      type: 'shaved_ice',
      emoji:':shaved_ice:'
    },
    {
      type: 'ice_cream',
      emoji:':ice_cream:'
    },
    {
      type: 'doughnut',
      emoji:':doughnut:'
    },
    {
      type: 'cookie',
      emoji:':cookie:'
    },
    {
      type: 'birthday',
      emoji:':birthday:'
    },
    {
      type: 'cake',
      emoji:':cake:'
    },
    {
      type: 'chocolate_bar',
      emoji:':chocolate_bar:'
    },
    {
      type: 'candy',
      emoji:':candy:'
    },
    {
      type: 'lollipop',
      emoji:':lollipop:'
    },
    {
      type: 'custard',
      emoji:':custard:'
    },
    {
      type: 'honey_pot',
      emoji:':honey_pot:'
    },
    {
      type: 'coffee',
      emoji:':coffee:'
    },
    {
      type: 'tea',
      emoji:':tea:'
    },
    {
      type: 'sake',
      emoji:':sake:'
    },
    {
      type: 'champagne',
      emoji:':champagne:'
    },
    {
      type: 'wine_glass',
      emoji:':wine_glass:'
    },
    {
      type: 'cocktail',
      emoji:':cocktail:'
    },
    {
      type: 'tropical_drink',
      emoji:':tropical_drink:'
    },
    {
      type: 'beer',
      emoji:':beer:'
    }
  ]
  

  static foodTypeFromType(foodType) {
    return this.getFoodTypes().find((t) => t.type == foodType) || 
      this.getFoodTypes().find((t) => t.type == 'other')
  }

  static getFoodTypes() {
    return this.foodTypes;
  }
}

module.exports = FoodTypeService; 