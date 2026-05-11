// Pour cette partie on va chercher le chemin le plus court dans notre graphe
// Premièrement je vais créer le graphe

// const graphe = {
//     'x1': { lambda: 0, voisins: [{ nom: 'x2', poids: 2 }, { nom: 'x3', poids: 1 }] },
//     'x2': { lambda: Infinity, voisins: [{ nom: 'x4', poids: 4 }, { nom: 'x5', poids: 3 }] },
//     'x3': { lambda: Infinity, voisins: [{ nom: 'x4', poids: 5 }, { nom: 'x6', poids: 7 }] },
//     'x4': { lambda: Infinity, voisins: [{ nom: 'x5', poids: 2 }, { nom: 'x6', poids: 4 }] },
//     'x5': { lambda: Infinity, voisins: [{ nom: 'x7', poids: 3 }] },
//     'x6': { lambda: Infinity, voisins: [{ nom: 'x7', poids: 1 }] },
//     'x7': { lambda: Infinity, voisins: [] }
// };
const graphe = {
    'x1': { lambda: 0, voisins: [{ nom: 'x2', poids: 10 }] },
    'x2': { lambda: Infinity, voisins: [{ nom: 'x3', poids: 15 }, { nom: 'x4', poids: 8 }] },
    'x3': { lambda: Infinity, voisins: [{ nom: 'x6', poids: 1 }, { nom: 'x11', poids: 16 }] },
    'x4': { lambda: Infinity, voisins: [{ nom: 'x3', poids: 8 }, { nom: 'x5', poids: 6 }] },
    'x5': { lambda: Infinity, voisins: [{ nom: 'x6', poids: 5 }, { nom: 'x9', poids: 1 }] },
    'x6': { lambda: Infinity, voisins: [{ nom: 'x5', poids: 5 }, { nom: 'x7', poids: 4 }] },
    'x7': { lambda: Infinity, voisins: [{ nom: 'x8', poids: 1 }, { nom: 'x11', poids: 8 }] },
    'x8': { lambda: Infinity, voisins: [{ nom: 'x7', poids: 1 }, { nom: 'x10', poids: 2 }] },
    'x9': { lambda: Infinity, voisins: [{ nom: 'x8', poids: 3 }, { nom: 'x10', poids: 4 }] },
    'x10': { lambda: Infinity, voisins: [{ nom: 'x12', poids: 7 }] },
    'x11': { lambda: Infinity, voisins: [{ nom: 'x12', poids: 6 },{ nom: 'x13', poids: 12 }] },
    'x12': { lambda: Infinity, voisins: [{ nom: 'x15', poids: 9 }] },
    'x13': { lambda: Infinity, voisins: [{ nom: 'x14', poids: 3 }] },
    'x14': { lambda: Infinity, voisins: [{ nom: 'x16', poids: 3 }] },
    'x15': { lambda: Infinity, voisins: [{ nom: 'x14', poids: 5 }, { nom: 'x16', poids: 6 }] },
    'x16': { lambda: Infinity, voisins: [] }
};

// Algorithme de minimisation des lambdas 
let modification = true;
while (modification) {
    modification = false;
    
    // Parcours de tous les sommets du graphe
    for (let sommet in graphe) {
        const lambda_i = graphe[sommet].lambda;
        
        // Pour chaque voisin du sommet courant
        for (let voisin of graphe[sommet].voisins) {
            const nom_j = voisin.nom;
            const poids = voisin.poids;
            const lambda_j = graphe[nom_j].lambda;
            
            // Relaxation : si on trouve un chemin plus court vers le voisin
            if (lambda_j > lambda_i + poids) {
                graphe[nom_j].lambda = lambda_i + poids;
                modification = true;
            }
        }
    }
}

// Résultats des lambdas
console.log("Valeurs lambda finales :");
for (let s in graphe) {
    console.log(`${s} : lambda = ${graphe[s].lambda}`);
}

// On déduit le chemin le plus court de x1 à x16
const sommet_dep = 'x1';
const sommet_arr = 'x16';

let chemin_minimal = [];
let courant = sommet_arr;

while (courant !== sommet_dep) {
    chemin_minimal.unshift(courant); // ajoute au début ??Pourquoi on utilise pas push() ici
    
    let trouve_predecesseur = false;
    
    // Cherche le prédécesseur p tel que lambda(p) + poids(p->courant) = lambda(courant)
    for (let sommet in graphe) {
        for (let voisin of graphe[sommet].voisins) {
            if (voisin.nom === courant) {
                if (graphe[sommet].lambda + voisin.poids === graphe[courant].lambda) {
                    courant = sommet;
                    trouve_predecesseur = true;
                    break;
                }
            }
        }
        if (trouve_predecesseur) break;
    }
    
    if (!trouve_predecesseur) {
        console.log("Erreur : chemin non trouvé");
        break;
    }
}
chemin_minimal.unshift(sommet_dep);

// Affichage du chemin minimal
console.log("\nChemin minimal :");
console.log(chemin_minimal.join(" -> "));