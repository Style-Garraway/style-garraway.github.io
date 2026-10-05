/* ==========================================================================
   app.js — LA MÉCANIQUE DU SITE
   --------------------------------------------------------------------------
   ⚠️ TU N'AS NORMALEMENT JAMAIS BESOIN DE TOUCHER À CE FICHIER.
   Pour changer le contenu du site, va dans assets/js/data.js

   COMMENT LE SITE EST ORGANISÉ
   --------------------------------------------------------------------------
   Le site a plusieurs pages. Chaque page HTML est presque vide : elle contient
   seulement ses balises pour Google et des conteneurs vides.

   Ce fichier fait deux choses :
     1. Il fabrique l'en-tête et le pied de page, IDENTIQUES sur toutes les
        pages, à partir de la liste PAGES de data.js. Une seule source : tu
        n'auras jamais un menu différent d'une page à l'autre.
     2. Il regarde quels conteneurs existent sur la page en cours, et remplit
        ceux qu'il trouve. Une page qui n'a pas de conteneur "projets" ne
        déclenche simplement rien.

   Chaque page se déclare avec <body data-page="..."> — la valeur correspond
   à la "cle" dans la liste PAGES.

   SOMMAIRE
     1. Petits outils
     2. En-tête et pied de page (communs à toutes les pages)
     3. Remplissage des contenus
     4. Page d'un projet
     5. Le Fil
     6. Menu burger
     7. Mode Jour / Nuit
     8. Démarrage
   ========================================================================== */

