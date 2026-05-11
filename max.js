/**
 * Recherche du chemin le plus long SANS cycle (Simple Longest Path)
 * @param {Object} graphe - Le graphe d'entrée
 * @param {string} depart - Sommet x1
 * @param {string} arrivee - Sommet x16
 */
const trouverCheminCritiqueSansBoucle = (graphe, depart, arrivee) => {
    let meilleurChemin = [];
    let distanceMaximale = -Infinity;

    // Fonction récursive pour explorer les chemins
    const explorer = (sommetCourant, distanceActuelle, cheminActuel, visites) => {
        
        // Si on atteint la destination
        if (sommetCourant === arrivee) {
            if (distanceActuelle > distanceMaximale) {
                distanceMaximale = distanceActuelle;
                meilleurChemin = [...cheminActuel]; // Copie du chemin
            }
            return;
        }

        // On parcourt les voisins
        const voisins = graphe[sommetCourant].voisins;
        for (let voisin of voisins) {
            // ANTI-BOUCLE : On n'entre dans le voisin que si on ne l'a pas encore visité
            if (!visites.has(voisin.nom)) {
                
                // Marquage (On entre dans le sommet)
                visites.add(voisin.nom);
                cheminActuel.push(voisin.nom);

                // Appel récursif
                explorer(
                    voisin.nom, 
                    distanceActuelle + voisin.poids, 
                    cheminActuel, 
                    visites
                );

                // Backtracking (On ressort du sommet pour tester d'autres options)
                cheminActuel.pop();
                visites.delete(voisin.nom);
            }
        }
    };

    // Initialisation
    const visitesInitiales = new Set([depart]);
    explorer(depart, 0, [depart], visitesInitiales);

    return {
        succes: meilleurChemin.length > 0,
        distance: distanceMaximale,
        chemin: meilleurChemin
    };
};

// --- Ton Graphe avec les cycles (x5-x6 et x7-x8) ---
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

// Appel
const resultat = trouverCheminCritiqueSansBoucle(monGraphe, 'x1', 'x16');

if (resultat.succes) {
    console.log("--- MAXIMISATION (SANS BOUCLES) ---");
    console.log(`Distance Max : ${resultat.distance}`);
    console.log(`Chemin : ${resultat.chemin.join(' -> ')}`);
} else {
    console.log("Aucun chemin trouvé.");
}