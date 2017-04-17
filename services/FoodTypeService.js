class FoodTypeService {

  static foodTypes = [
    {
      type: 'other', 
      emoji: ':truck:'
    },
    {
      type: 'sushi', 
      emoji: ':sushi:'
    },
    {
      type: 'hotdog', 
      emoji: ':hotdog:'
    },
    {
      type: 'burger', 
      emoji: ':hamburger:'
    },
    {
      type: 'pancakes', 
      emoji: ':hotdog:'
    },
    {
      type: 'taco', 
      emoji: ':taco:'
    },
    {
      type: 'pear', 
      emoji: ':pear:'
    },
    {
      type: 'curry', 
      emoji: ':curry:'
    },
    {
      type: 'shaved_ice', 
      emoji: ':shaved_ice:'
    },
    {
      type: 'beer', 
      emoji: ':beer:'
    },
    {
      type: 'candy', 
      emoji: ':candy:'
    },
    {
      type: 'hot_pepper', 
      emoji: ':hot_pepper:'
    },
    {
      type: 'icecream', 
      emoji: ':icecream:'
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