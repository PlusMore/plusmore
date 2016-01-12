Schema.MenuItem = new SimpleSchema({
  name: {
    type: String,
    label: "Item Name",
    max: 200
  },
  price: {
    type: Number,
    min: 0,
    decimal: true,
    label: "Price ($)"
  },
  description: {
    type: String,
    label: 'Description (optional)',
    optional: true
  },
  menuCategoryId: {
    type: String
  },
  active: {
    type: Boolean,
    defaultValue: true
  },
  category: {
    type: String,
    label: "Item category",
    optional: true,
    autoform: {
      type: "select",
      options: function() {
        return [{
            label: "Full breakfast",
            value: 'Full breakfast',
            description: ''
          }, {
            label: "EGGS",
            value: 'Eggs',
            description: 'Local Organic Eggs Served with Roasted Potatoes and Toast'
          }, {
            label: "GRIDDLE, SMOKED FISH & BREAKFAST MEAT",
            value: 'BreakfastMeat'
          }, {
            label: "FRUIT & GREEK YOGURT",
            value: 'Yogurt'
          }, {
            label: "PICNIC IN THE PARK BY JEAN-GEORGES",
            description: 'Enjoy the splendor of Central Park with a delightfully prepared basket of your choice from our picnic menu',
            value: 'Picnic'
          }, {
            label: "CEREALS & GRAINS",
            value: 'Cereals'
          }, {
            label: "BREAD & BAKED GOODS ",
            value: 'Bread'
          }, {
            label: "JUICES & SMOOTHIES",
            value: 'Juices'
          }, {
            label: "BEVERAGES",
            value: 'BEVERAGES'
          },



          {
            label: "RAW",
            value: 'RAW'
          }, {
            label: "APPETIZERS",
            value: 'APPETIZERS'
          }, {
            label: "PIZZA",
            value: 'PIZZA'
          }, {
            label: "PASTA",
            value: 'PASTA'
          }, {
            label: "SOUP & SALAD",
            value: 'SOUP & SALAD'
          }, {
            label: "SANDWICHES",
            value: 'SANDWICHES'
          }, {
            label: "ENTREES",
            value: 'ENTREES'
          }, {
            label: "BEVERAGES",
            value: 'BEVERAGES'
          }, {
            label: "BOTTLED WATER, 1L",
            value: 'BOTTLED WATER, 1L'
          }, {
            label: "JUICE & SOFT DRINKS",
            value: 'JUICE & SOFT DRINKS'
          }, {
            label: "HOUSE MADE BEVERAGES",
            value: 'HOUSE MADE BEVERAGES'
          }, {
            label: "BEER",
            value: 'BEER'
          }, {
            label: "COCKTAILS",
            value: 'COCKTAILS'
          }, {
            label: "DESSERTS",
            value: 'DESSERTS'
          }, {
            label: "SMALL PLATES",
            value: 'SMALL PLATES'
          }, {
            label: "FISH",
            value: 'FISH'
          }, {
            label: "MEAT",
            value: 'MEAT'
          }, {
            label: "SIMPLY COOKED",
            value: 'SIMPLY COOKED'
          }, {
            label: "SIDES",
            value: 'SIDES'
          },

        ];
      }
    }
  }
});

MenuItems.attachSchema(Schema.MenuItem);
