/**
 * Calcule le chemin le plus court en utilisant l'algorithme de Bellman-Ford
 * @param {Object} grapheInitial - Le graphe d'entrée
 * @param {string} depart - Sommet source
 * @param {string} arrivee - Sommet destination
 * @returns {Object} - Contient le chemin et la distance totale
 */
const calculerPlusCourtChemin = (grapheInitial, depart, arrivee) => {
    // 1. Initialisation (Copie profonde pour l'immutabilité)
    const etats = {};
    for (let sommet in grapheInitial) {
        etats[sommet] = {
            lambda: sommet === depart ? 0 : Infinity,
            parent: null
        };
    }

    // 2. Phase de relaxation (Minimisation des lambdas)
    let modification = true;
    while (modification) {
        modification = false;
        
        for (let sommet in grapheInitial) {
            const lambda_i = etats[sommet].lambda;
            
            // Si le sommet n'a pas encore été atteint, on passe
            if (lambda_i === Infinity) continue;

            for (let voisin of grapheInitial[sommet].voisins) {
                const nom_j = voisin.nom;
                const poids = voisin.poids;
                const lambda_j = etats[nom_j].lambda;

                if (lambda_j > lambda_i + poids) {
                    etats[nom_j].lambda = lambda_i + poids;
                    etats[nom_j].parent = sommet; // On enregistre le chemin ici
                    modification = true;
                }
            }
        }
    }

    // 3. Reconstruction du chemin (du point B vers le point A)
    const chemin = [];
    let courant = arrivee;

    while (courant !== null) {
        chemin.unshift(courant); // On utilise unshift pour garder l'ordre chronologique
        courant = etats[courant].parent;
    }

    // 4. Retour des résultats
    return {
        distance: etats[arrivee].lambda,
        chemin: chemin[0] === depart ? chemin : [], // Vérifie si le chemin est complet
        succes: chemin[0] === depart
    };
};

// --- Utilisation du code ---

const monGraphe = {
    'x1': { voisins: [{ nom: 'x2', poids: 10 }] },
    'x2': { voisins: [{ nom: 'x3', poids: 15 }, { nom: 'x4', poids: 8 }] },
    'x3': { voisins: [{ nom: 'x6', poids: 1 }, { nom: 'x11', poids: 16 }] },
    'x4': { voisins: [{ nom: 'x3', poids: 8 }, { nom: 'x5', poids: 6 }] },
    'x5': { voisins: [{ nom: 'x6', poids: 5 }, { nom: 'x9', poids: 1 }] },
    'x6': { voisins: [{ nom: 'x5', poids: 5 }, { nom: 'x7', poids: 4 }] },
    'x7': { voisins: [{ nom: 'x8', poids: 1 }, { nom: 'x11', poids: 8 }] },
    'x8': { voisins: [{ nom: 'x7', poids: 1 }, { nom: 'x10', poids: 2 }] },
    'x9': { voisins: [{ nom: 'x8', poids: 3 }, { nom: 'x10', poids: 4 }] },
    'x10': { voisins: [{ nom: 'x12', poids: 7 }] },
    'x11': { voisins: [{ nom: 'x12', poids: 6 },{ nom: 'x13', poids: 12 }] },
    'x12': { voisins: [{ nom: 'x15', poids: 9 }] },
    'x13': { voisins: [{ nom: 'x14', poids: 3 }] },
    'x14': { voisins: [{ nom: 'x16', poids: 3 }] },
    'x15': { voisins: [{ nom: 'x14', poids: 5 }, { nom: 'x16', poids: 6 }] },
    'x16': { voisins: [] }
};

const resultat = calculerPlusCourtChemin(monGraphe, 'x1', 'x16');

if (resultat.succes) {
    console.log(`Distance totale : ${resultat.distance}`);
    console.log(`Chemin : ${resultat.chemin.join(' -> ')}`);
} else {
    console.log("Aucun chemin trouvé.");
}