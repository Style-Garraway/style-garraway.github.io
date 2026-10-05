# Portfolio — Style Garraway

Site vitrine pour le BTS SIO option SISR. HTML, CSS et JavaScript à la main.
Aucun framework, aucune installation, aucune dépendance.

> **Ce fichier est écrit pour toi dans six mois, quand tu auras tout oublié.**
> Lis-le tranquillement, il répond à tout.

---

## Ouvrir le site pour le regarder

Le site a plusieurs pages qui se parlent entre elles. Le plus fiable est de
lancer un petit serveur local, depuis le dossier du site :

```bash
python -m http.server 8321
```

Puis va sur `http://localhost:8321` dans ton navigateur. Pour arrêter : `Ctrl+C`.

Tu peux aussi double-cliquer sur `index.html`, mais selon le navigateur le
contenu peut ne pas s'afficher. Le serveur local, lui, marche toujours.

---

## Les pages du site

```
portfolio-bts/
│
├── index.html              Accueil : qui je suis + accès aux 6 pages
├── a-propos.html           À propos
├── competences.html        Compétences
├── projets.html            La liste des projets (un seul pour l'instant)
│   └── projet-mairie-abymes.html   Infrastructure Active Directory, mairie des Abymes
├── certifications.html     Certifications, badges et certificats à télécharger
├── parcours.html           Formation et stages
├── veille.html             Veille technologique
├── contact.html            Contact
│
├── mentions-legales.html   Page légale
├── 404.html                Page affichée si un lien est cassé
│
├── README.md               Ce fichier
├── .nojekyll               Fichier vide, obligatoire pour GitHub Pages
├── favicon.svg             L'icône dans l'onglet du navigateur
│
└── assets/
    ├── css/style.css       ← l'apparence
    ├── js/data.js          ← ★ TON CONTENU
    ├── js/app.js           ← la mécanique (ne pas toucher)
    ├── certifs/            ★ tes badges et certificats (images + PDF)
    ├── docs/               les documentations techniques des projets (PDF)
    ├── fonts/              les polices (voir le LISEZ-MOI dedans)
    ├── img/                l'image d'aperçu de lien
    └── cv/                 ton CV en PDF (voir le LISEZ-MOI dedans)
```

---

## Le principe à comprendre

**Les fichiers HTML sont presque vides.** Chacun contient seulement :

