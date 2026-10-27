/* LA CARTE de La Pause d'Angel — seul fichier à modifier pour changer burgers, prix, allergènes, boissons.
   Fonctionne en double-clic sur index.html comme en ligne (aucun serveur nécessaire). */
window.MENU_DATA = {
  "_aide": "Fichier unique à modifier pour changer la carte (garder la structure et les virgules/guillemets). Prix en euros (nombre). Pour ajouter la photo d'un burger : mettez le chemin dans \"photo\" (ex. \"assets/photos/vosgien.webp\") et ses dimensions dans \"photoW\"/\"photoH\" ; le burger passera alors en grande section plein écran. Sans photo, il s'affiche en carte dorée. Icônes disponibles : beef, sauce, leaf, tomato, pickle, onion, cheese, chicken, bacon, potato, egg, honey, ring, veggie.",
  "allergens": {
    "A": "Lait de vache",
    "B": "Moutarde",
    "C": "Sulfites",
    "D": "Gluten",
    "E": "Œuf"
  },
  "burgers": {
    "title": "Nos burgers",
    "subtitle": "Seul ou en menu avec frites fraîches ou légumes",
    "notes": [
      "Tous nos burgers peuvent être déclinés avec du poulet",
      "Supplément burger double steak : 3,50 €"
    ],
    "items": [
      {
        "id": "classic",
        "name": "Classic",
        "tagline": "Le burger incontournable.",
        "price": 11.0,
        "menuPrice": 14.0,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Sauce cocktail",
            "icon": "sauce"
          },
          {
            "label": "Salade iceberg",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Cornichons",
            "icon": "pickle"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Cheddar",
            "icon": "cheese"
          }
        ],
        "photo": "assets/photos/classic.webp",
        "photoW": 984,
        "photoH": 759,
        "alt": "Le Classic : steak haché, sauce cocktail qui coule, tomates, cornichons et oignons rouges"
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "tagline": "Le croustillant qui fait la différence.",
        "price": 11.0,
        "menuPrice": 14.0,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Filet de poulet pané croustillant",
            "icon": "chicken"
          },
          {
            "label": "Mayonnaise",
            "icon": "sauce"
          },
          {
            "label": "Salade iceberg",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Cornichons",
            "icon": "pickle"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Mozzarella",
            "icon": "cheese"
          }
        ],
        "photo": "assets/photos/chicken.webp",
        "photoW": 668,
        "photoH": 1058,
        "alt": "Le Chicken : filet de poulet pané croustillant, mozzarella fondue et légumes frais"
      },
      {
        "id": "italien",
        "name": "Italien",
        "prefix": "L'",
        "tagline": "Un burger aux saveurs italiennes, généreux et plein de caractère.",
        "price": 11.0,
        "menuPrice": 14.0,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Sauce pesto",
            "icon": "sauce"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Tomates séchées",
            "icon": "tomato"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Mozzarella",
            "icon": "cheese"
          }
        ],
        "photo": "assets/photos/italien.webp",
        "photoW": 1080,
        "photoH": 824,
        "alt": "L'Italien : steak haché, mozzarella au pesto, roquette et tomates séchées"
      },
      {
        "id": "vegetarien",
        "name": "Végétarien",
        "tagline": "Le plein de fraîcheur dans un burger gourmand.",
        "price": 11.0,
        "menuPrice": 14.0,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Galette de pomme de terre",
            "icon": "potato"
          },
          {
            "label": "Sauce pesto",
            "icon": "sauce"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Légumes grillés",
            "icon": "veggie"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Mozzarella",
            "icon": "cheese"
          }
        ],
        "photo": "assets/photos/vegetarien.webp",
        "photoW": 711,
        "photoH": 732,
        "alt": "Le Végétarien : galette de pomme de terre, légumes grillés, roquette et mozzarella gratinée"
      },
      {
        "id": "cowboy",
        "name": "Cow Boy",
        "tagline": "Un goût fumé, un caractère bien trempé.",
        "price": 11.0,
        "menuPrice": 14.0,
        "allergens": [
          "A",
          "C",
          "D"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Bacon",
            "icon": "bacon"
          },
          {
            "label": "Sauce barbecue",
            "icon": "sauce"
          },
          {
            "label": "Oignons ring",
            "icon": "ring"
          },
          {
            "label": "Salade iceberg",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Cheddar",
            "icon": "cheese"
          }
        ],
        "photo": "assets/photos/cowboy.webp",
        "photoW": 1021,
        "photoH": 707,
        "alt": "Le Cow Boy : steak, bacon, cheddar fondu, oignon ring et sauce barbecue"
      },
      {
        "id": "montagnard",
        "name": "Montagnard",
        "tagline": "",
        "price": 11.5,
        "menuPrice": 14.5,
        "allergens": [
          "A",
          "B",
          "C",
          "D"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Sauce moutarde au miel",
            "icon": "honey"
          },
          {
            "label": "Bacon",
            "icon": "bacon"
          },
          {
            "label": "Galette de pomme de terre",
            "icon": "potato"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          }
        ],
        "photo": "",
        "photoW": 0,
        "photoH": 0,
        "alt": ""
      },
      {
        "id": "vosgien",
        "name": "Vosgien",
        "tagline": "",
        "price": 11.5,
        "menuPrice": 14.5,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Sauce poivre",
            "icon": "sauce"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Lardons",
            "icon": "bacon"
          },
          {
            "label": "Munster",
            "icon": "cheese"
          }
        ],
        "photo": "",
        "photoW": 0,
        "photoH": 0,
        "alt": ""
      },
      {
        "id": "berger",
        "name": "Berger",
        "tagline": "",
        "price": 11.5,
        "menuPrice": 14.5,
        "allergens": [
          "A",
          "C",
          "D"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Miel",
            "icon": "honey"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Cornichons",
            "icon": "pickle"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Chèvre",
            "icon": "cheese"
          }
        ],
        "photo": "",
        "photoW": 0,
        "photoH": 0,
        "alt": ""
      },
      {
        "id": "jurassien",
        "name": "Jurassien",
        "tagline": "",
        "price": 11.5,
        "menuPrice": 14.5,
        "allergens": [
          "A",
          "C",
          "D"
        ],
        "ingredients": [
          {
            "label": "Steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Sauce poivre",
            "icon": "sauce"
          },
          {
            "label": "Bacon",
            "icon": "bacon"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Comté",
            "icon": "cheese"
          }
        ],
        "photo": "",
        "photoW": 0,
        "photoH": 0,
        "alt": ""
      },
      {
        "id": "giga",
        "name": "Giga Burger",
        "tagline": "",
        "price": 17.0,
        "menuPrice": 19.0,
        "allergens": [
          "A",
          "C",
          "D",
          "E"
        ],
        "ingredients": [
          {
            "label": "Double steak haché frais 150 g",
            "icon": "beef"
          },
          {
            "label": "Mayonnaise",
            "icon": "sauce"
          },
          {
            "label": "Galette de pomme de terre",
            "icon": "potato"
          },
          {
            "label": "Roquette",
            "icon": "leaf"
          },
          {
            "label": "Tomates fraîches",
            "icon": "tomato"
          },
          {
            "label": "Oignons rouges",
            "icon": "onion"
          },
          {
            "label": "Œuf",
            "icon": "egg"
          },
          {
            "label": "Camembert",
            "icon": "cheese"
          }
        ],
        "photo": "",
        "photoW": 0,
        "photoH": 0,
        "alt": ""
      }
    ]
  },
  "kids": {
    "title": "Menu enfant",
    "items": [
      {
        "name": "Tenders (4 pièces) ou Cheese",
        "price": 14.0,
        "description": "Le Cheese = steak haché frais, salade iceberg, tomate fraîche, cheddar et sauce ketchup ou mayonnaise. Accompagné de frites fraîches, d'un Capri-Sun, d'une compote ou du dessert du moment."
      }
    ]
  },
  "sides": {
    "title": "Frites fraîches et accompagnements",
    "image": "assets/photos/tenders.webp",
    "imageW": 1080,
    "imageH": 639,
    "imageAlt": "Tenders de poulet croustillants et frites fraîches",
    "items": [
      {
        "name": "Frites natures",
        "price": 4.5
      },
      {
        "name": "Bacon sur frites",
        "price": 1.5
      },
      {
        "name": "Sauce champignon maison",
        "price": 2.5
      },
      {
        "name": "Sauce cheddar",
        "price": 2.5
      },
      {
        "name": "Sauce poivre",
        "price": 2.5
      },
      {
        "name": "Œuf dans burger",
        "price": 1.5
      }
    ]
  },
  "starters": {
    "title": "Amuses-bouches",
    "items": [
      {
        "name": "Tenders (les 2 pièces)",
        "price": 3.5
      },
      {
        "name": "Tenders gourmands (2 pièces)",
        "price": 5.0
      },
      {
        "name": "Beignets de calamar à la romaine (les 3 pièces)",
        "price": 2.5
      },
      {
        "name": "Bouchées au camembert (la pièce)",
        "price": 1.0
      },
      {
        "name": "Oignon rings (les 3 pièces)",
        "price": 2.5
      }
    ]
  },
  "localBeers": {
    "title": "Bières locales de Doncourt",
    "image": "assets/photos/bieres.webp",
    "imageW": 1080,
    "imageH": 277,
    "imageAlt": "Les bouteilles de bières La Doncourt : fruits rouges, IPA, blondinette, triple blonde et blanche",
    "items": [
      {
        "name": "La Blondinette",
        "detail": "33 cl · 5,2 %",
        "price": 3.0
      },
      {
        "name": "La Blanche",
        "detail": "33 cl · 5 %",
        "price": 3.0
      },
      {
        "name": "La Fruits rouges",
        "detail": "33 cl · 4,5 %",
        "price": 3.0
      },
      {
        "name": "La Triple blonde",
        "detail": "33 cl · 8 %",
        "price": 3.0
      },
      {
        "name": "La IPA",
        "detail": "33 cl · 6,2 %",
        "price": 3.0
      }
    ]
  },
  "drinks": {
    "title": "Bières et vins",
    "items": [
      {
        "name": "Heineken",
        "detail": "25 cl",
        "price": 2.5
      },
      {
        "name": "Leffe Ruby",
        "detail": "25 cl",
        "price": 2.5
      },
      {
        "name": "Kronenbourg 1664",
        "detail": "25 cl",
        "price": 2.5
      },
      {
        "name": "Corona",
        "detail": "33 cl",
        "price": 3.0
      },
      {
        "name": "Vin rouge de Bordeaux",
        "detail": "75 cl",
        "price": 6.0
      },
      {
        "name": "Vin rosé",
        "detail": "75 cl",
        "price": 6.0
      }
    ]
  },
  "legal": [
    "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    "Tarifs de vente à emporter."
  ]
};
