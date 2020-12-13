let data =[

    {id : 0,
        next : 1,
        prec : "null",
        question : "Vous êtes",
        repType : "button",
        responses : [ {
            text : "HOMME"
        },
            {
            text : "FEMME"
        }
        ]

    },
    {
        id : 1,
        next : 2,
        prec : 0,
        question : "Vous êtes né(e) le ",
        repType : "date",
        responses: [ {
            placeholder : "jour",
            text : "jour "
        },{
            placeholder : "mois",
            text : "mois "
        },{
            placeholder : "années",
            text : " annees "
        } ]
    },
    {
        id : 2,
        next : 3,
        prec : 1,
        question : "Votre taille",
        repType : "text",
        responses: [ {
            placeholder : "taille",
            text : "taille"
        }]
    },
    {
        id : 3,
        next : 4,
        prec : 2,
        question : "Votre poids",
        repType : "text",
        responses: [ {
            placeholder : "poids",
            text : "poids"
        }]
    },
    {id : 4,
        next : 5,
        prec : 3,
        question : "Quels sont vos objectifs pour votre programme 1Food1Me ?",
        repType : "button",
        responses : [
            {
            text : "Améliorer ma performance physique"
            },
            {
                text : "Détecter des carences alimentaires"
            },
            {
                text:"Augmenter mes chances de vieillir en bonne santé"
            },
            {
                text:"Perdre de 1 à 3 kgs"
            },
            {
                text:"Augmenter mes chances de vieillir en bonne santé"
            },
            {
                text:"Perdre plus de 4kgs"
            },
            {
                text:"Prendre du poids"
            },
            {
                text:"Stabiliser mon poids"
            },
        ]

    },
    {id : 5,
        next : 6,
        prec : 4,
        question : "How much Pensez-vous expérimenter du stress ?",
        repType : "button",
        responses : [
            {
                text : "Jamais / pas du tout "
            },
            {
                text : "Un peu "
            },
            {
                text : "Beaucoup "
            },
            {
                text : "de temps en temps"
            },
            {
                text : "beaucoup, tous le temps"
            },


        ]

    },
    {id : 6,
        next : 7,
        prec : 5,
        question : "Habitudes alimentaires",
        repType : "button",
        responses : [
            {
                text : "Non, je ne suis pas de régime particulier"
            },
            {
                text : "Végétarien : je ne mange pas de viande (ni viande rouge, ni viande blanche), ni de poisson, mais je mange des oeufs et des produits laitiers (yaourt, beurre, fromage)"
            },
            {
                text : "Pesco-végétarien : je ne mange pas de viande (ni viande rouge, ni viande blanche), mais je mange du poisson, des oeufs et des produits laitiers (yaourt, beurre, fromage)"
            },
            {
                text : "Vegan/Végétalien : je ne mange aucun produit d’origine animale (pas de viande rouge ou blanche, ni de poisson, oeuf, fromage, yaourt, beurre…)"
            },
            {
                text : "Sans gluten : je ne mange pas de pain ni d’aliments à base de blé, d’orge, d’avoine, d’épautre ou de seigle (pains de mie, biscottes, pâtes ou spaghettis, semoule, pâtes à tarte, pâtisseries…)"
            },


        ]

    },
    {id : 7,
        next : 8,
        prec : 6,
        question : "Y-a-t-il des aliments que vous ne consommez pas ?",
        repType : "viande",
        responses : {
        viande: [
            {
                text : "Viande rouge"
            },
            {
                text : "Viande blanche"
            },
            {
                text : "Porc"
            },
            {
                text : "Poisson"
            },
            {
                text : "Oeufs"
            },
            {
                text : "Lait de vache"
            },
            {
                text : "Yaourt"
            },
            {
                text : "Fromage"
            },


        ]
       }

    },{id : 8,
        next : 9,
        prec : 7,
        question : "What's your ethnicity?",
        repType : "button",
        responses : [
            {
                text : "Jamais ou peu (moins d’une fois par quinzaine)"
            },
            {
                text : "2 fois par semaine"
            },
            {
                text : "3 fois par semaine"
            },
            {
                text : "4-5 fois par semaine"
            },
            {
                text : "1 fois par jour, tous les jours"
            },
            {
                text : "2 fois par jour, ou plus, tous les jours"
            }


        ]

    },
    {id : 9,
        next : 10,
        prec : 8,
        question : "Activité sportive",
        repType : "button",
        responses : [
            {
                text : "je ne pratique pas d'activité sportive"
            },
            {
                text : "10 min "
            },
            {
                text : "20 min "
            },
            {
                text : "30 min "
            },
            {
                text : "40 min "
            },
            {
                text : "50 min"
            },
            {
                text : "60 min"
            },
            {
                text:"1h15"
            },
            {
                text:"1h30"
            },
            {
                text:"1h45"
            },
            {
                text:"2h"
            },
            {
                text:"2h15"
            },
            {
                text: "3h"
            },
            {
                text: "3h:30"
            },
            {
                text: "3h:30"
            }



        ]

    },
    {id : 10,
        next : 11,
        prec : 9,
        question : "Activité physique",
        repType : "button",
        responses : [
            {
                text : "Moins de 5 Min "
            },
            {
                text : "5 Min "
            },
            {
                text : "10 min "
            },
            {
                text : "20 min "
            },
            {
                text : "30 min "
            },
            {
                text : "40 min"
            },
            {
                text : "50 min"
            },
            {
                text:"60 min"
            },
            {
                text:"1h30"
            },
            {
                text:"2h"
            },
            {
                text:"3h"
            },
            {
                text:"plus de 3h "
            }


        ]

    },
    {id : 11,
        next : 12,
        prec : 10,
        question : "Compléments alimentaires",
        repType : "button",
        responses : [

            {
                text:"Oui"
            },
            {
                text:"Non"
            }


        ]

    },
    {id : 12,
        next : 13,
        prec : 11,
        question : "Lesquels ? ",
        repType : "button",
        responses : [

            {
                text:"Vitamine C"
            },
            {
                text:"Vitamine D"
            },
            {
                text:"Fer"
            },
            {
                text:"Magnésium"
            },
            {
                text:"Potassium"
            },
            {
                text:"Zinc"
            },
            {
                text:"Probiotiques"
            },
            {
                text:"Antioxydants"
            },
            {
                text:"Huile de poisson ou EPA ou DHA ou Oméga-3"
            },
            {
                text:"Complexe multi-vitamines"
            },
            {
                text:"Vitamine B12"
            },
            {
                text:"Glutamine"
            },
            {
                text:"Vitamine B9"
            },
            {
                text:"Autre"
            }


        ]

    },
    {id : 13,
        next : 14,
        prec : 12,
        question : "Informations de compte",
        repType : "text",
        responses : [

            {
                placeholder : "Nom",
                text : "Nom"
            },
            {
                placeholder : "Prenom",
                text : "Prenom"
            },
            {
                placeholder : "Email",
                text : "Email"
            }

        ]

    }
]

export default data