- ses balises pour Google (le titre de l'onglet, la description) ;
- des conteneurs vides que le JavaScript vient remplir.

**Le menu et le pied de page n'existent dans aucun fichier HTML.** Ils sont
fabriqués par `app.js` à partir de la liste `PAGES` dans `data.js`.

C'est le point important : si tu ajoutes une entrée au menu, elle apparaît
**automatiquement sur les 12 pages**. Tu n'auras jamais un menu différent d'une
page à l'autre, et tu n'auras jamais à modifier 12 fichiers à la main.

### La règle à retenir

| Je veux… | Je modifie |
|---|---|
| Changer un projet, une compétence, ma veille, mon parcours | `assets/js/data.js` |
| Changer le nom d'une entrée du menu | `assets/js/data.js`, liste `PAGES` |
| Changer une couleur | `assets/css/style.css`, **section 01** |
| Changer le titre d'onglet ou la description lue par Google | Le bloc signalé en haut du fichier HTML concerné |
| Le reste | **rien à toucher** |

**`app.js` n'a jamais besoin d'être modifié.**

---

## Ajouter un projet

Il y a **deux étapes**, parce qu'un projet a maintenant sa propre page.

### Étape 1 — Le contenu, dans `data.js`

Trouve la liste `const PROJETS = [`, descends jusqu'à la dernière accolade
fermante `}` avant le crochet `]`, **ajoute une virgule**, puis colle ce bloc :

```javascript
  {
    id: "mon-projet",
    titre: "Le titre du projet",
    sousTitre: "TP n°X ou Stage chez ...",
    periode: "2027",
    tags: ["Techno 1", "Techno 2", "Techno 3"],

    contexte: "L'organisation, sa taille, son activité.",
    probleme: "Ce qui ne marchait pas AVANT.",
    solution: "Ce que TU as mis en place, techniquement.",
    outils: ["Outil 1", "Outil 2", "Outil 3"],
    resultats: [
      "Un chiffre.",
      "Un autre chiffre.",
      "Un troisième chiffre."
    ],
    appris: "Ce que tu retiens, y compris ce qui a coincé."
  }
```

⚠️ **L'`id` ne doit contenir ni espace, ni accent, ni majuscule.** C'est lui qui
donne le nom du fichier de la page.

### Étape 2 — La page, en copiant un fichier existant

1. Copie `projet-share.html` et renomme la copie **`projet-mon-projet.html`**
   (le même `id` qu'à l'étape 1, précédé de `projet-`).
2. Ouvre le nouveau fichier. **Il n'y a que 4 choses à changer :**

```html
<title>Le titre du projet — Style Garraway</title>
<meta name="description" content="Deux phrases qui résument le projet.">
<meta property="og:title" content="Le titre du projet">

<body data-page="projets" data-projet="mon-projet">
```

La dernière ligne est la plus importante : **`data-projet` doit être exactement
l'`id`** que tu as écrit dans `data.js`.

3. Enregistre. Le projet apparaît dans la liste, et sa page fonctionne.

> Si tu te trompes d'`id`, la page affiche un message orange qui te le dit
> précisément. Elle ne reste jamais vide sans explication.

**Un quatrième projet est déjà écrit en commentaire dans `data.js`**
(*Les Jardins de Saint-Éloi*, ton TP avec le switch Cisco). Enlève les `//`
devant chaque ligne, crée `projet-saint-eloi.html`, et il est en ligne.

### Les erreurs qui cassent la page

Si une page devient blanche après ta modification, c'est presque toujours :

- une **virgule oubliée** entre deux blocs, ou une virgule en trop après le dernier ;
- un **guillemet fermant manquant** autour d'un texte ;
- une **accolade** `}` ou un **crochet** `]` supprimé par erreur.

Pour voir l'erreur exacte : `F12` dans le navigateur, onglet **Console**. Le
message indique le numéro de ligne.

---

## Ajouter une page entière

Rare, mais voici comment faire.

1. Copie `veille.html` (c'est la plus simple) et renomme-la, par exemple
   `certifications.html`.
2. Dans le nouveau fichier, change le `<title>`, la description, et surtout
   `<body data-page="certifications">`.
3. Dans `data.js`, ajoute une entrée à la liste `PAGES` :

```javascript
  {
    cle: "certifications",
    fichier: "certifications.html",
    menu: "Certifications",
    titre: "Mes certifications",
    chapo: "Une phrase d'introduction, ou \"\" si tu n'en veux pas.",
    resume: "La phrase affichée sur la carte de l'accueil."
  }
```

Le menu, le pied de page et la vignette sur l'accueil se mettent à jour tout
seuls, sur toutes les pages.

---

## Ajouter une certification ou un badge

La page `certifications.html` existe pour qu'un visiteur puisse **tout voir et
tout vérifier lui-même**. Chaque entrée affiche son badge officiel quand il y en
a un, et un lien direct vers le certificat.

### Étape 1 — Déposer les fichiers

Mets le badge et le certificat dans `assets/certifs/`, avec des noms sans
accent, sans espace, en minuscules :

```
badge-cisco-ccna.png            le badge officiel, si tu en as un (carré)
apercu-cisco-ccna.png           une capture du certificat, si tu n'as pas de badge
certificat-cisco-ccna.pdf       le certificat officiel
```

### Étape 2 — Ajouter le bloc dans `data.js`

Dans `const CERTIFICATIONS`, trouve le bon groupe et ajoute :

```javascript
      {
        nom: "Le titre exact, tel qu'il est écrit sur le certificat",
        organisme: "Cisco Networking Academy",
        date: "15 juin 2027",
        badge: "assets/certifs/badge-cisco-ccna.png",
        apercu: "",
        fichier: "assets/certifs/certificat-cisco-ccna.pdf",
        poids: "230 Ko",
        couvre: "Une ligne sur ce que le certificat atteste."
      }
```

Tous les champs sauf `nom`, `organisme` et `date` peuvent rester vides (`""`).
S'il n'y a ni badge ni aperçu, la carte affiche un simple losange.

### ⚠️ Les deux règles à ne jamais casser

**1. Le premier groupe de la liste doit rester celui des vraies certifications.**
Le compteur en haut de page (« 5 certifications obtenues ») compte uniquement ce
premier groupe. Si tu y ajoutes des modules de formation, le compteur devient
mensonger — et c'est exactement ce qu'un recruteur te reprocherait s'il creusait.

**2. Ne mélange jamais les modules Microsoft Learn avec les certifications.**
Ce sont des parcours suivis, pas des examens passés. Ils ont leur propre groupe,
avec une phrase qui le dit explicitement. Cette honnêteté est un atout, pas une
faiblesse : elle montre que tu sais ce que vaut chaque ligne de ton dossier.

### Le poids des fichiers

Le dossier `assets/certifs/` pèse environ **5,6 Mo**, dont 5 Mo de PDF. Ce n'est
pas un problème : les PDF ne sont téléchargés **que si un visiteur clique
dessus**. Seules les 5 images se chargent avec la page, et elles sont en
`loading="lazy"` — elles n'arrivent qu'au moment où on descend jusqu'à elles.

Si tu veux alléger, convertis les images en WebP (voir
`assets/img/LISEZ-MOI.txt`), tu diviseras leur poids par trois environ.

---

## Ajouter une compétence

Dans `assets/js/data.js`, liste `const COMPETENCES`. Chaque ligne ressemble à ça :

```javascript
{ nom: "Nom de la techno", etat: "service", ou: "TP n°5 — mairie des Abymes" },
```

**Les trois états possibles**, et rien d'autre :

| `etat` | Voyant | Ce que ça veut dire |
|---|---|---|
| `"service"` | plein | Monté, configuré et testé jusqu'au bout |
| `"rodage"` | demi-rempli | Ça marche, mais pas encore refait seul de mémoire |
| `"repere"` | creux | Étudié, pas encore mis en œuvre |

**Le champ `ou` est obligatoire.** C'est lui qui transforme une affirmation en
preuve. Une compétence sans son « où » ne vaut pas mieux qu'une barre de
pourcentage. C'est exactement ce que le jury E5 cherche.

---

## Les rappels « TODO » : cachés ou visibles

Un texte de `data.js` qui commence par `TODO:` est un rappel : une ligne que tu
n'as pas encore écrite.

Tout en haut de `data.js`, un interrupteur décide de ce qu'en voit le public :

```js
const AFFICHER_RAPPELS = false;
```

- **`false`** (le réglage à garder) : les lignes non remplies **disparaissent**
  du site. Un visiteur ne lit jamais une consigne de brouillon comme
  « remplace cette ligne par… ». Un sujet de veille dont le titre est un
  `TODO:` n'apparaît pas du tout ; une source `TODO:` est simplement retirée.
- **`true`** : elles s'affichent en bandeau orange, pour que tu voies ce qu'il
  reste à écrire. À utiliser seulement en travaillant, en local.

Pour qu'une ligne apparaisse, remplace tout le texte, **y compris le mot
`TODO:`**. Tu peux aussi en créer toi-même : `TODO: reprendre cette phrase`.

---

## Les chiffres clés de l'accueil

La bande de quatre chiffres sous ton nom vient de la liste `CHIFFRES` dans
`data.js`. Trois de ces chiffres **se calculent tout seuls** (pages de
documentation, certifications Cisco, compétences) : quand tu ajoutes un projet
ou une compétence, ils se mettent à jour sans que tu y touches.

Règle : n'écris un chiffre à la main (`valeur: 21`) que si tu peux le prouver
avec une pièce consultable sur le site. Un chiffre à zéro n'est pas affiché.

---

## Changer les couleurs

Ouvre `assets/css/style.css`, **section 01. VARIABLES**, tout en haut.

```css
--brume:    #F2F6F5;   /* fond de page */
--panneau:  #FFFFFF;   /* cartes */
--encre:    #0D2531;   /* texte principal */
--ardoise:  #46616F;   /* texte secondaire */

--fil-1: #0B6E6D;      /* lagon  — le début du Fil */
--fil-2: #3B3A8C;      /* indigo — le milieu */
--fil-3: #8A6210;      /* or     — la fin */
```

Il y a **deux jeux de couleurs** : le mode jour (section 01) et le mode nuit
(section 02). Si tu changes l'un, pense à l'autre.

⚠️ **Vérifie toujours le contraste après.** Toutes les combinaisons actuelles
sont au-dessus de 5:1, ce qui dépasse l'exigence de 4.5:1. Un vert clair sur
fond blanc casserait ça immédiatement. Un outil gratuit : cherche
« WebAIM contrast checker ».

---

## Mettre le site en ligne sur GitHub Pages

Tu n'as pas encore de compte GitHub. Voici le chemin complet.

### 1. Créer le compte

Va sur `github.com`, crée un compte. **Choisis bien ton nom d'utilisateur** : il
apparaîtra dans l'adresse de ton site, et un recruteur le verra.
`style-garraway` est un bon choix. Un pseudo de jeu, non.

### 2. Créer le dépôt

Un dépôt (*repository*) est simplement un dossier hébergé chez GitHub.

| Nom du dépôt | Adresse du site | Remarque |
|---|---|---|
| `style-garraway.github.io` | `https://style-garraway.github.io` | **Recommandé** — adresse courte et propre |
| `portfolio` | `https://style-garraway.github.io/portfolio/` | Fonctionne aussi |

Remplace `style-garraway` par ton vrai nom d'utilisateur.

Coche **Public** — GitHub Pages ne publie pas les dépôts privés en offre gratuite.

### 3. Envoyer les fichiers

Le plus simple, sans aucune ligne de commande :

1. Sur la page du dépôt vide, clique **uploading an existing file**.
2. Ouvre le dossier `portfolio-style-bts` sur ton ordinateur.
3. **Sélectionne tout le contenu** (Ctrl+A) et glisse-le dans la page GitHub. Le site compte 69 fichiers ; le glisser-déposer en accepte 100 à la fois.
4. Vérifie que le dossier `assets` est bien monté avec ses sous-dossiers.
5. En bas, écris un message (« premier envoi ») et clique **Commit changes**.

### 4. Activer la publication

1. Dans le dépôt, onglet **Settings**.
2. Menu de gauche, **Pages**.
3. *Source* : **Deploy from a branch**.
4. *Branch* : `main`, dossier `/ (root)`. Clique **Save**.
5. Attends 1 à 3 minutes. Recharge : l'adresse de ton site s'affiche en haut.

### 5. Vérifier

Ouvre l'adresse **sur ton téléphone**, pas seulement sur ton ordinateur.
C'est là que la majorité des recruteurs la verront.

- [ ] Les pages s'affichent avec les couleurs (si tout est en noir et blanc, le dossier `assets` n'est pas monté correctement).
- [ ] Le menu apparaît sur **toutes** les pages.
- [ ] Les vignettes de l'accueil mènent bien quelque part.
- [ ] La page Projets s'ouvre, le projet aussi, et le bouton « Télécharger la documentation » donne bien le PDF.
- [ ] Le menu burger s'ouvre sur téléphone.
- [ ] Il ne reste aucun bandeau orange **À COMPLÉTER**.

### Pour mettre à jour plus tard

Retourne dans le dépôt, ouvre le fichier à modifier (`assets/js/data.js` en
général), clique sur l'icône crayon ✏️, modifie, puis **Commit changes** en bas.
Le site se met à jour tout seul en une à deux minutes.

### Le fichier `.nojekyll`

Ne le supprime pas. Il est vide, mais sans lui GitHub Pages ignore les dossiers
dont le nom commence par un underscore. C'est une source de bugs classique.

---

## Avant chaque envoi en ligne : la liste de contrôle

- [ ] Aucun bandeau **À COMPLÉTER** sur aucune des 12 pages.
- [ ] Chaque projet contient au moins un chiffre vérifiable.
- [ ] Aucun mot de passe ni vraie adresse IP dans une capture d'écran.
- [ ] Le site s'affiche correctement sur un téléphone.
- [ ] Le CV en PDF est à jour et raconte la même chose que le site.
- [ ] Les certifications affichées correspondent à ce que tu peux prouver.

---

## Choix techniques, si on te pose la question à l'oral

Ce sont des réponses que tu peux défendre. Elles montrent que le site est un
choix d'infrastructure, pas un template téléchargé.

**Pourquoi plusieurs pages plutôt qu'une seule ?**
Chaque projet a sa propre adresse. Je peux envoyer à un recruteur le lien direct
du projet qui l'intéresse, sans qu'il ait à faire défiler tout le site. Chaque
page a aussi son propre titre et sa propre description pour les moteurs de
recherche.

**Pourquoi le menu n'est-il écrit dans aucune page ?**
Il est généré à partir d'une seule liste. Recopier un menu dans douze fichiers,
c'est la garantie qu'un jour l'un des douze sera oublié lors d'une modification.
C'est le même raisonnement qu'un fichier de configuration centralisé.

**Pourquoi pas de framework ?**
Sans étape de compilation, le site fonctionne encore dans cinq ans sans rien
réinstaller. C'est un raisonnement d'administrateur : le moins de dépendances
possible.

**Pourquoi le contenu est-il séparé du code ?**
`data.js` contient les données, `app.js` la logique, `style.css` la présentation.
Modifier le contenu ne peut pas casser l'affichage.

**Pourquoi aucune requête externe ?**
Aucune police Google, aucun outil de mesure, aucun cookie. Le site ne dépend
d'aucun service tiers, ne transmet rien, et se charge à la même vitesse même
avec une connexion médiocre.

**Pourquoi pas de barres de pourcentage sur les compétences ?**
Un pourcentage est invérifiable. Trois états explicites et l'endroit exact où
la compétence a été pratiquée, c'est une information qu'on peut contrôler.

**L'adresse e-mail est-elle protégée ?**
Elle n'apparaît nulle part dans le code source. Elle est découpée en deux
morceaux dans `data.js` et recollée par JavaScript à l'affichage. Un robot
spammeur qui lit le HTML ne trouve rien.

**Et l'accessibilité ?**
HTML sémantique, navigation complète au clavier avec focus visible, contrastes
tous au-dessus de 5:1, `prefers-reduced-motion` respecté, et la couleur ne porte
jamais seule une information : les voyants d'état ont trois formes distinctes et
leur nom écrit à côté.