(function () {
  "use strict";

  /* ======================================================================
     1. PETITS OUTILS
     ====================================================================== */

  function el(id) {
    return document.getElementById(id);
  }

  /* Un texte est-il un rappel à compléter ? */
  function estTodo(texte) {
    return typeof texte === "string" && texte.trim().indexOf("TODO:") === 0;
  }

  function texteTodo(texte) {
    return texte.trim().slice(5).trim();
  }

  /* Retire du contenu les lignes pas encore remplies (« TODO: ... »), sauf
     si AFFICHER_RAPPELS vaut true dans data.js. Sans ça, une consigne de
     brouillon serait lisible par tous les visiteurs.
     On travaille sur les listes de data.js elles-mêmes (splice) : les
     fonctions qui construisent les pages n'ont alors rien à savoir. */
  function elaguerRappels() {
    if (typeof AFFICHER_RAPPELS === "undefined" || AFFICHER_RAPPELS !== false) { return; }

    function garder(tableau, test) {
      /* On parcourt à l'envers : retirer un élément ne décale pas ceux qu'il
         reste à examiner. */
      for (var i = tableau.length - 1; i >= 0; i--) {
        if (!test(tableau[i])) { tableau.splice(i, 1); }
      }
    }

    if (typeof COMPETENCES !== "undefined") {
      COMPETENCES.forEach(function (d) {
        garder(d.items, function (it) { return !estTodo(it.nom) && !estTodo(it.ou); });
      });
      /* Un domaine vidé par le tri disparaît aussi. */
      garder(COMPETENCES, function (d) { return d.items.length > 0; });
    }

    if (typeof VEILLE !== "undefined") {
      garder(VEILLE, function (v) { return !estTodo(v.sujet); });
      VEILLE.forEach(function (v) {
        garder(v.sources, function (x) { return !estTodo(x); });
        if (estTodo(v.retiens)) { v.retiens = ""; }
      });
    }

    if (typeof PARCOURS !== "undefined") {
      PARCOURS.forEach(function (e) { if (estTodo(e.detail)) { e.detail = ""; } });
    }
  }

  /* La personne a-t-elle demandé, dans les réglages de son système, qu'on
     réduise les animations ? Si oui, on n'en lance aucune. */
  function mouvementReduit() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Crée un élément HTML.
     On utilise toujours textContent (jamais innerHTML) : si un jour tu écris
     un < ou un & dans data.js, rien ne casse et rien ne peut être injecté. */
  function creer(balise, classe, contenu) {
    var noeud = document.createElement(balise);
    if (classe) { noeud.className = classe; }

    if (contenu !== undefined && contenu !== null) {
      if (estTodo(contenu)) {
        var rappel = document.createElement("span");
        rappel.className = "todo";
        rappel.textContent = texteTodo(contenu);
        noeud.appendChild(rappel);
      } else {
        noeud.textContent = contenu;
      }
    }
    return noeud;
  }

  function remplir(conteneur, elements) {
    if (!conteneur) { return; }
    conteneur.textContent = "";
    elements.forEach(function (e) { conteneur.appendChild(e); });
  }

  /* Recolle l'adresse e-mail à partir de ses deux morceaux.
     Elle n'apparaît jamais entière dans le code source des pages : les robots
     spammeurs qui lisent le HTML ne trouvent rien à récolter. */
  function adresseEmail() {
    return IDENTITE.emailAvantArobase + String.fromCharCode(64) + IDENTITE.emailApresArobase;
  }

  /* La clé de la page en cours, lue sur <body data-page="..."> */
  function pageCourante() {
    return document.body.getAttribute("data-page") || "";
  }

  /* Retrouve une page de la liste PAGES par sa clé. */
  function trouverPage(cle) {
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].cle === cle) { return PAGES[i]; }
    }
    return null;
  }


  /* ======================================================================
     2. EN-TÊTE ET PIED DE PAGE — communs à toutes les pages
     ====================================================================== */

  function construireEntete() {
    var courante = pageCourante();

    var entete = creer("header", "entete");
    var interieur = creer("div", "entete__interieur");

    /* --- La marque, qui ramène toujours à l'accueil --- */
    var marque = creer("a", "marque");
    marque.href = "index.html";
    var initiales = creer("span", "marque__initiales",
                          IDENTITE.prenom.charAt(0) + IDENTITE.nom.charAt(0));
    initiales.setAttribute("aria-hidden", "true");
    marque.appendChild(initiales);
    marque.appendChild(creer("span", "marque__nom", IDENTITE.prenom + " " + IDENTITE.nom));
    /* Sur l'accueil, le logo ne doit pas être un lien vers la page où on est
       déjà : on le signale aux lecteurs d'écran. */
    if (courante === "accueil") { marque.setAttribute("aria-current", "page"); }
    interieur.appendChild(marque);

    /* --- Le bouton burger (visible seulement sur petit écran) --- */
    var burger = creer("button", "burger");
    burger.type = "button";
    burger.id = "burger";
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-controls", "menu-principal");
    var barres = creer("span", "burger__barres");
    barres.setAttribute("aria-hidden", "true");
    burger.appendChild(barres);
    burger.appendChild(creer("span", "burger__texte", "Menu"));
    interieur.appendChild(burger);

    /* --- Le menu, construit à partir de la liste PAGES de data.js --- */
    var nav = creer("nav", "nav");
    nav.id = "menu-principal";
    nav.setAttribute("aria-label", "Navigation principale");

    var liste = creer("ul", "nav__liste");
    PAGES.forEach(function (page) {
      var item = creer("li");
      var lien = creer("a", null, page.menu);
      lien.href = page.fichier;

      /* aria-current="page" : le lecteur d'écran annonce "page actuelle".
         C'est aussi ce qui déclenche le trait coloré sous l'entrée active. */
      if (page.cle === courante) { lien.setAttribute("aria-current", "page"); }

      item.appendChild(lien);
      liste.appendChild(item);
    });
    nav.appendChild(liste);

    /* --- Le bouton Jour / Nuit --- */
    var theme = creer("button", "theme");
    theme.type = "button";
    theme.id = "theme";
    theme.setAttribute("aria-pressed", "false");
    var icone = creer("span", "theme__icone");
    icone.setAttribute("aria-hidden", "true");
    theme.appendChild(icone);
    theme.appendChild(creer("span", "theme__texte", "Mode nuit"));
    nav.appendChild(theme);

    interieur.appendChild(nav);
    entete.appendChild(interieur);

    /* Le lien d'évitement doit être le tout premier élément de la page :
       c'est lui qu'on atteint à la première tabulation. */
    var evitement = creer("a", "evitement", "Aller au contenu principal");
    evitement.href = "#contenu";

    document.body.insertBefore(entete, document.body.firstChild);
    document.body.insertBefore(evitement, document.body.firstChild);
  }

  function construirePiedDePage() {
    var pied = creer("footer", "pied");
    var interieur = creer("div", "pied__interieur");

    interieur.appendChild(creer("p", null,
      IDENTITE.prenom + " " + IDENTITE.nom + " — " + new Date().getFullYear()));

    /* Un rappel de toutes les pages, pour ne jamais être coincé en bas. */
    var plan = creer("nav", "pied__plan");
    plan.setAttribute("aria-label", "Plan du site");
    var liste = creer("ul", "pied__liste");

    var accueil = creer("li");
    var lienAccueil = creer("a", null, "Accueil");
    lienAccueil.href = "index.html";
    accueil.appendChild(lienAccueil);
    liste.appendChild(accueil);

    PAGES.forEach(function (page) {
      var item = creer("li");
      var lien = creer("a", null, page.menu);
      lien.href = page.fichier;
      item.appendChild(lien);
      liste.appendChild(item);
    });

    var ml = creer("li");
    var lienMl = creer("a", null, "Mentions légales");
    lienMl.href = "mentions-legales.html";
    ml.appendChild(lienMl);
    liste.appendChild(ml);

    plan.appendChild(liste);
    interieur.appendChild(plan);

    interieur.appendChild(creer("p", "pied__tech",
      "Site fait à la main en HTML, CSS et JavaScript. Aucune bibliothèque, " +
      "aucun traceur, aucune requête vers un autre domaine."));

    pied.appendChild(interieur);
    document.body.appendChild(pied);
  }

  /* Remplit le titre et le chapô d'une page à partir de la liste PAGES.
     Comme ça, changer un titre se fait dans data.js et nulle part ailleurs. */
  function construireTitrePage() {
    var page = trouverPage(pageCourante());
    if (!page) { return; }

    var titre = el("page-titre");
    if (titre) { titre.textContent = page.titre; }

    var chapo = el("page-chapo");
    if (chapo) {
      if (page.chapo) {
        chapo.textContent = page.chapo;
      } else {
        chapo.remove();   // pas de chapô : on enlève le paragraphe vide
      }
    }
  }


  /* ======================================================================
     3. REMPLISSAGE DES CONTENUS
     ----------------------------------------------------------------------
     Chaque fonction commence par vérifier que son conteneur existe.
     Sur une page qui ne le contient pas, elle ne fait simplement rien.
     ====================================================================== */

  /* --- Accueil : le hero + les cartes vers les autres pages -------------- */
  function construireAccueil() {
    /* Le portrait, s'il est renseigné dans data.js. Il est décoratif au sens
       où le nom est juste en dessous : on lui donne quand même un vrai texte
       alternatif, parce qu'un lecteur d'écran doit savoir ce qu'il y a là. */
    var cadre = el("hero-portrait");
    if (cadre && IDENTITE.photo) {
      var photo = document.createElement("img");
      photo.className = "hero__portrait";
      photo.src = IDENTITE.photo;
      photo.alt = IDENTITE.photoAlt || "";
      /* Pas de loading="lazy" ici : c'est la première image de la page,
         la différer la ferait apparaître en retard sous les yeux du visiteur. */
      photo.decoding = "async";

      /* Un cadre de découpe intermédiaire : c'est lui qui fait le rond et qui
         coupe ce qui dépasse. Sans lui, impossible de zoomer dans la photo
         pour centrer le visage — le CSS n'aurait rien à quoi le comparer. */
      var cercle = creer("div", "hero__cercle");
      cercle.appendChild(photo);
      cadre.appendChild(cercle);
    } else if (cadre) {
      cadre.remove();
    }

    var statut = el("hero-statut");
    if (statut) { statut.textContent = IDENTITE.statut + " · " + IDENTITE.etablissement; }

    var nom = el("hero-nom");
    if (nom) { nom.textContent = IDENTITE.prenom + " " + IDENTITE.nom; }

    var poste = el("hero-poste");
    if (poste) { poste.textContent = IDENTITE.posteVise; }

    var accroche = el("hero-accroche");
    if (accroche) { accroche.textContent = IDENTITE.accroche; }

    var angle = el("hero-angle");
    if (angle) { angle.textContent = IDENTITE.angle; }


    /* Le bouton CV n'est créé QUE si le fichier est renseigné dans data.js.
       Mieux vaut aucun bouton qu'un bouton qui mène à une page d'erreur. */
    var actions = el("hero-actions");
    if (actions && IDENTITE.cvFichier) {
      /* Libellé court ici : sur l'accueil les deux boutons partagent une
         rangée. Le poids du fichier est indiqué sur la page Contact, où le
         bouton est seul et a la place. */
      var lien = creer("a", "bouton bouton--vide", "Télécharger mon CV");
      lien.href = IDENTITE.cvFichier;
      lien.setAttribute("download", "");
      if (IDENTITE.cvPoids) {
        lien.setAttribute("aria-label", "Télécharger mon CV, PDF de " + IDENTITE.cvPoids);
      }
      actions.appendChild(lien);
    }

    /* Les cartes qui mènent aux six autres pages. */
    var sommaire = el("sommaire");
    if (!sommaire) { return; }

    remplir(sommaire, PAGES.map(function (page) {
      var item = creer("li");
      var carte = creer("a", "vignette");
      carte.href = page.fichier;

      carte.appendChild(creer("span", "vignette__titre", page.menu));
      carte.appendChild(creer("span", "vignette__resume", resumeDePage(page)));

      var fleche = creer("span", "vignette__fleche", "→");
      fleche.setAttribute("aria-hidden", "true");
      carte.appendChild(fleche);

      item.appendChild(carte);
      return item;
    }));
  }

  /* --- À propos --------------------------------------------------------- */
  function construireAPropos() {
    var c = el("a-propos-texte");
    if (!c) { return; }
    remplir(c, A_PROPOS.map(function (ligne) { return creer("p", null, ligne); }));
  }

  /* --- Compétences ------------------------------------------------------ */

  /* Le nom lisible de chaque état. Le voyant coloré ne suffit pas : il faut
     toujours le mot écrit, pour les personnes daltoniennes et les lecteurs
     d'écran. */
  var NOMS_ETATS = {
    service: "En service",
    rodage:  "En rodage",
    repere:  "Repéré"
  };

  function construireCompetences() {
    var c = el("domaines");
    if (!c) { return; }

    remplir(c, COMPETENCES.map(function (domaine) {
      var carte = creer("article", "domaine");
      carte.appendChild(creer("h2", "domaine__titre", domaine.domaine));

      var liste = creer("ul", "domaine__liste");

      domaine.items.forEach(function (item) {
        var ligne = creer("li", "competence");

        var haut = creer("div", "competence__ligne");
        haut.appendChild(creer("span", "competence__nom", item.nom));
        ligne.appendChild(haut);

        /* Le « où je l'ai pratiquée » reste : c'est lui qui transforme une
           liste d'outils en preuve, et c'est ce que le jury E5 cherche.
           Les trois états (en service / en rodage / repéré) ont été retirés
           de l'affichage — le champ "etat" subsiste dans data.js, inutilisé,
           au cas où tu voudrais les remettre un jour. */
        ligne.appendChild(creer("span", "competence__ou", item.ou));
        liste.appendChild(ligne);
      });

      carte.appendChild(liste);
      return carte;
    }));
  }

  /* --- Liste des projets ------------------------------------------------- */

  /* Le nom de fichier de la page d'un projet, déduit de son identifiant. */
  function fichierProjet(projet) {
    return "projet-" + projet.id + ".html";
  }

  /* Un court extrait pour la carte : la première phrase du problème. */
  function extrait(texte, longueurMax) {
    if (estTodo(texte)) { return texte; }
    var point = texte.indexOf(". ");
    var court = (point > 40 && point < longueurMax) ? texte.slice(0, point + 1) : texte;
    if (court.length > longueurMax) { court = court.slice(0, longueurMax).trim() + "…"; }
    return court;
  }

  function construireListeProjets() {
    var c = el("projets-liste");
    if (!c) { return; }

    /* Aucun projet renseigné : on affiche un message plutôt qu'une page
       blanche. Un visiteur qui tombe sur du vide croit à un site cassé ;
       une phrase claire lui dit que la section arrive. */
    if (!PROJETS.length) {
      var vide = creer("li", "projets__vide");
      vide.appendChild(creer("p", null,
        "Cette section est en cours de rédaction. Mes projets d'infrastructure " +
        "y seront détaillés selon la même trame : contexte, problème, solution " +
        "technique, outils, résultat mesurable."));
      vide.appendChild(creer("p", null,
        "En attendant, la page Compétences indique pour chaque technologie " +
        "l'endroit exact où je l'ai mise en oeuvre."));

      var lien = creer("a", "bouton bouton--vide", "Voir mes compétences");
      lien.href = "competences.html";
      vide.appendChild(lien);

      remplir(c, [vide]);
      return;
    }

    remplir(c, PROJETS.map(function (projet) {
      var item = creer("li");

      /* La carte entière est un lien : plus facile à viser au doigt sur un
         téléphone qu'un petit bouton dans un coin. */
      var carte = creer("a", "projet");
      carte.href = fichierProjet(projet);

      carte.appendChild(creer("span", "projet__periode", projet.periode));
      carte.appendChild(creer("h2", "projet__titre", projet.titre));
      carte.appendChild(creer("span", "projet__sous-titre", projet.sousTitre));
      carte.appendChild(creer("span", "projet__resume", extrait(projet.probleme, 160)));

      var tags = creer("ul", "projet__tags");
      (projet.tags || []).forEach(function (t) { tags.appendChild(creer("li", "tag", t)); });
      carte.appendChild(tags);

      /* Un projet accompagne de sa documentation : on le dit des la carte,
         c'est l'argument le plus fort et il ne doit pas rester cache dans
         la page de detail. */
      if (projet.document && projet.document.fichier) {
        carte.appendChild(creer("span", "projet__doc",
          "Documentation technique — " + projet.document.pages + " pages"));
      }

      var appel = creer("span", "projet__appel", "Lire le détail");
      var fleche = creer("span", "projet__fleche", " →");
      fleche.setAttribute("aria-hidden", "true");
      appel.appendChild(fleche);
      carte.appendChild(appel);

      item.appendChild(carte);
      return item;
    }));
  }

  /* --- Compteurs calculés ---------------------------------------------------
     Trois fois de suite, un chiffre écrit à la main (27, 39, 43 compétences)
     est devenu faux dès qu'on ajoutait une ligne. Ces valeurs-là se calculent
     donc à partir des données : elles ne peuvent plus être en retard. */
  function compterCompetences() {
    return COMPETENCES.reduce(function (total, d) {
      return total + d.items.filter(function (it) {
        return !estTodo(it.nom) && !estTodo(it.ou);
      }).length;
    }, 0);
  }

  function resumeDePage(page) {
    if (page.cle === "competences" && typeof COMPETENCES !== "undefined" && COMPETENCES.length) {
      return compterCompetences() + " compétences réparties en " +
        COMPETENCES.length + " domaines, chacune sourcée.";
    }
    return page.resume;
  }

  /* --- Bande de chiffres clés (accueil) -------------------------------------- */
  function valeurChiffre(c) {
    if (typeof c.valeur === "number") { return c.valeur; }

    if (c.depuis === "pages") {
      return PROJETS.reduce(function (total, p) {
        return total + ((p.document && p.document.pages) || 0);
      }, 0);
    }
    if (c.depuis === "certifications") {
      var groupe = CERTIFICATIONS.filter(function (g) {
        return g.categorie === "Certifications obtenues";
      })[0];
      return groupe ? groupe.items.length : 0;
    }
    if (c.depuis === "competences") { return compterCompetences(); }
    return 0;
  }

  function construireChiffres() {
    var conteneur = el("chiffres");
    if (!conteneur) { return; }

    var liste = (typeof CHIFFRES !== "undefined" ? CHIFFRES : [])
      .map(function (c) { return { valeur: valeurChiffre(c), libelle: c.libelle }; })
      .filter(function (c) { return c.valeur > 0; });

    /* Rien à montrer : on retire aussi le conteneur, pour ne pas laisser un
       trou dans la page. */
    if (!liste.length) { conteneur.remove(); return; }

    /* Le vrai nombre est écrit dans le texte dès le départ : sans JavaScript
       de comptage, ou avec les animations coupées, on lit la bonne valeur. */
    remplir(conteneur, liste.map(function (c) {
      var item = creer("li", "chiffre");
      item.appendChild(creer("strong", "chiffre__nombre", String(c.valeur)));
      item.appendChild(creer("span", "chiffre__libelle", c.libelle));
      return item;
    }));

    if (!("IntersectionObserver" in window) || mouvementReduit()) { return; }

    /* Le comptage part quand le chiffre entre à l'écran, pas au chargement :
       personne ne verrait une animation jouée dans le vide, plus bas. */
    var guet = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        guet.unobserve(e.target);
        compter(e.target.querySelector(".chiffre__nombre"));
      });
    }, { threshold: 0.6 });

    [].forEach.call(conteneur.children, function (li) { guet.observe(li); });
  }

  /* Fait défiler un nombre de 0 jusqu'à sa valeur, en 0,9 seconde. */
  function compter(noeud) {
    if (!noeud) { return; }
    var fin = parseInt(noeud.textContent, 10);
    var depart = null;

    function pas(t) {
      if (depart === null) { depart = t; }
      var progres = Math.min((t - depart) / 900, 1);
      /* 1 - (1 - p)^3 : rapide au début, puis ralentit en arrivant. */
      /* Par paliers (huit « réponses »), comme les retours d'un ping, et non en
         glissement continu. */
      var palier = progres >= 1 ? 1 : Math.floor(progres * 8) / 8;
      noeud.textContent = Math.round(fin * palier);
      if (progres < 1) { requestAnimationFrame(pas); }
    }
    requestAnimationFrame(pas);
  }

  /* --- Parcours ---------------------------------------------------------- */
  function construireParcours() {
    var c = el("frise");
    if (!c) { return; }

    remplir(c, PARCOURS.map(function (etape) {
      var item = creer("li", "etape-frise");
      item.appendChild(creer("p", "etape-frise__periode", etape.periode));
      item.appendChild(creer("h2", "etape-frise__titre", etape.titre));
      item.appendChild(creer("p", "etape-frise__lieu", etape.lieu));
      if (etape.detail) {
        item.appendChild(creer("p", "etape-frise__detail", etape.detail));
      }
      return item;
    }));
  }

  /* --- Certifications et badges ------------------------------------------
     Chaque certification est une carte : son badge officiel s'il existe,
     sinon une image du certificat, sinon un simple losange. Le lien ouvre
     le PDF officiel. Le visiteur peut donc TOUT vérifier lui-même.
     ---------------------------------------------------------------------- */

  function construireCertifications() {
    var c = el("certifs");
    if (!c) { return; }

    /* Les porte-badges officiels : la vérification par un tiers.
       C'est ce qui fait la différence entre "j'affirme" et "on peut contrôler".
       Chaque bouton n'apparaît que si son adresse est renseignée dans data.js. */
    var verif = el("certifs-verification");
    if (verif) {
      var sources = [];

      if (IDENTITE.credly) {
        sources.push({ url: IDENTITE.credly, nom: "Credly", detail: "les badges Cisco" });
      }
      if (IDENTITE.googleSkills) {
        sources.push({ url: IDENTITE.googleSkills, nom: "Google Skills", detail: "les badges Google" });
      }
      if (IDENTITE.microsoftLearn) {
        sources.push({ url: IDENTITE.microsoftLearn, nom: "Microsoft Learn", detail: "les modules Microsoft" });
      }

      if (!sources.length) {
        verif.remove();
      } else {
        var contenu = [];

        contenu.push(creer("p", "verification__intro",
          "Mes badges sont hébergés chez les organismes qui les délivrent. " +
          "N'importe qui peut les vérifier sans passer par moi."));

        var boutons = creer("div", "verification__boutons");
        sources.forEach(function (s) {
          var lien = creer("a", "bouton bouton--plein", "Vérifier sur " + s.nom);
          lien.href = s.url;
          lien.target = "_blank";
          lien.rel = "noopener noreferrer";
          lien.setAttribute("aria-label",
            "Vérifier " + s.detail + " sur " + s.nom + " (nouvel onglet)");
          boutons.appendChild(lien);
        });
        contenu.push(boutons);

        remplir(verif, contenu);
      }
    }

    /* Le compte affiché en haut de page : il se calcule tout seul, donc il
       ne pourra jamais être en décalage avec la liste réelle. */
    var resume = el("certifs-compte");
    if (resume) {
      var nbBadges = 0, nbPreuves = 0;
      CERTIFICATIONS.forEach(function (g) {
        g.items.forEach(function (i) {
          /* On ne compte QUE les badges délivrés par un organisme.
             Les visuels fabriqués pour le site (officiel: false) sont exclus :
             les faire passer pour des badges officiels serait mentir sur une
             page dont tout l'intérêt est justement d'être vérifiable. */
          if (i.badge && i.officiel !== false) { nbBadges++; }
          if (i.fichier) { nbPreuves++; }
        });
      });

      /* On compte UNIQUEMENT le premier groupe comme "certifications".
         Annoncer un total qui mélangerait certifications et modules de
         formation serait trompeur — c'est exactement ce qu'un recruteur
         te reprocherait s'il creusait. Le premier groupe de la liste
         CERTIFICATIONS doit donc toujours être celui des vraies
         certifications obtenues. */
      var vraies = CERTIFICATIONS.length ? CERTIFICATIONS[0] : null;

      var compteurs = [];
      if (vraies) {
        compteurs.push(compteur(vraies.items.length, vraies.categorie.toLowerCase()));
      }
      compteurs.push(compteur(nbBadges, "badges officiels"));
      compteurs.push(compteur(nbPreuves, "documents téléchargeables"));

      remplir(resume, compteurs);
    }

    remplir(c, CERTIFICATIONS.map(function (groupe) {
      var bloc = creer("section", "groupe");

      bloc.appendChild(creer("h2", "groupe__titre", groupe.categorie));
      if (groupe.intro) { bloc.appendChild(creer("p", "groupe__intro", groupe.intro)); }

      var liste = creer("ul", "certifs__liste");
      groupe.items.forEach(function (item) { liste.appendChild(carteCertification(item)); });
      bloc.appendChild(liste);

      return bloc;
    }));
  }

  function compteur(nombre, libelle) {
    var bloc = creer("li", "compteur");
    bloc.appendChild(creer("span", "compteur__nombre", String(nombre)));
    bloc.appendChild(creer("span", "compteur__libelle", libelle));
    return bloc;
  }

  function carteCertification(item) {
    var li = creer("li");
    var carte = creer("article", "certif");

    /* --- Le visuel : badge carré, sinon aperçu du certificat, sinon rien --- */
    var visuel = creer("div", "certif__visuel");

    if (item.badge) {
      /* Le texte alternatif doit dire la vérité : "badge officiel" seulement
         quand c'en est un, sinon une personne aveugle croirait à une preuve
         là où il n'y a qu'une illustration. */
      var legende = (item.officiel === false)
        ? "Illustration : " + item.nom
        : "Badge officiel : " + item.nom;
      visuel.appendChild(imageCertif(item.badge, legende, "certif__badge"));
    } else if (item.apercu) {
      visuel.appendChild(imageCertif(item.apercu, "Certificat : " + item.nom, "certif__apercu"));
    } else {
      /* Aucun visuel disponible : un losange, en écho au Fil. */
      var marque = creer("span", "certif__marque", "◆");
      marque.setAttribute("aria-hidden", "true");
      visuel.appendChild(marque);
    }
    carte.appendChild(visuel);

    /* --- Le texte --- */
    var texte = creer("div", "certif__texte");
    texte.appendChild(creer("h3", "certif__nom", item.nom));
    texte.appendChild(creer("p", "certif__organisme", item.organisme + " · " + item.date));
    if (item.couvre) { texte.appendChild(creer("p", "certif__couvre", item.couvre)); }

    /* --- Le lien de preuve --- */
    if (item.fichier) {
      var lien = creer("a", "certif__preuve");
      lien.href = item.fichier;
      lien.target = "_blank";
      lien.rel = "noopener";
      lien.textContent = "Voir le certificat" + (item.poids ? " (PDF, " + item.poids + ")" : " (PDF)");
      /* Le libellé seul ne dirait pas de quel certificat il s'agit : on le
         précise pour les lecteurs d'écran, qui listent souvent les liens. */
      lien.setAttribute("aria-label", "Voir le certificat de " + item.nom + ", fichier PDF");
      texte.appendChild(lien);
    }

    /* --- La vérification chez l'organisme ---
       Certains organismes ne délivrent aucun fichier : la preuve est une page
       publique chez eux. C'est plus fort qu'un PDF, qui pourrait être bricolé. */
    if (item.verif) {
      var verif = creer("a", "certif__preuve");
      verif.href = item.verif;
      verif.target = "_blank";
      verif.rel = "noopener noreferrer";
      verif.textContent = "Vérifier chez " + item.organisme.replace(/\s*\(.*\)\s*$/, "");
      verif.setAttribute("aria-label",
        "Vérifier le badge « " + item.nom + " » sur le site de l'organisme (nouvel onglet)");
      texte.appendChild(verif);
    }

    carte.appendChild(texte);
    li.appendChild(carte);
    return li;
  }

  function imageCertif(source, description, classe) {
    var img = document.createElement("img");
    img.className = classe;
    img.src = source;
    img.alt = description;
    /* loading="lazy" : l'image n'est téléchargée qu'au moment où on arrive
       dessus. Sans ça, la page ferait charger 500 Ko d'un coup. */
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  /* --- Veille ------------------------------------------------------------ */
  function construireVeille() {
    var c = el("veille-liste");
    if (!c) { return; }

    remplir(c, VEILLE.map(function (sujet) {
      var carte = creer("article", "sujet");
      carte.appendChild(creer("h2", "sujet__titre", sujet.sujet));

      /* Un bloc sans contenu n'est pas affiché : un titre « Mes sources »
         suivi de rien ferait plus mauvais effet qu'une carte plus courte. */
      if (sujet.sources.length) {
        carte.appendChild(creer("span", "sujet__label", "Mes sources"));
        var sources = creer("ul", "sujet__sources");
        sujet.sources.forEach(function (s) { sources.appendChild(creer("li", null, s)); });
        carte.appendChild(sources);
      }

      if (sujet.retiens) {
        carte.appendChild(creer("span", "sujet__label", "Ce que j'en retire"));
        carte.appendChild(creer("p", "sujet__retiens", sujet.retiens));
      }
      return carte;
    }));
  }

  /* --- Contact ------------------------------------------------------------
     L'adresse e-mail est stockée en morceaux dans data.js et recollée ici. Un
     robot collecteur qui lit le code source de la page ne trouve aucune
     adresse complète.
     ------------------------------------------------------------------------ */

  /* Petites icônes dessinées à la main : aucun fichier, aucune police
     d'icônes à charger. Elles sont décoratives, d'où aria-hidden. */
  function icone(chemin) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "direct__icone");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.7");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", chemin);
    svg.appendChild(p);
    return svg;
  }

  var ICONE_MAIL = "M3 6h18v12H3zM3 6l9 7 9-7";

  /* Copie un texte dans le presse-papiers, puis appelle fini(true|false).
     Deux méthodes : la moderne, qui exige une page « sécurisée » (https ou
     localhost), puis l'ancienne, qui marche partout, y compris quand on ouvre
     index.html directement depuis le disque. */
  function copierTexte(texte, fini) {
    function repli() {
      /* On garde en mémoire l'élément qui avait le focus : sans ça, une
         personne qui navigue au clavier serait renvoyée en haut de la page. */
      var actif = document.activeElement;
      var zone = document.createElement("textarea");
      zone.value = texte;
      zone.setAttribute("readonly", "");
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();

      var reussi = false;
      try { reussi = document.execCommand("copy"); } catch (e) { reussi = false; }

      document.body.removeChild(zone);
      if (actif && actif.focus) { actif.focus(); }
      fini(reussi);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texte).then(function () { fini(true); }, repli);
    } else {
      repli();
    }
  }

  /* Le bouton « Copier » d'une ligne de coordonnées.
     Pourquoi : un lien mailto: n'ouvre rien chez quelqu'un qui écrit depuis
     Gmail dans son navigateur. Avec ce bouton, il colle l'adresse où il veut.
     copie = { texte: fonction qui renvoie le texte, aria: libellé pour les
     lecteurs d'écran, ok: message de confirmation }. */
  function boutonCopier(copie, zoneEtat) {
    var bouton = creer("button", "copier", "Copier");
    bouton.type = "button";
    bouton.setAttribute("aria-label", copie.aria);
    var minuteur = null;

    bouton.addEventListener("click", function () {
      copierTexte(copie.texte(), function (reussi) {
        if (zoneEtat) {
          zoneEtat.textContent = reussi
            ? copie.ok
            : "La copie n'a pas fonctionné : sélectionnez le texte à la main.";
        }
        if (!reussi) { return; }

        bouton.textContent = "Copié";
        bouton.classList.add("copier--fait");
        clearTimeout(minuteur);
        minuteur = setTimeout(function () {
          bouton.textContent = "Copier";
          bouton.classList.remove("copier--fait");
          if (zoneEtat) { zoneEtat.textContent = ""; }
        }, 2500);
      });
    });
    return bouton;
  }

  /* Une ligne de la carte « Me joindre directement » : icône, intitulé,
     valeur (un lien), et le bouton Copier si demandé. */
  function ligneDirecte(quoi, valeur, url, cheminIcone, copie, zoneEtat) {
    var item = creer("li", "direct__ligne");
    item.appendChild(icone(cheminIcone));

    var texte = creer("div", "direct__texte");
    texte.appendChild(creer("span", "direct__quoi", quoi));

    var lien = creer("a", "direct__valeur", valeur);
    lien.href = url;
    texte.appendChild(lien);
    item.appendChild(texte);

    if (copie) { item.appendChild(boutonCopier(copie, zoneEtat)); }
    return item;
  }

  function construireContact() {
    /* --- Me joindre directement : l'adresse e-mail, avec son bouton Copier.
           Ni téléphone ni lieu : le site n'en affiche aucun. Aucune promesse
           de délai non plus : je ne peux pas m'engager à ta place sur une
           durée de réponse. --- */
    var direct = el("contact-direct");
    if (direct) {
      remplir(direct, [
        ligneDirecte("E-mail", adresseEmail(), "mailto:" + adresseEmail(), ICONE_MAIL, {
          texte: adresseEmail,
          aria: "Copier l'adresse e-mail",
          ok: "Adresse e-mail copiée."
        }, el("direct-etat"))
      ]);
    }

    /* --- Le CV, juste sous les coordonnées : c'est la deuxième chose qu'un
           recruteur cherche après avoir vu comment te joindre. --- */
    var blocCv = el("contact-cv");
    if (blocCv) {
      if (IDENTITE.cvFichier) {
        var lienCv = creer("a", "bouton bouton--plein",
          "Télécharger mon CV" + (IDENTITE.cvPoids ? " (PDF, " + IDENTITE.cvPoids + ")" : " (PDF)"));
        lienCv.href = IDENTITE.cvFichier;
        lienCv.setAttribute("download", "");
        remplir(blocCv, [lienCv]);
      } else {
        blocCv.remove();
      }
    }

    var c = el("contact-liens");
    if (!c) { return; }

    /* L'e-mail n'est PAS répété ici : il a déjà sa grande carte plus haut.
       Cette liste ne contient que les profils. */
    var liens = [];

    if (IDENTITE.linkedin) {
      liens.push(lienContact("LinkedIn", "Mon profil professionnel", IDENTITE.linkedin));
    }
    if (IDENTITE.credly) {
      liens.push(lienContact("Credly", "Mes badges Cisco vérifiables", IDENTITE.credly));
    }
    if (IDENTITE.googleSkills) {
      liens.push(lienContact("Google Skills", "Mes badges Google vérifiables", IDENTITE.googleSkills));
    }
    if (IDENTITE.microsoftLearn) {
      liens.push(lienContact("Microsoft Learn", "Mes modules vérifiables", IDENTITE.microsoftLearn));
    }
    if (IDENTITE.github) {
      liens.push(lienContact("GitHub", "Mes dépôts", IDENTITE.github));
    }

    remplir(c, liens);
  }

  /* --- Le formulaire de contact -------------------------------------------
     Il n'envoie rien lui-même et n'enregistre rien. Au clic, il assemble un
     lien de rédaction Gmail (destinataire, objet et texte déjà remplis) et
     l'ouvre dans un NOUVEL ONGLET. C'est le visiteur qui, dans Gmail, relit
     puis clique sur « Envoyer » : rien ne part avant.

     Limite assumée : ça ne sert qu'aux personnes qui ont Gmail. Les autres
     (Outlook, Yahoo, messagerie d'entreprise...) trouvent juste en dessous
     deux autres options : leur logiciel de courrier, ou copier le message.
     Le site lui-même ne charge rien depuis Gmail : le lien n'est suivi que si
     le visiteur clique.
     ------------------------------------------------------------------------ */

  function preparerFormulaire() {
    var form = el("formulaire");
    if (!form) { return; }

    var etat = el("formulaire-etat");

    form.addEventListener("submit", function (evt) {
      /* Le navigateur a déjà vérifié les champs obligatoires : cet événement
         ne se déclenche que si le formulaire est valide. */
      evt.preventDefault();

      var nom      = form.elements.nom.value.trim();
      var courriel = form.elements.email.value.trim();
      var orga     = form.elements.organisation.value.trim();
      var message  = form.elements.message.value.trim();

      var sujet = "Contact portfolio — " + nom + (orga ? " (" + orga + ")" : "");

      /* La signature est ajoutée au message : sans elle, impossible de savoir
         à qui répondre si l'expéditeur écrit depuis une autre adresse que
         celle qu'il a saisie ici. */
      var corps = message + "\n\n—\n" + nom
                + (orga ? "\n" + orga : "")
                + "\n" + courriel;

      var adresse = adresseEmail();

      var lienGmail = "https://mail.google.com/mail/?view=cm&fs=1"
                    + "&to=" + encodeURIComponent(adresse)
                    + "&su=" + encodeURIComponent(sujet)
                    + "&body=" + encodeURIComponent(corps);

      var lienCourrier = "mailto:" + adresse
                       + "?subject=" + encodeURIComponent(sujet)
                       + "&body=" + encodeURIComponent(corps);

      /* On ouvre Gmail tout de suite, pendant le clic : c'est ce qui évite que
         le navigateur bloque la fenêtre. S'il la bloque quand même, window.open
         renvoie null et on affiche un bouton pour l'ouvrir à la main.
         onglet.opener = null : la page Gmail ne garde aucun lien avec la
         nôtre (précaution de sécurité habituelle pour un lien externe). */
      var onglet = window.open(lienGmail, "_blank");
      if (onglet) { onglet.opener = null; }

      if (!etat) { return; }
      etat.className = "formulaire__etat formulaire__etat--ok";
      etat.textContent = "";

      /* Le retour « console » : chaque ligne porte son état en toutes lettres
         entre crochets, la couleur n'est qu'un renfort. */
      var console_ = creer("div", "console");
      [
        ["message préparé (" + message.length + " caractères)", "OK", "ok"],
        [onglet ? "ouverture de Gmail dans un nouvel onglet" : "ouverture de Gmail",
         onglet ? "OK" : "ATTENTION", onglet ? "ok" : "warn"]
      ].forEach(function (l) {
        var ligne = creer("div", "console__ligne");
        ligne.appendChild(creer("span", "console__invite", "> "));
        ligne.appendChild(document.createTextNode(l[0] + " "));
        ligne.appendChild(creer("span", "console__etat console__etat--" + l[2], "[" + l[1] + "]"));
        console_.appendChild(ligne);
      });
      etat.appendChild(console_);

      etat.appendChild(document.createTextNode(onglet
        ? "Gmail s'ouvre dans un nouvel onglet avec votre message déjà rédigé : "
          + "il vous reste à l'envoyer. Vous n'utilisez pas Gmail ? Choisissez "
          + "une autre option :"
        : "Votre navigateur a bloqué l'ouverture de Gmail. Cliquez sur le bouton "
          + "ci-dessous, ou choisissez une autre option :"));

      var actions = creer("div", "formulaire__actions");

      if (!onglet) {
        var gmail = creer("a", "bouton bouton--plein", "Ouvrir Gmail");
        gmail.href = lienGmail;
        gmail.target = "_blank";
        gmail.rel = "noopener noreferrer";
        actions.appendChild(gmail);
      }

      /* Pour les gens qui ont un logiciel de courrier configuré. */
      var courrier = creer("a", "copier", "Ouvrir dans ma messagerie");
      courrier.href = lienCourrier;
      actions.appendChild(courrier);

      /* Le filet de sécurité de tout le monde : le message tout prêt, à coller
         dans n'importe quelle messagerie. */
      var texteComplet = "À : " + adresse + "\nObjet : " + sujet + "\n\n" + corps;
      var copie = creer("button", "copier", "Copier le message");
      copie.type = "button";
      copie.addEventListener("click", function () {
        copierTexte(texteComplet, function (reussi) {
          copie.textContent = reussi ? "Message copié" : "Copie impossible";
        });
      });
      actions.appendChild(copie);

      etat.appendChild(actions);
    });
  }

  function lienContact(quoi, valeur, url) {
    var item = creer("li");
    var lien = creer("a");
    lien.href = url;

    if (url.indexOf("http") === 0) {
      lien.target = "_blank";
      /* rel="noopener" : sans lui, la page ouverte pourrait manipuler la
         tienne. C'est une précaution de sécurité de base. */
      lien.rel = "noopener noreferrer";
      /* Sans cette précision, une personne qui utilise un lecteur d'écran ne
         sait pas que le lien quitte la page. */
      lien.setAttribute("aria-label", quoi + " — " + valeur + " (s'ouvre dans un nouvel onglet)");
    }

    var bloc = creer("span");
    bloc.appendChild(creer("span", "contact__quoi", quoi));
    bloc.appendChild(creer("span", "contact__valeur", valeur));
    lien.appendChild(bloc);

    item.appendChild(lien);
    return item;
  }


  /* ======================================================================
     4. PAGE D'UN PROJET
     ----------------------------------------------------------------------
     La page indique de quel projet il s'agit avec :
         <body data-page="projets" data-projet="share">
     Tout le reste est lu dans data.js. Deux pages de projet ne diffèrent
     donc que par cette valeur et par leurs balises pour Google.
     ====================================================================== */

  function construirePageProjet() {
    var conteneur = el("projet-detail");
    if (!conteneur) { return; }

    var id = document.body.getAttribute("data-projet");
    var projet = null, position = -1;

    for (var i = 0; i < PROJETS.length; i++) {
      if (PROJETS[i].id === id) { projet = PROJETS[i]; position = i; break; }
    }

    /* Identifiant introuvable : on le dit au lieu d'afficher une page vide. */
    if (!projet) {
      remplir(conteneur, [creer("p", "todo",
        "Aucun projet ne porte l'identifiant \"" + id + "\" dans data.js. " +
        "Vérifie l'attribut data-projet de cette page.")]);
      return;
    }

    /* Le titre de la page vient de data.js : une seule source. */
    var titre = el("page-titre");
    if (titre) { titre.textContent = projet.titre; }

    var chapo = el("page-chapo");
    if (chapo) { chapo.textContent = projet.sousTitre + " · " + projet.periode; }

    var contenu = [];
    var lateral = [];   /* la fiche a droite : outils, referentiel, documentation */

    /* L'illustration du projet, si elle existe : elle ouvre la page. */
    if (projet.illustration && projet.illustration.fichier) {
      var fig = creer("figure", "projet-figure");
      var img = document.createElement("img");
      img.src = projet.illustration.fichier;
      img.alt = projet.illustration.alt || "";
      img.width = 725; img.height = 525;
      fig.appendChild(img);
      if (projet.illustration.legende) { fig.appendChild(creer("figcaption", null, projet.illustration.legende)); }
      contenu.push(fig);
    }

    /* Les trois premières étapes du récit : du texte simple. */
    [
      { cle: "contexte", label: "Contexte" },
      { cle: "probleme", label: "Problème" },
      { cle: "solution", label: "Solution technique" }
    ].forEach(function (etape) {
      var bloc = creer("section", "etape");
      bloc.appendChild(creer("h2", "etape__label", etape.label));
      bloc.appendChild(creer("p", null, projet[etape.cle]));
      contenu.push(bloc);
    });

    /* Les outils. */
    var blocOutils = creer("section", "etape");
    blocOutils.appendChild(creer("h2", "etape__label", "Outils utilisés"));
    var listeOutils = creer("ul", "etape__outils");
    (projet.outils || []).forEach(function (o) { listeOutils.appendChild(creer("li", "tag", o)); });
    blocOutils.appendChild(listeOutils);
    lateral.push(blocOutils);

    /* Les résultats : la partie que le jury lit en premier. */
    var blocResultats = creer("section", "etape");
    blocResultats.appendChild(creer("h2", "etape__label", "Résultat mesurable"));
    var listeResultats = creer("ul", "resultats");
    (projet.resultats || []).forEach(function (r) { listeResultats.appendChild(creer("li", "resultat", r)); });
    blocResultats.appendChild(listeResultats);
    contenu.push(blocResultats);

    /* Ce que j'en ai appris. */
    var blocAppris = creer("section", "etape");
    blocAppris.appendChild(creer("h2", "etape__label", "Ce que j'en ai appris"));
    blocAppris.appendChild(creer("p", null, projet.appris));
    contenu.push(blocAppris);

    /* Les compétences du référentiel que ce projet mobilise : c'est ce que
       le jury E5 vient chercher, il doit le trouver sans deviner. */
    if (projet.referentiel && projet.referentiel.length) {
      var blocRef = creer("section", "etape");
      blocRef.appendChild(creer("h2", "etape__label", "Compétences du référentiel mobilisées"));
      var listeRef = creer("ul", "referentiel");
      projet.referentiel.forEach(function (r) { listeRef.appendChild(creer("li", null, r)); });
      blocRef.appendChild(listeRef);
      lateral.push(blocRef);
    }

    /* La documentation technique, si le projet en a une.
       C'est la seule piece qui permet a un recruteur de verifier tout ce
       qui precede au lieu de me croire sur parole : elle a donc son propre
       bloc, et un bouton plein. */
    if (projet.document && projet.document.fichier) {
      var blocDoc = creer("section", "etape etape--document");
      blocDoc.appendChild(creer("h2", "etape__label", "La documentation"));

      if (projet.document.resume) {
        blocDoc.appendChild(creer("p", null, projet.document.resume));
      }

      var detail = [];
      if (projet.document.pages) { detail.push(projet.document.pages + " pages"); }
      if (projet.document.poids) { detail.push("PDF, " + projet.document.poids); }

      var lienDoc = creer("a", "bouton bouton--plein",
        "Ouvrir la documentation" + (detail.length ? " (" + detail.join(", ") + ")" : ""));
      lienDoc.href = projet.document.fichier;
      /* S'ouvre dans un nouvel onglet (lecteur PDF du navigateur) au lieu de
         se télécharger d'office ; le lecteur propose lui-même le téléchargement. */
      lienDoc.target = "_blank";
      lienDoc.rel = "noopener";
      blocDoc.appendChild(lienDoc);

      if (projet.enonce && projet.enonce.fichier) {
        var lienEnonce = creer("a", "bouton bouton--vide",
          "Voir l'énoncé du TP (PDF" + (projet.enonce.poids ? ", " + projet.enonce.poids : "") + ")");
        lienEnonce.href = projet.enonce.fichier;
        lienEnonce.target = "_blank";
        lienEnonce.rel = "noopener";
        blocDoc.appendChild(lienEnonce);
      }

      lateral.push(blocDoc);
    }

    /* Deux colonnes sur grand ecran : le recit a gauche, la « fiche » du
       projet (outils, competences, documentation) a droite, qui reste a
       l'ecran pendant la lecture. Sur telephone : une seule colonne, le
       recit d'abord, la fiche ensuite. */
    var figures = contenu.filter(function (e) { return e.classList.contains("projet-figure"); });
    var recit = creer("div", "projet-texte");
    contenu.forEach(function (e) { if (figures.indexOf(e) === -1) { recit.appendChild(e); } });
    var fiche = creer("aside", "projet-lateral");
    fiche.setAttribute("aria-label", "Fiche du projet");
    lateral.forEach(function (e) { fiche.appendChild(e); });
    var corps = creer("div", "projet-corps");
    corps.appendChild(recit);
    corps.appendChild(fiche);
    remplir(conteneur, figures.concat([corps]));

    /* --- Aller au projet précédent ou suivant, sans repasser par la liste. */
    var pieds = el("projet-navigation");
    if (!pieds) { return; }

    var elements = [];

    var precedent = PROJETS[position - 1];
    var suivant = PROJETS[position + 1];

    if (precedent) {
      elements.push(lienProjetVoisin(precedent, "Projet précédent", "←"));
    }

    var retour = creer("a", "bouton bouton--vide", "Tous les projets");
    retour.href = "projets.html";
    elements.push(retour);

    if (suivant) {
      elements.push(lienProjetVoisin(suivant, "Projet suivant", "→"));
    }

    remplir(pieds, elements);
  }

  function lienProjetVoisin(projet, label, fleche) {
    var lien = creer("a", "voisin");
    lien.href = fichierProjet(projet);
    lien.setAttribute("aria-label", label + " : " + projet.titre);

    var haut = creer("span", "voisin__label", fleche + " " + label);
    haut.setAttribute("aria-hidden", "true");
    lien.appendChild(haut);

    var titre = creer("span", "voisin__titre", projet.titre);
    titre.setAttribute("aria-hidden", "true");
    lien.appendChild(titre);

    return lien;
  }


  /* ======================================================================
     5. LE FIL
     ----------------------------------------------------------------------
     La ligne verticale s'allume au fur et à mesure du défilement.
     Sa hauteur est pilotée par la variable CSS --progression.
     ====================================================================== */

  var page, sections = [], enAttente = false;

  /* Position d'un élément par rapport au HAUT DU DOCUMENT.
     Attention : on ne peut pas utiliser offsetTop ici. Comme .page est en
     position:relative, offsetTop donnerait une distance mesurée depuis .page
     et non depuis le haut de la page — le repère serait décalé. */
  function hautAbsolu(element) {
    return element.getBoundingClientRect().top + window.pageYOffset;
  }

  function preparerFil() {
    page = document.querySelector(".page");
    if (!page) { return; }

    sections = Array.prototype.slice.call(
      document.querySelectorAll("main > section[id]")
    );

    window.addEventListener("scroll", demanderMiseAJour, { passive: true });
    window.addEventListener("resize", demanderMiseAJour);
    mettreAJourFil();
  }

  function demanderMiseAJour() {
    if (enAttente) { return; }
    enAttente = true;
    window.requestAnimationFrame(function () {
      enAttente = false;
      mettreAJourFil();
    });
  }

  function mettreAJourFil() {
    if (!page) { return; }

    var hautDePage = hautAbsolu(page);
    var hauteur = page.offsetHeight;
    if (hauteur <= 0) { return; }

    /* On mesure jusqu'au milieu bas de l'écran plutôt qu'à son sommet :
       le fil s'allume au rythme de la lecture, pas du bord de l'écran. */
    var parcouru = window.pageYOffset + (window.innerHeight * 0.6) - hautDePage;
    var pourcent = (parcouru / hauteur) * 100;

    if (pourcent < 0) { pourcent = 0; }
    if (pourcent > 100) { pourcent = 100; }

    page.style.setProperty("--progression", pourcent.toFixed(2) + "%");

    /* Le noeud de la section en cours de lecture s'allume. */
    if (!sections.length) { return; }

    var reference = window.pageYOffset + 140;
    var active = sections[0];

    sections.forEach(function (section) {
      if (hautAbsolu(section) <= reference) { active = section; }
    });

    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 4) {
      active = sections[sections.length - 1];
    }

    sections.forEach(function (section) {
      section.classList.toggle("est-active", section === active);
    });
  }


  /* ======================================================================
     6. MENU BURGER
     ====================================================================== */

  function preparerMenu() {
    var burger = el("burger");
    var menu = el("menu-principal");
    if (!burger || !menu) { return; }

    function ouvrir(oui) {
      menu.classList.toggle("est-ouvert", oui);
      burger.setAttribute("aria-expanded", oui ? "true" : "false");
    }

    burger.addEventListener("click", function () {
      ouvrir(burger.getAttribute("aria-expanded") !== "true");
    });

    /* Échap referme le menu et remet le focus sur le bouton. */
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" && menu.classList.contains("est-ouvert")) {
        ouvrir(false);
        burger.focus();
      }
    });

    /* Un clic en dehors du menu ouvert le referme. */
    document.addEventListener("click", function (evt) {
      if (!menu.classList.contains("est-ouvert")) { return; }
      if (menu.contains(evt.target) || burger.contains(evt.target)) { return; }
      ouvrir(false);
    });

    /* Si l'écran s'élargit, le menu redevient une barre : on nettoie l'état
       "ouvert" pour ne pas laisser le burger marqué comme déplié. */
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) { ouvrir(false); }
    });
  }


  /* ======================================================================
     7. MODE JOUR / NUIT
     ----------------------------------------------------------------------
     Trois états possibles :
       - aucun réglage      → on suit le réglage du système du visiteur
       - data-theme="jour"  → clair, quoi qu'en dise le système
       - data-theme="nuit"  → sombre, quoi qu'en dise le système
     Le choix est retenu dans le navigateur du visiteur (localStorage),
     rien n'est envoyé nulle part.
     ====================================================================== */

  var CLE_THEME = "sg-theme";

  function themeSysteme() {
    return window.matchMedia &&
           window.matchMedia("(prefers-color-scheme: dark)").matches ? "nuit" : "jour";
  }

  function themeActuel() {
    return document.documentElement.getAttribute("data-theme") || themeSysteme();
  }

  function etiqueterBouton(estNuit) {
    var bouton = el("theme");
    if (!bouton) { return; }
    bouton.setAttribute("aria-pressed", estNuit ? "true" : "false");
    var texte = bouton.querySelector(".theme__texte");
    if (texte) { texte.textContent = estNuit ? "Mode jour" : "Mode nuit"; }
  }

  function appliquerTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    etiqueterBouton(theme === "nuit");
  }

  function preparerTheme() {
    var memorise = null;
    try { memorise = window.localStorage.getItem(CLE_THEME); } catch (e) { /* navigation privée */ }

    if (memorise === "jour" || memorise === "nuit") {
      appliquerTheme(memorise);
    } else {
      /* Aucun choix mémorisé : on n'écrit rien, le CSS suit le système. */
      etiqueterBouton(themeSysteme() === "nuit");
    }

    var bouton = el("theme");
    if (!bouton) { return; }

    bouton.addEventListener("click", function () {
      var nouveau = (themeActuel() === "nuit") ? "jour" : "nuit";
      appliquerTheme(nouveau);
      try { window.localStorage.setItem(CLE_THEME, nouveau); } catch (e) { /* ignoré */ }
    });
  }


  /* ======================================================================
     8. DÉMARRAGE
     ====================================================================== */

  /* ======================================================================
     LE RÉSEAU ANIMÉ ET LE TERMINAL (accueil)
     ----------------------------------------------------------------------
     Deux décors qui disent « infrastructure » sans un mot : des nœuds reliés
     entre eux où circulent des paquets, et des commandes qui se tapent.
     Règles communes : rien ne bouge si la personne a demandé de réduire les
     animations (on dessine alors une image fixe), tout s'arrête quand
     l'onglet est caché ou l'élément hors écran, et rien ne gêne la lecture.
     ====================================================================== */

  function preparerReseau() {
    var canvas = el("hero-reseau");
    if (!canvas || !canvas.getContext) { return; }
    var ctx = canvas.getContext("2d");

    var fixe = mouvementReduit();
    var noeuds = [], liens = [], paquets = [];
    var L = 0, H = 0, echelle = 1, visible = true, enCours = false, dernier = 0;

    /* Générateur pseudo-aléatoire à graine : le dessin du réseau est le même
       à chaque visite, il ne « saute » pas au redimensionnement. */
    function graine(a) {
      return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }

    function couleurs() {
      var cs = getComputedStyle(document.documentElement);
      return {
        a: cs.getPropertyValue("--fil-1").trim() || "#3FD0C4",
        b: cs.getPropertyValue("--fil-2").trim() || "#8C8AF0",
        c: cs.getPropertyValue("--fil-3").trim() || "#F2B441"
      };
    }

    function construire() {
      var rect = canvas.getBoundingClientRect();
      L = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      echelle = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = L * echelle;
      canvas.height = H * echelle;
      ctx.setTransform(echelle, 0, 0, echelle, 0, 0);

      var alea = graine(7);
      var n = Math.max(10, Math.min(36, Math.round(L * H / 26000)));
      noeuds = [];
      for (var i = 0; i < n; i++) {
        noeuds.push({
          x: 20 + alea() * (L - 40),
          y: 20 + alea() * (H - 40),
          /* Un nœud sur cinq est un « commutateur » : plus gros, en losange,
             comme les nœuds du Fil. */
          gros: i % 5 === 0
        });
      }

      /* Chaque nœud est relié à ses deux voisins les plus proches. */
      liens = [];
      var vus = {};
      noeuds.forEach(function (p, i) {
        noeuds.map(function (q, j) { return { j: j, d: Math.hypot(p.x - q.x, p.y - q.y) }; })
          .filter(function (o) { return o.j !== i; })
          .sort(function (u, v) { return u.d - v.d; })
          .slice(0, 2)
          .forEach(function (o) {
            var cle = Math.min(i, o.j) + "-" + Math.max(i, o.j);
            if (!vus[cle]) { vus[cle] = true; liens.push({ de: i, vers: o.j, long: o.d }); }
          });
      });
      paquets = [];
    }

    function nouveauPaquet() {
      if (!liens.length) { return; }
      var lien = liens[Math.floor(Math.random() * liens.length)];
      paquets.push({ lien: lien, sens: Math.random() < 0.5 ? 1 : -1, t: 0,
                     vitesse: 60 + Math.random() * 70, sauts: 0 });
    }

    function dessiner(c) {
      ctx.clearRect(0, 0, L, H);
      ctx.lineWidth = 1;
      liens.forEach(function (l) {
        var p = noeuds[l.de], q = noeuds[l.vers];
        ctx.strokeStyle = c.a; ctx.globalAlpha = 0.16;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      });
      noeuds.forEach(function (p) {
        ctx.globalAlpha = p.gros ? 0.7 : 0.4;
        ctx.strokeStyle = p.gros ? c.b : c.a;
        ctx.fillStyle = p.gros ? c.b : c.a;
        if (p.gros) {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.PI / 4);
          ctx.strokeRect(-5, -5, 10, 10); ctx.restore();
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, 6.2832); ctx.fill();
        }
      });
      paquets.forEach(function (k) {
        var a = noeuds[k.sens > 0 ? k.lien.de : k.lien.vers];
        var b = noeuds[k.sens > 0 ? k.lien.vers : k.lien.de];
        var f = Math.min(1, k.t / k.lien.long);
        var x = a.x + (b.x - a.x) * f, y = a.y + (b.y - a.y) * f;
        /* Une petite traînée, puis la tête du paquet. */
        for (var s = 3; s >= 0; s--) {
          var g = Math.max(0, f - s * 0.025);
          ctx.globalAlpha = 0.12 + (3 - s) * 0.2;
          ctx.fillStyle = c.c;
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * g, a.y + (b.y - a.y) * g, s === 0 ? 2.8 : 2, 0, 6.2832);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    }

    function image(t) {
      if (!enCours) { return; }
      var dt = Math.min(0.05, (t - dernier) / 1000 || 0);
      dernier = t;

      paquets.forEach(function (k) { k.t += k.vitesse * dt; });
      paquets = paquets.filter(function (k) {
        if (k.t < k.lien.long) { return true; }
        /* Arrivé : il repart sur un lien voisin (trois sauts au plus). */
        if (k.sauts >= 3) { return false; }
        var fin = k.sens > 0 ? k.lien.vers : k.lien.de;
        var suite = liens.filter(function (l) { return (l.de === fin || l.vers === fin) && l !== k.lien; });
        if (!suite.length) { return false; }
        var nl = suite[Math.floor(Math.random() * suite.length)];
        k.lien = nl; k.sens = nl.de === fin ? 1 : -1; k.t = 0; k.sauts++;
        return true;
      });
      if (paquets.length < 6 && Math.random() < 0.04) { nouveauPaquet(); }

      dessiner(couleurs());
      requestAnimationFrame(image);
    }

    function demarrer() {
      if (enCours || fixe || !visible || document.hidden) { return; }
      enCours = true; dernier = performance.now();
      requestAnimationFrame(image);
    }
    function arreter() { enCours = false; }

    construire();
    dessiner(couleurs());
    if (fixe) { return; }

    if ("ResizeObserver" in window) {
      new ResizeObserver(function () { construire(); dessiner(couleurs()); }).observe(canvas);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible) { demarrer(); } else { arreter(); }
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { arreter(); } else { demarrer(); }
    });
    demarrer();
  }

  /* Le terminal : les commandes de TERMINAL se tapent, la sortie apparaît,
     puis on passe à la suivante. Trois lignes visibles au maximum. */
  function construireTerminal() {
    var boite = el("terminal");
    if (!boite) { return; }
    if (typeof TERMINAL === "undefined" || !TERMINAL.length) { boite.remove(); return; }

    var barre = creer("div", "terminal__barre");
    for (var i = 0; i < 3; i++) {
      var p = creer("span", "terminal__point"); p.setAttribute("aria-hidden", "true"); barre.appendChild(p);
    }
    barre.appendChild(creer("span", "terminal__titre", "extraits de mes recettes"));
    var corps = creer("div", "terminal__corps");
    remplir(boite, [barre, corps]);

    function entree(e) {
      var bloc = creer("div", "terminal__entree");
      var ligne = creer("div", "terminal__ligne");
      ligne.appendChild(creer("span", "terminal__invite", e.invite));
      var cmd = creer("span", "terminal__cmd", "");
      ligne.appendChild(cmd);
      bloc.appendChild(ligne);
      var sortie = creer("div", "terminal__sortie", e.sortie);
      var source = creer("div", "terminal__source", "# " + e.source);
      return { bloc: bloc, cmd: cmd, sortie: sortie, source: source, ligne: ligne };
    }

    /* Sans animation : tout est affiché d'un coup, lisible tel quel. */
    if (mouvementReduit()) {
      TERMINAL.slice(0, 3).forEach(function (e) {
        var x = entree(e);
        x.cmd.textContent = e.commande;
        x.bloc.appendChild(x.sortie); x.bloc.appendChild(x.source);
        corps.appendChild(x.bloc);
      });
      return;
    }

    var visible = true, indice = 0;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(boite);
    }

    function attendre(ms, suite) {
      /* Si l'élément est hors écran ou l'onglet caché, on patiente. */
      setTimeout(function () {
        if (!visible || document.hidden) { attendre(400, suite); } else { suite(); }
      }, ms);
    }

    function jouer() {
      var e = TERMINAL[indice % TERMINAL.length];
      indice++;
      var x = entree(e);
      var curseur = creer("span", "terminal__curseur", "");
      curseur.setAttribute("aria-hidden", "true");
      x.ligne.appendChild(curseur);
      corps.appendChild(x.bloc);
      while (corps.children.length > 3) { corps.removeChild(corps.firstChild); }

      var k = 0;
      (function taper() {
        if (k < e.commande.length) {
          x.cmd.textContent = e.commande.slice(0, ++k);
          attendre(35 + Math.random() * 45, taper);
        } else {
          attendre(350, function () {
            curseur.remove();
            x.bloc.appendChild(x.sortie);
            x.bloc.appendChild(x.source);
            attendre(2400, jouer);
          });
        }
      })();
    }
    jouer();
  }

  /* Les blocs apparaissent en fondu quand on les atteint en défilant.
     ------------------------------------------------------------------------
     C'est le JavaScript qui les masque (classe a-reveler), pas le CSS : si le
     script échoue, ou si le navigateur est ancien, rien n'est jamais caché.
     Chaque bloc n'est animé qu'une fois. */
  function preparerApparitions() {
    if (!("IntersectionObserver" in window) || mouvementReduit()) { return; }

    var cibles = document.querySelectorAll(".domaine, .vignette, .projet, .etape-frise");
    if (!cibles.length) { return; }

    var guet = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        e.target.classList.add("est-visible");   /* lance l'animation CSS */
        guet.unobserve(e.target);
      });
    }, { threshold: 0.15 });

    [].forEach.call(cibles, function (c, i) {
      c.classList.add("a-reveler");
      /* Léger décalage entre voisins : trois rythmes au maximum, pour que
         l'effet guide l'oeil sans jamais faire attendre. */
      c.style.setProperty("--retard", (i % 3) * 60 + "ms");
      guet.observe(c);
    });

    /* Filet de sécurité : si l'observateur ne s'est pas déclenché (navigateur
       capricieux, onglet en arrière-plan au chargement), les blocs déjà à
       l'écran sont révélés au bout de 2,5 secondes. Mieux vaut un bloc sans
       animation qu'un bloc invisible. */
    setTimeout(function () {
      [].forEach.call(document.querySelectorAll(".a-reveler:not(.est-visible)"), function (c) {
        var r = c.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.1 && r.bottom > 0) { c.classList.add("est-visible"); }
      });
    }, 2500);
  }

  function demarrer() {
    /* Si data.js n'a pas été chargé, on le dit clairement dans la console
       plutôt que de laisser une page à moitié vide sans explication. */
    if (typeof IDENTITE === "undefined" || typeof PAGES === "undefined") {
      console.error("data.js n'a pas été chargé. Vérifie la balise <script> dans le fichier HTML.");
      return;
    }

    /* En premier : les pages qui suivent ne doivent jamais voir les lignes
       qui ne sont pas encore remplies. */
    elaguerRappels();

    construireEntete();
    construirePiedDePage();
    construireTitrePage();

    construireAccueil();
    construireChiffres();
    construireTerminal();
    preparerReseau();
    construireAPropos();
    construireCompetences();
    construireListeProjets();
    construirePageProjet();
    construireParcours();
    construireCertifications();
    construireVeille();
    construireContact();
    preparerFormulaire();

    preparerMenu();
    preparerTheme();
    preparerFil();

    /* En dernier : les blocs doivent déjà exister pour être observés. */
    preparerApparitions();
  }

  /* POURQUOI ON N'ATTEND PAS "DOMContentLoaded"
     -------------------------------------------
     Ce fichier est le tout dernier élément de la page : quand il s'exécute,
     tout le HTML au-dessus est déjà lu et tous les conteneurs existent.
     Attendre DOMContentLoaded ne servirait à rien, et surtout ça laisserait
     au navigateur une occasion de peindre la page ENCORE VIDE — ce qui se
     voit comme un bref éclair blanc au changement de page.

     Le repli sur DOMContentLoaded reste là au cas où quelqu'un déplacerait
     un jour la balise <script> dans le <head> : dans ce cas seulement,
     le body n'existe pas encore et il faut patienter. */
  if (document.body) {
    demarrer();
  } else {
    document.addEventListener("DOMContentLoaded", demarrer);
  }

})();
