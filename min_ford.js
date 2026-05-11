// Pour cette partie on va chercher le chemin le plus court dans notre graph
// premierement je vais creer le graphe
/**
 * Dans un graphe il y a le :
 * sommet, puis son valeur lambda et sa valeur de l'arc
 * 
 * enfaite il y a le sommet de depart et le sommet d'arriver, pour le moment le s dep= x1 et s arrv= x7
 */
const graphe = {
    
    'x1': { lambda: 0, voisins: [{ nom: 'x2', poids: 2 }, { nom: 'x3', poids: 1 }] },
    'x2': { lambda: Infinity, voisins: [{ nom: 'x4', poids: 4 }, { nom: 'x5', poids: 3 }] },
    'x3': { lambda: Infinity, voisins: [{ nom: 'x4', poids: 5 }, { nom: 'x6', poids: 7 }] },
    'x4': { lambda: Infinity, voisins: [{ nom: 'x5', poids: 2 }, { nom: 'x6', poids: 4 }] },
    'x5': { lambda: Infinity, voisins: [{ nom: 'x7', poids: 3 }] },
    'x6': { lambda: Infinity, voisins: [{ nom: 'x7', poids: 1 }] },
    'x7': { lambda: Infinity, voisins: [] }
}

const sommet1=graph.key('x1')
const sommet7=graph.key('x7')

const lambda_i;
const lambda_j;
const poids // on va acceder au valeur de poids pour avoir la valeur de l'arc

while(lambda_i==Infinity) {
    if(lambda_j - lambda_i > poids(i,j)) {
        lambda_j = lambda_i + poids(i,j)
        while(i>j && lambda_j - lam > poids(i,j)){
            if(lambda_j - lambda_i > poids(i,j)) {
                lambda_j = lambda_i + poids(i,j)
            }
        }
    }
    // s'arreter lorsqu'aucun lambda_i ne peut plus etre modifiee
}

// Une fois on a tous les lambdas de notre sommet, on doit avoir un sommet de depart et un sommet d'arriver
const sommet_dep = x1
const sommet_arv = x7

// On va deduire d'ou vient le lambda_7 pour avoir le chemin le plus courts
let chemin_minimal = []
let count = 7;
while(count > 0) {
    if(lamba_j == poids(i,j)+lambda_i) {
        chemin_minimal.push(sommet_i)
    }
    count--;
}

// Voici notre chemin minimal
for(let i=0; i<chemin_minimal.length;i++) {
    console.log(chemin_minimal[i])
}


/**
 * Algorithme de minimisation
 * Numeroter les sommet du graph dans un ordre quelconque, en observant toutefois que le sommet de depart soit marquer x1 et celui d'arrivee soit marquer xn
 * Affecter provisoirement a tous sommet xi tel que i!=1 une valeur de lambda_i = +infini , un tres grand nombres et poser lambda_1 = 0
 * Pour tout sommet xj , tel que lambda_j - lambda_i > v(xi, xj), v(xi,xj) representant la valeur de l'arc (xi, xj) , remplace lambda_j par lamda_i + v(xi, xj)
 * S'arreter lorsqu'aucun lambda_i ne peut plus etre modifiee
 * 
 * Toutefois si i>j et lambda_j - lambda_i > v(xi,xj) , il faut recommencer une partie de l'operation a partir de j
 * 
 * /==> voici notre vraie objectif
 * Pour trouver le chemin a partir de l'algorithm, lambda_i donne, pour xi, la valeur du chemin minimal entre les sommet x1 et xi. Pour trouver ce chemin , il suffit de remonder dans le graph, a partir de xn, en cherchant en fur et a mesure, le ou les predecesseurs de xp, tel que lambda_p = lamba_p-q + v(xp-1, xp)
 */
