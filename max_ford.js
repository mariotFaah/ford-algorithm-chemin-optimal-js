/**
 * Algorithm de maximisation Ford
 * 1- Numeroter les chemins du graphe dans un ordre quelconque, en observant toutefois que le sommet de depart doit etre marquer par x1 et celui d'arriver doit etre xn. 
 * 2- Affecter provisoirement a tout sommet xi, une valeur lambda_i = 0 et poser lambda_1 = 0
 * 3- Pour tout sommet xj, tel que lamba_j - lambda_i < v(xi, xj), v(xi, xj) represente la valeur de (xi, xj) , remplacer lambda_j par lambda_i + v(xi, xj)
 * 4- S'arreter lorsque lambda_i ne peut plus etre modifiee
 * 
 * NB: Toutefois si i>j et lambda_j - lambda_i < v(xi, xj), il faut recommencer une partie de l'operation a partir de j
 * 
 * 
 * Pour trouver le chemin
 * A la fin de l'algorithm, lambda_i donne, pour xi, la valeur du chemin minimal entre les sommets x1 et xi. Pour trouver ce chemin, il suffit de remonter dans le graphe, a partir de xn, en cherchant au fur et a mesure, le ou les predecesseurs du sommet xp, tel que lambda_p = lambda_p-1 + v(xp-1, xp)
 */

/**
 * Algorithme de maximisation Ford AVEC détection de cycles
 */

// Fichier : maximisation-ford.js
// Algorithme de maximisation Ford (chemin le plus long)

const graphe = {
    'x1': { lambda: 0, voisins: [{ nom: 'x2', poids: 10 }] },
    'x2': { lambda: 0, voisins: [{ nom: 'x3', poids: 15 }, { nom: 'x4', poids: 8 }] },
    'x3': { lambda: 0, voisins: [{ nom: 'x6', poids: 1 }, { nom: 'x11', poids: 16 }] },
    'x4': { lambda: 0, voisins: [{ nom: 'x3', poids: 8 }, { nom: 'x5', poids: 6 }] },
    'x5': { lambda: 0, voisins: [{ nom: 'x6', poids: 5 }, { nom: 'x9', poids: 1 }] },
    'x6': { lambda: 0, voisins: [{ nom: 'x5', poids: 5 }, { nom: 'x7', poids: 4 }] },
    'x7': { lambda: 0, voisins: [{ nom: 'x8', poids: 1 }, { nom: 'x11', poids: 8 }] },
    'x8': { lambda: 0, voisins: [{ nom: 'x7', poids: 1 }, { nom: 'x10', poids: 2 }] },
    'x9': { lambda: 0, voisins: [{ nom: 'x8', poids: 3 }, { nom: 'x10', poids: 4 }] },
    'x10': { lambda: 0, voisins: [{ nom: 'x12', poids: 7 }] },
    'x11': { lambda: 0, voisins: [{ nom: 'x12', poids: 6 },{ nom: 'x13', poids: 12 }] },
    'x12': { lambda: 0, voisins: [{ nom: 'x15', poids: 9 }] },
    'x13': { lambda: 0, voisins: [{ nom: 'x14', poids: 3 }] },
    'x14': { lambda: 0, voisins: [{ nom: 'x16', poids: 3 }] },
    'x15': { lambda: 0, voisins: [{ nom: 'x14', poids: 5 }, { nom: 'x16', poids: 6 }] },
    'x16': { lambda: 0, voisins: [] }
};

let modification = true;
while(modification) {
    modification = false;
    for(let sommet in graphe) {
        const lambda_i = graphe[sommet].lambda;
        if (!graphe[sommet].voisins || !Array.isArray(graphe[sommet].voisins)) {
            continue;
        }
        for(let voisin of graphe[sommet].voisins) {
            const nom_j = voisin.nom;
            const poids = voisin.poids;
            const lambda_j = graphe[nom_j].lambda;

            if(lambda_j < lambda_i + poids) {
                graphe[nom_j].lambda = lambda_i + poids;  
                modification = true;
            }
        }
    }
}

console.log("Valeurs lambda finales :");
for (let sommet in graphe) {
    console.log(`${sommet} : lambda = ${graphe[sommet].lambda}`);
}