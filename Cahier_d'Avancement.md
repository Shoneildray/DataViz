## CONSOMMATION ALIMENTAIRE ET INCIDENCE SUR L'ECOSYSTEME TERRESTRE ##

**24/11/2020**    
               > Création Repository Github  
               > Création Google Doc  
               > Création Miro  
               > Création salon textuel Discord  
               > Choix du Sujet : "Différentes Notions Environnementales Exposées via un Jeu à Base de Questions (quizz interactif)"  
               > Premières recherches de bases de données  
               > Prise en main de D3    
                 
**01/12/2020**    
               > Redéfinition du sujet : "Nos Habitudes de Consommation Alimentaire et leur Incidence sur l'Ecosystème Terrestre"  
               > Base de données ayant inspiré le sujet : https://www.kaggle.com/dorbicycle/world-foodfeed-production  
               
**06/12/2020** au **09/12/2020**   
               > Etat de l'art sur le sujet   
               > Visualisations intéressantes   
               > Disponibilité des données   
               
**09/12/2020**      
               > Partage des recherches effectuées  
               > Première ébauche du document de cadrage  
               > Pistes esquisses visualisations  
             
**12/12/2020**   
               > Document de cadrage - version définitive : Tâches à accomplir, distribution des rôles, esquisses.  

**13/12/2020**  
               > Peer-review du groupe n°12  
            
**14/12/2020**  
               > Recherche des jeux de données pour réaliser les visualisations  
               > Validation avec l'enseignant des visualisations et du projet.  
                 **Conseils** :   
                 - Rester sur 3/4 visualisations  
                 - Les visualisations peuvent être simples  
                 - Quizz en scrolling  
                 - Visualisation n°1 : Faire une représentation à plat (oublier le cercle), qui sera plus simple à coder et plus lisible  
                 - Visualisation n°3 - version 1 : Penser à des représentations "small multiples".  
                   
**29/12/2020**  
               > Fin de recherche des jeux de données
       
**31/12/2020**  
               > Abandon visualisation n°2 sur les pertes et le gaspillage alimentaires : données insuffisantes.
               
**01/01/2021**  
               > Abandon visualisation n°3 - version 1 sur l'émission de CO2 liée aux transports alimentaires : difficulté à trouver des données liées au transport de nourriture uniquement + tout bien considéré, visualisation avec peu de valeur ajoutée.    

**03/01/2021**    
               > Point Discord sur l'avancement du projet :  
               - Amal travaille sur la visualisation n°1  
               - Bastien a fini le premier jet de sa visualisation et travaille sur le squelette du quizz  
               - Elena cherche des données en lien avec les pertes & le gaspillage alimentaire et réfléchit à une nouvelle visualisation 
               
**06/01/2021**  
               > Travail en groupe l'après-midi. Données trouvées pour la nouvelle visualisation n°2. Première idée de représentation : [Tableau Public](https://public.tableau.com/profile/marcin3282#!/vizhome/MM_W16_2020_WHATISTHECARBONFOOTPRINTOFYOURFOOD/Dashboard1). Une courbe par région du monde, un point par étape de la chaîne d'approvisionnement alimentaire, une liste déroulante pour choisir la catégorie de produit.   

**07/01/2021**   
              > Abandon de l'idée de représentation en courbes superposées pour la visualisation n°2 : trop de valeurs très proches voire identiques (notamment pour les régions du monde à plus haut revenu) donc risque d'obtenir un graphique peu lisible et peu intéressant.  

**09/01/2021**  
              > Après de nombreuses recherches infructueuses, choix de partir sur le même type de représentations que celles de l'article dont sont issues les données : des barplots.   
              APPORTS :   
              - Premier graphique : Graphique intéractif ; Ajout de l'information PIB/tête et tri selon cette variable   
              - Deuxième graphique : Barlot dynamique qui change en fonction de la catégorie d'aliments sélectionnée ; lors du passage de la souris sur l'une des étapes du processus pour l'une des régions du monde, mise en surbrillance de cette étape pour l'ensemble des régions du monde, afin de faciliter la comparaison ; affichage de la valeur exacte lors du survol ; ordre du premier graphique conservé.   
              LIMITE :  
              - Deuxième graphique : Cumul trompeur du barplot, que l'on aimerait interpréter comme le % de pertes et de gaspillage alimentaire total. Or, ce n'est pas le cas.   

**10/01/2021**  
             > Premiers retours sur la visualisation n°1 codée par Amal.  
             > Premiers retours sur la visualisation n°3 et le squelette du quiz codés par Bastien.
             > Mise en commun des codes dans une sandbox.  
 
**11/01/2021**  
             > Premiers retours sur la mise en forme du quiz faite par Amal.  

**12/01/2021**
             > Premiers retours sur les graphiques de la visualisation n°2 codée par Elena.
             > Point Discord    

**13/01/2021**  
             > Dernières modifications avant l'oral  
             > Soutenance de projet  
             **Retours** :  
             - visu 1 -> peut on filtrer ? (Oui)   
             - visu 2.1 -> ok  
             - visu 2.2 -> profiter de l'espace à droite - changer / clarifier  
             - visu 4 -> mettre un meilleur lead  
             
**15/01/2021**  
             > Point Discord avec l'enseignant pour discuter de la visualisation n°2.2  
             > Choix de partir sur un [Small multiples](https://www.thinkoutsidetheslide.com/wp-content/uploads/2015/04/SmallMultiples488.png)  
