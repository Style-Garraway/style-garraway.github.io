/* ==========================================================================
   data.js — TON CONTENU
   --------------------------------------------------------------------------
   C'EST LE SEUL FICHIER QUE TU AURAS BESOIN DE MODIFIER AU QUOTIDIEN.

   Comment ça marche : ce fichier ne contient que des données, pas de code
   compliqué. Tu remplaces le texte entre les guillemets, tu enregistres,
   tu rafraîchis la page dans le navigateur. C'est tout.

   TROIS RÈGLES À NE JAMAIS OUBLIER :
     1. Ne supprime jamais les guillemets " " autour d'un texte.
     2. Chaque ligne se termine par une virgule , sauf la dernière du bloc.
     3. On utilise des guillemets doubles " " partout, donc les apostrophes
        dans tes textes ne posent aucun problème.

   ASTUCE : si tu écris "TODO: quelque chose", ce texte est traité comme un
   rappel : voir l'interrupteur juste en dessous.
   ========================================================================== */


/* ==========================================================================
   0. INTERRUPTEUR DES RAPPELS « TODO »
   --------------------------------------------------------------------------
   false → les rappels sont CACHÉS aux visiteurs : une ligne pas encore
           remplie disparaît, au lieu d'afficher une consigne de brouillon
           comme « remplace cette ligne par... ». C'est le réglage à garder
           sur le site publié.
   true  → ils s'affichent en orange, pour que tu voies ce qu'il reste à
           écrire. À utiliser quand tu travailles sur le site en local.
   ========================================================================== */

const AFFICHER_RAPPELS = false;


/* ==========================================================================
   1. QUI TU ES — en-tête du site, balises SEO, pied de page
   ========================================================================== */

const IDENTITE = {

  prenom: "Style",
  nom: "Garraway",

  // Le poste que tu VISES, pas celui que tu as.
  posteVise: "Administrateur réseau",

  // Affiché juste sous ton nom. Court.
  statut: "BTS SIO option SISR — 2e année",
  etablissement: "LGT Baimbridge, Les Abymes (Guadeloupe)",

  // L'ACCROCHE — la phrase la plus importante du site.
  // Elle doit dire ce que tu SAIS FAIRE, avec des noms de technos.
  // Interdit : "passionné", "dynamique", "rigoureux", "depuis tout petit".
  accroche: "Je déploie et documente des infrastructures : Active Directory, DHCP, DNS, serveurs web et de fichiers, sur Windows Server (2022, 2025) et Debian 12.",

  // L'ANGLE — ce qui te distingue des autres candidats SISR.
  // Affiché en évidence sous l'accroche.
  angle: "Pendant que le BTS avance, je valide des certifications en parallèle : 5 certifications Cisco Networking Academy obtenues, AWS Cloud Practitioner en préparation.",

  // Description courte pour Google et les aperçus de lien (150-160 caractères).
  metaDescription: "Style Garraway, étudiant en BTS SIO SISR à Baimbridge. Active Directory, DHCP, DNS, Debian : infrastructures documentées, certifications vérifiables.",

  // TA PHOTO. Laisse "" et le portrait disparaît proprement de l'accueil.
  // Le fichier est dans assets/img/. Format portrait ou carré, moins de 150 Ko.
  photo: "assets/img/portrait-style-garraway.jpg",
  photoAlt: "Portrait de Style Garraway",

  // L'EMAIL EST DÉCOUPÉ EN DEUX POUR ÉCHAPPER AUX ROBOTS SPAMMEURS.
  // Le site le recolle en JavaScript. Ne le remets jamais en un seul morceau.
  emailAvantArobase: "stylegarraway97",
  emailApresArobase: "gmail.com",

  // TÉLÉPHONE : volontairement absent du site. Ton adresse e-mail est le seul
  // contact direct.

  linkedin: "https://www.linkedin.com/in/style-garraway-1413b0350/",

  // CREDLY — ton porte-badges officiel Cisco.
  // C'est la preuve la plus forte du site : n'importe qui peut y vérifier tes
  // badges lui-même, sans avoir à te croire sur parole. Laisse "" si un jour
  // tu n'en veux plus, le bouton disparaîtra partout.
  credly: "https://www.credly.com/users/style-garraway",

  // GOOGLE SKILLS — ton second porte-badges vérifiable.
  // Ce lien n'est valable que tant que ton profil est réglé sur "public"
  // dans les paramètres de skills.google. Si tu le repasses en privé,
  // vide cette ligne, sinon les visiteurs tomberont sur une page d'erreur.
  googleSkills: "https://www.skills.google/public_profiles/92348b2c-c3c6-48b8-985e-c905e840d7e4",

  // MICROSOFT LEARN — ton profil public. C'est de là que viennent les badges
  // officiels et les dates exactes des dix modules.
  microsoftLearn: "https://learn.microsoft.com/fr-fr/users/stylegarraway-1927/",

  // GITHUB — tu n'en as pas encore.
  // Laisse la chaîne vide "" et le bouton n'apparaîtra pas du tout.
  // Le jour où tu crées ton compte, colle l'adresse ici et il s'affichera.
  github: "",

  // LE CV — dépose ton fichier PDF dans assets/cv/ puis mets son chemin ici.
  // Laisse "" tant que tu ne l'as pas : le bouton disparaîtra proprement
  // plutôt que d'afficher un lien mort.
  // Exemple : "assets/cv/CV-Style-Garraway.pdf"
  cvFichier: "assets/cv/CV-Style-Garraway.pdf",
  cvPoids: "60 Ko"

};


/* ==========================================================================
   1 bis. LES PAGES DU SITE
   --------------------------------------------------------------------------
   Le site est découpé en plusieurs pages. Cette liste est la SEULE source du
   menu : il est reconstruit à l'identique sur chacune des pages à partir d'ici.

   Si tu ajoutes une entrée, le menu se met à jour partout d'un coup. Tu n'as
   jamais à modifier 10 fichiers à la main.

   Pour chaque page :
     cle      → doit correspondre à l'attribut data-page="..." du fichier HTML
     fichier  → le nom du fichier
     menu     → le texte affiché dans le menu (court !)
     titre    → le grand titre en haut de la page
     chapo    → la phrase d'introduction sous le titre (facultatif : "")
     resume   → la phrase affichée sur la carte de la page d'accueil
   ========================================================================== */

const PAGES = [
  {
    cle: "a-propos",
    fichier: "a-propos.html",
    menu: "À propos",
    titre: "À propos",
    chapo: "",
    resume: "Qui je suis, en cinq lignes et sans adjectif."
  },
  {
    cle: "competences",
    fichier: "competences.html",
    menu: "Compétences",
    titre: "Compétences",
    chapo: "Pour chaque compétence, l'endroit exact où je l'ai acquise : un TP, un stage, ou une certification vérifiable.",
    resume: "43 compétences réparties en 8 domaines, chacune sourcée."
  },
  {
    cle: "projets",
    fichier: "projets.html",
    menu: "Projets",
    titre: "Projets",
    chapo: "Chaque projet suit la même trame : contexte, problème, solution technique, outils, résultat, et ce que j'en ai appris.",
    resume: "Les infrastructures que j'ai montées et documentées."
  },
  {
    cle: "certifications",
    fichier: "certifications.html",
    menu: "Certifications",
    titre: "Certifications et badges",
    chapo: "Toutes mes certifications, avec leurs badges officiels et les certificats téléchargeables. Rien n'est affiché ici sans preuve.",
    resume: "5 certifications Cisco, leurs badges et les certificats à télécharger."
  },
  {
    cle: "parcours",
    fichier: "parcours.html",
    menu: "Parcours",
    titre: "Parcours",
    chapo: "Ma formation et mes stages, dans l'ordre.",
    resume: "Formation et stages, en frise chronologique."
  },
  {
    cle: "veille",
    fichier: "veille.html",
    menu: "Veille",
    titre: "Veille technologique",
    chapo: "Les sujets que je suis, mes sources, et ce que j'en retire.",
    resume: "Les sujets que je suis, et pourquoi."
  },
  {
    cle: "contact",
    fichier: "contact.html",
    menu: "Contact",
    titre: "Contact",
    chapo: "E-mail ou formulaire : deux façons de me joindre. Ce site n'enregistre rien de ce que vous écrivez.",
    resume: "E-mail, formulaire et mes profils vérifiables."
  }
];


/* ==========================================================================
   1 ter. LES CHIFFRES CLÉS — la bande sous ton nom, sur l'accueil
   --------------------------------------------------------------------------
   Un chiffre n'a de valeur que si quelqu'un peut le vérifier. Chacun de ceux
   ci-dessous renvoie à une pièce consultable sur le site.

   Deux façons de donner la valeur :
     valeur: 21           → tu écris le nombre toi-même
     depuis: "pages"      → le site le calcule tout seul et ne peut donc pas
                            se tromper quand tu ajoutes un projet ou une
                            certification. Les valeurs possibles :
                              "pages"          total des pages des documentations
                              "certifications" certifications obtenues (Cisco)
                              "competences"    compétences de la page Compétences

   Un chiffre à zéro n'est pas affiché. Pour retirer toute la bande, vide la
   liste : const CHIFFRES = [];
   ========================================================================== */

const CHIFFRES = [
  { depuis: "pages",          libelle: "pages de documentation technique" },
  { valeur: 21,               libelle: "tests conformes sur 23, au TP n°1" },
  { depuis: "certifications", libelle: "certifications Cisco obtenues" },
  { depuis: "competences",    libelle: "compétences, chacune avec sa source" }
];


/* ==========================================================================
   1 quater. LE TERMINAL ANIMÉ (accueil)
   --------------------------------------------------------------------------
   Des commandes qui se tapent toutes seules. Chaque ligne vient d'un test de
   recette de tes documentations : n'en ajoute pas qui ne soient pas tirées
   d'un de tes TP. Champs : invite ("PS>" Windows, "$" Linux), commande,
   sortie (le résultat attendu et obtenu), source (le TP et le test).
   Pour retirer le terminal : const TERMINAL = [];
   ========================================================================== */

const TERMINAL = [
  { invite: "PS>", commande: "nslookup srvad.ville-abymes.fr",  sortie: "192.168.60.2",          source: "TP n°1 — test T2" },
  { invite: "PS>", commande: "Get-DhcpServerInDC",              sortie: "srvad.ville-abymes.fr", source: "TP n°1 — test T8" },
  { invite: "$",   commande: "ping 192.168.60.4",               sortie: "0 % de perte",          source: "TP n°3 — test T7" },
  { invite: "$",   commande: "systemctl status haproxy",        sortie: "active (running)",      source: "TP n°4 — test T11" },
  { invite: "$",   commande: "ping srvweb2",                    sortie: "4/4 réponses",          source: "TP n°4 — test T3" }
];


/* ==========================================================================
   2. À PROPOS — 4 à 6 lignes maximum, à la première personne
   ========================================================================== */

const A_PROPOS = [
  "J'entre en deuxième année de BTS SIO option SISR à Baimbridge, aux Abymes.",
  "Cette année j'ai monté, cassé et remonté des infrastructures complètes en machines virtuelles : contrôleur de domaine Active Directory, serveurs DHCP et DNS, serveur web Apache, serveur FTP, et une plateforme de tickets GLPI couplée à un inventaire OCS.",
  "Je travaille autant sur Windows Server — 2022, puis 2025 — que sur Debian 12, et j'ai câblé du vrai matériel — un switch Cisco SG 300-10 — pas seulement des cartes réseau virtuelles.",
  "En juin et juillet 2026, j'ai passé deux mois à la mairie de Morne-à-l'Eau comme stagiaire administrateur réseau : une infrastructure en production, et des agents qui en dépendent tous les jours.",
  "Ce qui m'intéresse, c'est le moment où l'infrastructure devient invisible pour les gens qui s'en servent."
];


/* ==========================================================================
   3. COMPÉTENCES
   --------------------------------------------------------------------------
   Pas de barres de pourcentage : c'est invérifiable et ça fait amateur.
   À la place, le nom de la compétence, et surtout OÙ tu l'as pratiquée.

   Deux champs par ligne :
     nom → l'outil ou la notion, écrit avec son vrai nom (version comprise)
     ou  → l'endroit exact où tu l'as mise en oeuvre : "TP n°5", "stage à
           la mairie de Morne-à-l'Eau", "certification Cisco CCNA 1"...

   Le champ "ou" est OBLIGATOIRE. C'est lui qui transforme une affirmation
   en preuve. C'est exactement ce que le jury E5 cherche.

   REMARQUE : tu verras un champ "etat" sur chaque ligne. Il ne s'affiche
   plus nulle part sur le site — il est resté là au cas où tu voudrais un
   jour réafficher les trois niveaux (en service / en rodage / repéré).
   Tu peux l'ignorer complètement, il ne gêne rien.
   ========================================================================== */

const COMPETENCES = [

  {
    domaine: "Systèmes",
    items: [
      { nom: "Windows Server 2025 Datacenter", ou: "TP n°1 Bloc 2 — contrôleur de domaine de la mairie des Abymes" },
      { nom: "Windows Server 2022 Datacenter", etat: "service", ou: "TP n°5 — infrastructure de la mairie des Abymes" },
      { nom: "Windows 10 / 11 Professionnel",  etat: "service", ou: "TP n°2 — installation et administration complètes" },
      { nom: "Debian 12 Bookworm",             etat: "service", ou: "TP n°3, 6, 7 et Bloc 2 — installation et administration" },
      { nom: "Debian 13 Trixie",               ou: "TP n°3, n°4 et n°6 (septembre 2026) — serveurs web et répartiteur de charge" },
      { nom: "Serveur web Apache 2 — hôtes virtuels, ports, journaux", ou: "TP n°6 Bloc 1 — site des Jardins de Saint-Eloi, passage au port 8080" },
      { nom: "Stratégies de groupe (GPO)",     etat: "service", ou: "TP n°2 (GPO locales), TP n°5 et TP n°1 Bloc 2 (GPO de domaine, ciblage par groupe)" },
      { nom: "Profils itinérants", ou: "TP n°1 Bloc 2 — partage caché, droits NTFS et partage, dépannage des profils temporaires" },
      { nom: "Déploiement de logiciels par GPO", ou: "TP n°1 Bloc 2 — Firefox et Notepad++ en MSI, sans intervention sur les postes" },
      { nom: "Base de registre, console MMC",  etat: "rodage",  ou: "TP n°2 — console personnalisée, déplacement des profils" },
      { nom: "Partitionnement MBR / GPT",      etat: "rodage",  ou: "TP n°2 — création, conversion et redimensionnement" }
    ]
  },

  {
    domaine: "Réseau",
    items: [
      { nom: "DHCP",                            etat: "service", ou: "TP n°5 — étendue, baux et réservations" },
      { nom: "DNS (rôle Windows Server)",       etat: "service", ou: "TP n°5 — zones directe et inversée" },
      { nom: "DNS (Bind9 sous Debian)",         etat: "service", ou: "TP n°7 — zones, résolution et tests" },
      { nom: "Adressage IPv4 et sous-réseaux",  etat: "service", ou: "TP n°5 à n°7 — plans d'adressage complets" },
      { nom: "Switch Cisco SG 300-10",          etat: "rodage",  ou: "TP n°6 et n°7 — câblage RJ45, mise en réseau physique" },
      { nom: "Cisco Packet Tracer",             etat: "rodage",  ou: "Certifications Cisco Networking Academy" },
      { nom: "Haute disponibilité — cluster actif/passif avec Heartbeat", ou: "TP n°3 Bloc 3 — adresse IP virtuelle, bascule et retour automatiques" },
      { nom: "Répartition de charge — HAProxy (round robin, check)", ou: "TP n°4 Bloc 3 — 244 requêtes sur chaque serveur, panne détectée en quelques secondes" },
      { nom: "Notions de base sur les réseaux", ou: "Certification Cisco Networking Basics — octobre 2026" },
      { nom: "Conception de topologies réseau", ou: "Certifications Cisco Exploring Networking et Introduction to Packet Tracer" },
      { nom: "Objets connectés (IoT) en réseau simulé", ou: "Certification Cisco Exploring IoT with Packet Tracer — novembre 2025" }
    ]
  },

  {
    domaine: "Virtualisation",
    items: [
      { nom: "VirtualBox 7.2 + Extension Pack", etat: "service", ou: "Tous les TP de l'année — création, clonage, réseau" },
      { nom: "Modes réseau virtuels",           etat: "service", ou: "TP n°5 à n°7 — accès par pont, réseau interne, NAT" },
      { nom: "VMware Workstation Pro",          ou: "TP n°1 Bloc 2, n°3, n°4 et n°6 — maquettes sur segments LAN isolés" }
    ]
  },

  {
    domaine: "Sécurité",
    items: [
      { nom: "Droits NTFS et comptes Windows",  etat: "service", ou: "TP n°2 — comptes administrateur, standard, cloisonnement" },
      { nom: "Droits Unix (chmod)",             etat: "service", ou: "TP n°3 bis — notation symbolique et octale" },
      { nom: "Authentification FTP",            etat: "service", ou: "Projet SHARE — accès nominatif au serveur de fichiers" },
      { nom: "Restrictions par GPO",            etat: "service", ou: "TP n°2 — blocage du panneau de configuration et de cmd.exe" },
      { nom: "Confidentialité, intégrité, disponibilité", etat: "rodage", ou: "Projet SHARE — étude de la solution cloud" },
      { nom: "Menaces, vulnérabilités et protection des données", ou: "Certification Cisco Introduction to Cybersecurity — mars 2026" },
      { nom: "Authentification d'un site web (basic, mots de passe bcrypt)", ou: "TP n°6 Bloc 1 — accès réservé à trois comptes" },
      { nom: "Unités d'organisation et groupes de sécurité", ou: "TP n°1 Bloc 2 — organigramme de la mairie reproduit dans l'annuaire" }
    ]
  },

  {
    domaine: "Support & ITSM",
    items: [
      { nom: "GLPI 10.0.17",                    etat: "service", ou: "TP n°2 Bloc 2 — installation, profils, cycle de vie des tickets" },
      { nom: "OCS Inventory NG 2.12.1",         etat: "service", ou: "TP n°3 Bloc 2 — inventaire automatique et remontée vers GLPI" },
      { nom: "ITIL — gestion des configurations", etat: "rodage", ou: "TP n°3 Bloc 2 — CMDB et éléments de configuration" },
      { nom: "Documentation technique et plan de recette", etat: "service", ou: "TP n°6, n°7 et TP n°1 Bloc 2 — documentation de 100 pages, 23 tests de recette" }
    ]
  },

  {
    domaine: "Scripting & automatisation",
    items: [
      { nom: "Shell Linux (bash)", etat: "rodage", ou: "TP n°3 bis — navigation, redirections, filtres, droits" },
      { nom: "PowerShell",         etat: "repere", ou: "TP n°2 — lecture des variables d'environnement" },
      { nom: "C# — bases du langage", ou: "Modules Microsoft Learn — premières lignes de code (22 mars) et variables (24 mars 2026)" },
      { nom: "Claude Code en ligne de commande", ou: "Badge Claude Code 101, Anthropic" },
      { nom: "TODO: si tu automatises quelque chose cette année, ajoute-le ici — c'est ce qui manque le plus à ton profil", etat: "repere", ou: "TODO: à compléter" }
    ]
  },

  /* Ce domaine ne vient pas des TP mais des formations que tu as suivies en
     autonomie. Chaque ligne nomme le module ou la formation exacte : un
     recruteur peut aller la vérifier sur la page Certifications. */
  {
    domaine: "Cloud",
    items: [
      { nom: "Concepts du cloud (IaaS, PaaS, SaaS)", ou: "Parcours Microsoft Learn « Infrastructure cloud » — trophée obtenu, mars 2026" },
      { nom: "Architecture Azure — régions, zones de disponibilité, groupes de ressources", ou: "Module Microsoft Learn — composants architecturaux d'Azure, mars 2026" },
      { nom: "FinOps — maîtrise des coûts cloud", ou: "Module Microsoft Learn — prise en main de FinOps, mars 2026" },
      { nom: "Socle AWS Cloud Practitioner (CLF-C02)", ou: "Deux formations officielles AWS terminées en mars 2026 — examen non encore passé" }
    ]
  },

  {
    domaine: "IA et usages numériques",
    items: [
      { nom: "Fondamentaux de l'IA — capacités et limites", ou: "AI Foundations, OpenAI Academy — et module Microsoft Learn sur les concepts de l'IA" },
      { nom: "IA générative", ou: "Google Skills et Microsoft Learn — IA et agents génératifs, mai 2026" },
      { nom: "IA responsable", ou: "Google Skills — Introduction à l'IA responsable, mai 2026" },
      { nom: "Usage raisonné des assistants IA", ou: "AI Fluency: Framework & Foundations, Claude Academy — et AI Fluency for Students, Anthropic" }
    ]
  }

];


/* ==========================================================================
   4. PROJETS — le coeur du site
   --------------------------------------------------------------------------
   Structure imposée, ne la change pas : c'est elle qui parle au jury E5.
     contexte  → l'organisation, sa taille, son activité
     probleme  → ce qui ne marchait pas AVANT
     solution  → ce que TU as mis en place, techniquement
     outils    → la liste des technos
     resultats → DES CHIFFRES. C'est le point le plus important.
     appris    → ce que tu retiens, y compris ce qui a coincé
   ========================================================================== */

/* ⚠️ LES PROJETS NE SONT PLUS AFFICHÉS SUR LE SITE.
   --------------------------------------------------------------------------
   La page Projets a été retirée du menu et ses quatre fichiers HTML ont été
   déplacés dans   E:\portfolio-style-bts--projets-retires
   Rien n'est perdu : le contenu ci-dessous est intact.

   POUR LES REMETTRE :
     1. Recopie les quatre fichiers depuis le dossier ci-dessus vers la racine
        du site (projets.html et les trois projet-*.html).
     2. Remets l'entrée correspondante dans la liste PAGES plus haut :
          { cle: "projets", fichier: "projets.html", menu: "Projets",
            titre: "Projets", chapo: "...", resume: "..." },
     3. Le menu, le pied de page et la vignette d'accueil reviendront seuls.

   Tant qu'ils sont absents, cette liste ne gêne rien : app.js ne construit
   les projets que si la page correspondante existe. */
const PROJETS = [

  {
    id: "mairie-abymes",
    titre: "Infrastructure Active Directory pour la mairie des Abymes",
    sousTitre: "TP n°1 — Bloc 2, Administration des systèmes",
    periode: "Septembre 2026",
    tags: ["Windows Server 2025", "Active Directory", "DNS", "DHCP",
           "Stratégies de groupe", "Profils itinérants"],

    contexte: "La mairie des Abymes gère un parc d'environ 450 postes répartis entre huit services. Chaque machine fonctionne de façon autonome : les comptes sont créés localement, poste par poste, les documents restent sur les disques individuels et aucun réglage commun ne peut être imposé au parc. M. LAURENT, responsable du projet côté mairie, demande une infrastructure centralisée autour d'un serveur unique. La réalisation s'est faite sur une maquette de trois machines virtuelles — un serveur et deux postes clients — sur un réseau isolé.",

    probleme: "Un agent qui change de bureau perd son environnement de travail. Chaque arrivée ou départ oblige à intervenir sur toutes les machines une par une. Rien ne garantit que deux postes disposent des mêmes logiciels, et aucun contrôle n'existe sur ce que les utilisateurs peuvent modifier.",

    solution: "Installation du serveur srvad sous Windows Server 2025 Datacenter, promu contrôleur du domaine ville-abymes.fr. Quatre rôles déployés : Active Directory pour l'annuaire, DNS avec zones directe et inversée, DHCP sur une étendue de 192.168.60.10 à .20 avec un bail de 8 jours, et services de fichiers. L'organigramme de la mairie est reproduit en unités d'organisation et en groupes de sécurité, sous une convention de nommage écrite qui distingue les stratégies destinées aux machines de celles destinées aux personnes. Les stratégies de groupe imposent un fond d'écran par service, bloquent le panneau de configuration et la commande Exécuter, montent un lecteur réseau ciblé par groupe et installent Firefox et Notepad++ à distance en paquets MSI. Les profils itinérants sont hébergés sur un partage caché du serveur.",

    outils: ["Windows Server 2025 Datacenter", "Windows 11 Professionnel",
             "Active Directory (AD DS)", "DNS", "DHCP",
             "Stratégies de groupe", "Profils itinérants",
             "VMware Workstation Pro", "PowerShell", "Paquets MSI"],

    resultats: [
      "23 scénarios de recette déroulés : 21 conformes, 1 non conforme, 1 non réalisé.",
      "Un agent ouvre sa session sur n'importe lequel des deux postes et retrouve son fond d'écran, son lecteur réseau et ses documents.",
      "Firefox 155 et Notepad++ 8.9 installés sur les postes sans aucune intervention sur les machines.",
      "Cloisonnement vérifié : la Direction monte le lecteur W:, la comptabilité le lecteur X:, et aucun des deux ne voit l'autre.",
      "L'unique test en échec a été analysé jusqu'à sa cause et la correction documentée : les comptes d'ordinateurs étaient restés dans le conteneur Computers, auquel aucune stratégie ne peut être liée.",
      "8 préconisations chiffrées remises au commanditaire, dont l'ajout d'un second contrôleur de domaine et la mise en place d'une sauvegarde de l'état système."
    ],

    appris: "Dans une infrastructure Windows, la quasi-totalité des pannes que j'ai rencontrées ne venaient pas d'une mauvaise commande mais d'un mauvais emplacement : une stratégie liée à la mauvaise branche, un groupe créé dans la mauvaise unité d'organisation, un droit posé sur une seule des deux couches de sécurité d'un partage. La manipulation était juste, l'endroit ne l'était pas. J'ai aussi appris à lire les messages d'erreur au mot près : « accès refusé » et « chemin introuvable » désignent deux problèmes différents, et les confondre fait perdre une séance entière.",

    /* Ce que ce TP mobilise du référentiel — repris de la section 2.2 de ta
       documentation, donc rien d'inventé. Le jury E5 lit par CODES : si tu
       les as, écris-les devant chaque ligne, par exemple
       "B2.2 — Installer, tester et déployer une solution d'infrastructure".
       Vérifie-les dans ton référentiel avant de les publier. */
    referentiel: [
      "Installer et configurer un système d'exploitation serveur",
      "Déployer et paramétrer des services réseau",
      "Gérer des comptes, des groupes et des droits d'accès",
      "Automatiser la configuration d'un parc par stratégies",
      "Rédiger un plan de tests et documenter la solution livrée"
    ],

    /* Le document est la piece maitresse de ce projet : il prouve, captures
       et plan de recette a l'appui, ce que les lignes ci-dessus affirment.
       Laisse ce bloc absent pour un projet sans document a telecharger. */
    /* L'image affichee tout en haut de la page du projet. */
    illustration: {
      fichier: "assets/img/schema-tp1-infrastructure.png",
      alt: "Schéma de l'infrastructure : deux postes clients, Poste0 virtuel et Poste1 physique sous Windows 10 Pro, reliés par un switch au serveur srvad qui assure DNS ville-abymes.fr, Active Directory, contrôleur de domaine, DHCP et GPO, sur le réseau 192.168.X.0/24.",
      legende: "Architecture demandée par l'énoncé. Le serveur a été réalisé sous Windows Server 2025 : l'écart est détaillé dans la documentation (section 3.4)."
    },

    /* L'enonce du TP (document de l'enseignant), propose a cote de la
       documentation pour que le lecteur voie ce qui etait demande. */
    enonce: {
      fichier: "assets/docs/enonce-tp1-bloc2.pdf",
      poids: "1,1 Mo"
    },

    document: {
      fichier: "assets/docs/documentation-technique-tp1-mairie-abymes.pdf",
      pages: 100,
      poids: "3,1 Mo",
      resume: "Chaque étape est reproductible : chemins de menus complets, valeurs exactes, commandes à recopier, 84 captures commentées, plan de recette, difficultés rencontrées, limites et glossaire."
    }
  },

  /* ======================================================================
     TP n°6 — Apache 2 (Bloc 1). Contenu tire de la documentation, section
     par section : rien n'est ajoute qui n'y figure pas.
     ====================================================================== */
  {
    id: "apache2-jardins",
    titre: "Serveur web Apache 2 pour Les Jardins de Saint-Eloi",
    sousTitre: "TP n°6 — Bloc 1, Support et mise à disposition de services",
    periode: "Septembre 2026",
    tags: ["Debian 13", "Apache 2", "Hôtes virtuels", "Authentification", "SSH", "VMware"],

    contexte: "Les Jardins de Saint-Eloi, une entreprise guadeloupéenne de fleurs exotiques et de produits locaux, veut vendre dans toute la France grâce à une application web de commerce électronique. Son prestataire, IPEOS I Solutions, a besoin d'un serveur web Linux pour héberger l'application. La réalisation s'est faite sur une maquette de deux machines virtuelles sous VMware Workstation : un serveur et un poste client, sur un segment réseau isolé.",

    probleme: "Il faut mettre à disposition un serveur web Linux entièrement configuré : le site doit être publié sous son propre nom de domaine, joignable sur un port précis, et son accès doit pouvoir être réservé à des utilisateurs identifiés.",

    solution: "Sur le serveur srvlinux (Debian 13, sans interface graphique, adresse fixe 192.168.60.4), mise à jour des dépôts puis installation d'Apache 2. Analyse des fichiers de configuration, création de la page d'accueil du site et d'un hôte virtuel dédié avec ses propres journaux, activation du site, puis contrôle des processus et des ports d'écoute. Le port d'écoute passe de 80 à 8080. L'accès est ensuite protégé par une authentification basic : trois comptes, dont les mots de passe sont hachés en bcrypt. Le serveur est administré à distance par SSH depuis le poste hôte.",

    outils: ["Debian 13 Trixie", "Apache 2.4", "VMware Workstation", "SSH", "htpasswd (bcrypt)", "systemctl", "netstat / ss", "curl", "Firefox"],

    resultats: [
      "Le site des Jardins de Saint-Eloi est publié par un hôte virtuel dédié, sur le port 8080, avec ses propres journaux.",
      "Accès réservé à trois comptes, dont les mots de passe sont protégés par bcrypt.",
      "Fonctionnement vérifié depuis un poste client Debian situé sur un réseau isolé, puis à distance par SSH.",
      "Une méthode de diagnostic documentée, couche par couche : lien physique, adressage, connectivité, service, configuration chargée, réponse du serveur."
    ],

    appris: "Un énoncé s'adapte à l'environnement réel : les noms des cartes réseau, la version de Debian et certaines directives obsolètes ne correspondaient pas à ce qui était prévu. Ce qui m'a fait gagner du temps, c'est de vérifier chaque couche avant de passer à la suivante plutôt que de modifier la configuration au hasard. Le client Windows prévu par l'énoncé est facultatif : le service web se teste aussi bien depuis un client Linux, comme je l'ai fait."

    ,    referentiel: [
      "Installer et configurer des éléments d'infrastructure",
      "Déployer une solution d'infrastructure",
      "Administrer un système",
      "Administrer sur site et à distance des éléments d'une infrastructure",
      "Automatiser des tâches d'administration",
      "Tester l'intégration et l'acceptation d'une solution d'infrastructure",
      "Rédiger ou mettre à jour la documentation technique d'une solution d'infrastructure"
    ],

    illustration: {
      fichier: "assets/img/schema-tp6-infrastructure.png",
      alt: "Schéma de l'infrastructure : un routeur-passerelle relié à Internet, un switch qui relie un poste 1 Windows 10/11 Pro, un poste 2 Linux Debian 12 et le serveur Linux Debian nommé srvlinux, sur le réseau 192.168.X.0/24, qui héberge Apache 2 pour le domaine jardinsainteloi.com.",
      legende: "Architecture demandée par l'énoncé. Le poste Windows est facultatif : les tests ont été menés depuis le poste Linux. Les écarts avec l'énoncé (Debian 13, VMware) sont détaillés dans la documentation, section 3.1."
    },

    enonce: {
      fichier: "assets/docs/enonce-tp6-bloc1.pdf",
      poids: "1 Mo"
    },

    document: {
      fichier: "assets/docs/documentation-technique-tp6-apache2.pdf",
      pages: 68,
      poids: "1,7 Mo",
      resume: "Rapport de réalisation et guide pas à pas : chaque étape est reproductible, avec les commandes, les captures commentées, les difficultés rencontrées et leurs solutions."
    }
  },

  /* ======================================================================
     TP n°3 — Heartbeat (Bloc 3).
     ====================================================================== */
  {
    id: "heartbeat-jardins",
    titre: "Tolérance aux pannes d'un serveur web avec Heartbeat",
    sousTitre: "TP n°3 — Bloc 3, Sécurisation des serveurs et des systèmes",
    periode: "Septembre 2026",
    tags: ["Debian 13", "Apache 2", "Heartbeat", "Cluster actif/passif", "Adresse IP virtuelle"],

    contexte: "Les Jardins de Saint-Eloi, dirigée par Mme Bourgeois, vend des fleurs exotiques et des produits locaux. Son site web, migré vers Linux au TP n°6, repose sur un seul serveur Debian équipé d'Apache 2.",

    probleme: "Avec un seul serveur, la moindre panne (coupure, plantage, maintenance) rend le site inaccessible aux clients. Mme Bourgeois veut un serveur de secours capable de prendre le relais automatiquement.",

    solution: "Création de deux serveurs web, SRVWEB1 et SRVWEB2 (Debian 13, Apache 2), clonés puis renommés, chacun avec sa propre adresse IP. Ils sont regroupés en un cluster actif/passif géré par Heartbeat : un seul serveur répond, l'autre attend. Le site est servi par une adresse IP virtuelle unique, 192.168.60.4, qui se déplace automatiquement vers le serveur actif. La configuration repose sur les fichiers ha.cf, haresources et authkeys. Le tout est validé par des scénarios de panne.",

    outils: ["Debian 13 Trixie", "Apache 2", "Heartbeat", "VMware Workstation", "ping / arp", "systemctl", "Firefox"],

    resultats: [
      "14 tests de recette : 11 conformes, 1 conforme avec réserve (SRVWEB2 affichait une ancienne page), 2 non réalisés ou non capturés.",
      "Panne simulée de SRVWEB1 (arrêt de Heartbeat) : SRVWEB2 reprend l'adresse 192.168.60.4 en perdant une seule requête ; la bascule est prouvée par le changement d'adresse MAC.",
      "Au retour de SRVWEB1, il récupère automatiquement la main.",
      "Limites identifiées et documentées : Heartbeat surveille les machines, pas Apache ; il n'est plus maintenu depuis 2014, Pacemaker/Corosync ou Keepalived sont les solutions actuelles."
    ],

    appris: "Un cluster actif/passif protège d'une panne de machine, pas d'une panne de service : si Apache plante alors que Heartbeat tourne, aucune bascule n'a lieu. J'ai aussi retenu qu'il faut régénérer le Machine ID et les clés SSH d'hôte après chaque clonage de machine virtuelle, et que deux serveurs censés servir le même site doivent être synchronisés."
    ,    referentiel: [
      "Installer et configurer des éléments d'infrastructure",
      "Déployer une solution d'infrastructure",
      "Administrer un système",
      "Automatiser des tâches d'administration",
      "Tester l'intégration et l'acceptation d'une solution d'infrastructure",
      "Rédiger ou mettre à jour la documentation technique d'une solution d'infrastructure"
    ],

    illustration: {
      fichier: "assets/img/schema-tp3-infrastructure.png",
      alt: "Schéma de l'infrastructure : deux postes clients, poste0 virtuel et poste1 physique, reliés par un switch réseau interne LAN à deux serveurs web srvweb1 et srvweb2 réunis en cluster actif/passif, qui partagent une adresse IP virtuelle 192.168.X.4.",
      legende: "Architecture demandée par l'énoncé (Debian 12 prévu, Debian 13 utilisé). Les écarts sont détaillés dans la documentation, section 3.1."
    },

    enonce: {
      fichier: "assets/docs/enonce-tp3-bloc3.pdf",
      poids: "0,9 Mo"
    },

    document: {
      fichier: "assets/docs/documentation-technique-tp3-heartbeat.pdf",
      pages: 35,
      poids: "1,1 Mo",
      resume: "Rapport de réalisation et guide technique : étapes pas à pas, tableau de recette, difficultés rencontrées, limites et perspectives, aide-mémoire des commandes."
    }
  },

  /* ======================================================================
     TP n°4 — HAProxy (Bloc 3).
     ====================================================================== */
  {
    id: "haproxy-jardins",
    titre: "Haute disponibilité et répartition de charge avec HAProxy",
    sousTitre: "TP n°4 — Bloc 3, Sécurisation des serveurs et des systèmes",
    periode: "Septembre 2026",
    tags: ["Debian 13", "HAProxy", "Répartition de charge", "Actif/actif", "Apache 2"],

    contexte: "Suite du TP n°3. Les Jardins de Saint-Eloi disposent de deux serveurs web Debian équipés d'Apache 2, mais un seul travaille : l'autre attend la panne.",

    probleme: "Mme Bourgeois veut que chaque serveur soit utilisé de façon optimale : pas de serveur surchargé pendant que l'autre est sous-utilisé, et un site toujours disponible si l'un des deux tombe.",

    solution: "Un serveur SRVHAPROXY (Debian 13, HAProxy 3.0) est placé devant les deux serveurs web. Il est relié au réseau des clients (192.168.60.4) et à un réseau privé HA (10.0.0.0/24) où SRVWEB1 (10.0.0.2) et SRVWEB2 (10.0.0.3) sont isolés. HAProxy répartit les requêtes HTTP entre eux en round robin, les deux serveurs fonctionnant désormais en actif/actif, et vérifie leur état avec le paramètre check. Une page de statistiques protégée par mot de passe permet de superviser le tout.",

    outils: ["Debian 13 Trixie", "HAProxy 3.0", "Apache 2", "VMware Workstation", "curl", "systemctl", "Page de statistiques HAProxy"],

    resultats: [
      "17 tests de recette : 14 conformes, 3 à compléter (captures manquantes).",
      "Répartition parfaitement égale : 244 requêtes pour chacun des deux serveurs, sur 488.",
      "Arrêt d'Apache sur SRVWEB1 détecté en quelques secondes ; le site reste servi par SRVWEB2.",
      "Comparaison documentée avec le TP n°3 : HAProxy utilise les deux serveurs et vérifie le service web lui-même, pas seulement la machine."
    ],

    appris: "La répartition de charge règle un problème que le cluster actif/passif laissait entier : le serveur de secours inutilisé. Mais elle déplace le point de défaillance : SRVHAPROXY est lui-même unique, et s'il tombe tout s'arrête. La suite logique est de le doubler avec Keepalived. J'ai aussi appris à ne pas masquer mes manques : la documentation signale les captures à compléter."
    ,    referentiel: [
      "Installer et configurer des éléments d'infrastructure",
      "Déployer une solution d'infrastructure",
      "Administrer un système",
      "Automatiser des tâches d'administration",
      "Tester l'intégration et l'acceptation d'une solution d'infrastructure",
      "Rédiger ou mettre à jour la documentation technique d'une solution d'infrastructure"
    ],

    illustration: {
      fichier: "assets/img/schema-tp4-infrastructure.png",
      alt: "Schéma de l'infrastructure : deux postes clients reliés par un switch LAN au serveur srvhaproxy, lui-même relié par un second switch, le réseau HA, à deux serveurs web srvweb1 et srvweb2 en cluster actif/actif, avec leurs adresses IP.",
      legende: "Architecture demandée par l'énoncé (Debian 12 prévu, Debian 13 utilisé). Les écarts sont détaillés dans la documentation, section 3.1."
    },

    enonce: {
      fichier: "assets/docs/enonce-tp4-bloc3.pdf",
      poids: "1 Mo"
    },

    document: {
      fichier: "assets/docs/documentation-technique-tp4-haproxy.pdf",
      pages: 34,
      poids: "1,1 Mo",
      resume: "Rapport de réalisation et guide technique : étapes pas à pas, tableau de recette de 17 tests, difficultés rencontrées, limites et perspectives, aide-mémoire des commandes."
    }
  }

];

// --------------------------------------------------------------------------
// POUR AJOUTER UN QUATRIÈME PROJET
// --------------------------------------------------------------------------
// 1. Dans la liste PROJETS ci-dessus, ajoute une virgule après la dernière
//    accolade fermante  }  (celle juste avant le crochet  ]  ).
// 2. Copie-colle le bloc ci-dessous en enlevant les  //  de chaque ligne.
// 3. Enregistre, rafraîchis la page. C'est fini.
//
// Ce projet-là est déjà prêt si tu veux l'activer un jour : c'est ton TP n°6
// et n°7, le seul où tu as manipulé du vrai matériel réseau.
//
//   {
//     id: "saint-eloi",
//     titre: "Hébergement web et DNS — Les Jardins de Saint-Éloi",
//     sousTitre: "TP n°6 et n°7, Bloc 1",
//     periode: "2026",
//     tags: ["Apache 2", "Bind9", "Switch Cisco"],
//     contexte: "Une entreprise guadeloupéenne de vente de fleurs exotiques et de produits locaux, qui veut vendre en ligne dans toute la France via une ESN locale.",
//     probleme: "L'application web existait, mais rien pour l'héberger ni pour la rendre accessible par un nom de domaine.",
//     solution: "J'ai déployé un serveur web Apache 2 sur Debian 12 sans interface graphique, puis un serveur DNS Bind9 avec ses zones directe et inversée pour que le site réponde à un nom plutôt qu'à une adresse IP. L'ensemble tourne sur une infrastructure physique réelle : deux postes reliés par un switch Cisco SG 300-10 et du câblage RJ45.",
//     outils: ["Debian 12 Bookworm", "Apache 2", "Bind9", "Switch Cisco SG 300-10", "VirtualBox"],
//     resultats: ["TODO: à chiffrer"],
//     appris: "TODO: à compléter"
//   }


/* ==========================================================================
   5. PARCOURS — frise chronologique
   --------------------------------------------------------------------------
   Ordre : du plus récent au plus ancien.
   type : "formation" | "stage" | "certification"
   ========================================================================== */

const PARCOURS = [
  {
    periode: "2026 — 2027",
    type: "formation",
    titre: "BTS SIO option SISR — 2e année",
    lieu: "LGT Baimbridge, Les Abymes",
    detail: "Solutions d'infrastructure, systèmes et réseaux."
  },
  {
    periode: "Juin — juillet 2026",
    type: "stage",
    titre: "Administrateur de réseau informatique — stage",
    lieu: "Mairie de Morne-à-l'Eau",
    /* À ENRICHIR : ajoute ce que tu as fait précisément, avec au moins un
       chiffre (postes du parc, comptes gérés, interventions traitées). Une
       phrase concrète vaut mieux que trois générales. La phrase ci-dessous
       reprend uniquement ce que ta page « À propos » dit déjà. */
    detail: "Deux mois sur site : administration du réseau et des serveurs de la collectivité, sur une infrastructure en production dont dépendent les agents au quotidien."
  },
  {
    periode: "2025 — 2026",
    type: "formation",
    titre: "BTS SIO option SISR — 1re année",
    lieu: "LGT Baimbridge, Les Abymes",
    detail: "Support système des accès utilisateurs, mise à disposition de services, administration des systèmes."
  },
  {
    periode: "Avril — mai 2024",
    type: "stage",
    titre: "Technicien en systèmes d'alarme et de sécurité — stage",
    lieu: "Câblage Système, Baie-Mahault",
    detail: "Deux mois sur site : installation, configuration et maintenance d'équipements SSIHT, câblage et raccordement de systèmes électroniques."
  },
  {
    periode: "2025",
    type: "formation",
    titre: "Baccalauréat professionnel Systèmes numériques — mention Bien",
    lieu: "Lycée Gerty Archymède",
    detail: "Option A : sûreté et sécurité des infrastructures, de l'habitat et du tertiaire. Session 2025, académie de Guadeloupe."
  }
];

/* NOTE — pourquoi l'attestation du bac n'est PAS publiée sur le site :
   le PDF Cyclades contient ta date et ta commune de naissance. Ce sont des
   données personnelles qui servent régulièrement à l'usurpation d'identité,
   et elles n'apportent rien à un recruteur. La mention et la spécialité en
   texte suffisent ; l'attestation, tu la montres en entretien. */


/* ==========================================================================
   6. CERTIFICATIONS
   --------------------------------------------------------------------------
   IMPORTANT — HONNÊTETÉ : les modules Microsoft Learn ne sont PAS des
   certifications, ce sont des modules de formation. Ils sont donc dans une
   catégorie séparée. Si un recruteur ou le jury creuse, tu es couvert.
   ========================================================================== */

/* Chaque entrée peut avoir :
     nom        → le titre exact, tel qu'il est écrit sur le certificat
     organisme  → qui l'a délivré
     date       → la date de délivrance, telle qu'inscrite sur le document
     badge      → une image CARRÉE (le badge officiel), ou "" s'il n'y en a pas
     apercu     → une image du certificat lui-même, ou ""
     fichier    → le PDF officiel à ouvrir, ou ""
     poids      → le poids du PDF, affiché sur le lien (facultatif, sois honnête)
     verif      → l'adresse publique de vérification chez l'organisme, ou ""
                  C'est la preuve la plus forte : elle vaut mieux qu'un PDF,
                  parce que le visiteur la contrôle directement à la source.
     couvre     → une ligne sur ce que le certificat atteste (facultatif)

   Toutes les images et tous les PDF sont dans assets/certifs/ */

const CERTIFICATIONS = [

  {
    categorie: "Certifications obtenues",
    intro: "Cinq certifications Cisco Networking Academy, passées en dehors des heures de cours. Chaque certificat est téléchargeable ici et porte un code de vérification Cisco.",
    items: [
      {
        nom: "Networking Basics (Notions de base sur les réseaux)",
        organisme: "Cisco Networking Academy",
        date: "4 octobre 2026",
        badge: "assets/certifs/badge-cisco-networking-basics.png",
        apercu: "",
        fichier: "assets/certifs/certificat-cisco-networking-basics.pdf",
        poids: "219 Ko",
        couvre: "Les bases des réseaux informatiques."
      },
      {
        nom: "Introduction to Cybersecurity",
        organisme: "Cisco Networking Academy",
        date: "27 mars 2026",
        badge: "assets/certifs/badge-cisco-introduction-cybersecurity.png",
        apercu: "",
        fichier: "assets/certifs/certificat-cisco-introduction-cybersecurity.pdf",
        poids: "215 Ko",
        couvre: "Menaces, vulnérabilités et bonnes pratiques de protection des données."
      },
      {
        nom: "Introduction to Packet Tracer",
        organisme: "Cisco Networking Academy",
        date: "22 décembre 2025",
        badge: "assets/certifs/badge-cisco-introduction-packet-tracer.png",
        apercu: "assets/certifs/apercu-cisco-introduction-packet-tracer.png",
        fichier: "assets/certifs/certificat-cisco-introduction-packet-tracer.pdf",
        poids: "226 Ko",
        couvre: "Construction et modification de réseaux simulés, contrôleurs réseau, objets connectés."
      },
      {
        nom: "Exploring Internet of Things with Cisco Packet Tracer",
        organisme: "Cisco Networking Academy",
        date: "28 novembre 2025",
        badge: "",
        apercu: "assets/certifs/apercu-cisco-exploring-iot.png",
        fichier: "assets/certifs/certificat-cisco-exploring-iot.pdf",
        poids: "227 Ko",
        couvre: "Simulation d'objets connectés et de réseaux domestiques intelligents."
      },
      {
        nom: "Exploring Networking with Cisco Packet Tracer",
        organisme: "Cisco Networking Academy",
        date: "29 octobre 2025",
        badge: "",
        apercu: "assets/certifs/apercu-cisco-exploring-networking.png",
        fichier: "assets/certifs/certificat-cisco-exploring-networking.pdf",
        poids: "227 Ko",
        couvre: "Conception et test de topologies réseau en environnement simulé."
      }
    ]
  },

  {
    categorie: "Badges de formation",
    intro: "Des parcours suivis en autonomie, hors référentiel du BTS.",
    items: [
      {
        /* OpenAI Academy fournit les deux : le certificat en PDF ET une page
           publique de verification. On affiche les deux liens : le fichier
           pour l emporter, l adresse pour que le recruteur controle a la
           source sans avoir a me croire. */
        nom: "AI Foundations",
        organisme: "OpenAI Academy",
        date: "6 septembre 2026",
        badge: "",
        apercu: "assets/certifs/apercu-openai-ai-foundations.png",
        fichier: "assets/certifs/certificat-openai-ai-foundations.pdf",
        poids: "697 Ko",
        verif: "https://academy.openai.com/public/certificate/xkqihopg1e",
        couvre: "Fondamentaux de l intelligence artificielle : capacites, limites et usages."
      },
      {
        /* Claude Academy ne propose aucun fichier à télécharger : le badge
           n'existe que sous forme de page web. L'adresse de vérification EST
           la preuve, et elle vaut mieux qu'un PDF — n'importe qui la contrôle
           directement chez Anthropic, sans avoir à me croire. */
        nom: "AI Fluency: Framework & Foundations",
        organisme: "Claude Academy (Anthropic)",
        date: "4 septembre 2026",
        badge: "assets/certifs/vignette-claude-academy-ai-fluency-framework.svg",
        /* Visuel maison, pas un badge d organisme : l organisme n en
           delivre aucun. officiel:false l exclut du compteur et change
           son texte alternatif. */
        officiel: false,
        apercu: "",
        fichier: "",
        poids: "",
        verif: "https://academy.claude.com/verify/960cf75705ecc347c5616a5af7dc03fa",
        couvre: "Cadre et fondamentaux d'un usage raisonné de l'intelligence artificielle. Cours de 14 leçons et un quiz."
      },
      {
        nom: "Introduction à l'IA responsable",
        organisme: "Google Skills",
        date: "3 mai 2026",
        badge: "assets/certifs/badge-google-introduction-responsible-ai.png",
        apercu: "",
        fichier: "",
        poids: "",
        verif: "https://www.skills.google/public_profiles/92348b2c-c3c6-48b8-985e-c905e840d7e4",
        couvre: "Principes d'usage responsable de l'intelligence artificielle."
      },
      {
        nom: "Présentation de l'IA générative",
        organisme: "Google Skills",
        date: "7 mai 2026",
        badge: "assets/certifs/badge-google-presentation-ia-generative.png",
        apercu: "",
        fichier: "",
        poids: "",
        verif: "https://www.skills.google/public_profiles/92348b2c-c3c6-48b8-985e-c905e840d7e4",
        couvre: "Parcours Google Skills sur les fondamentaux de l'IA générative."
      },
      {
        nom: "AI Fluency for Students",
        organisme: "Anthropic",
        date: "2026",
        badge: "assets/certifs/vignette-anthropic-ai-fluency-students.svg",
        /* Visuel maison, pas un badge d organisme : l organisme n en
           delivre aucun. officiel:false l exclut du compteur et change
           son texte alternatif. */
        officiel: false,
        apercu: "",
        fichier: "assets/certifs/attestation-anthropic-1.pdf",
        poids: "148 Ko",
        couvre: "Usage raisonné des assistants d'intelligence artificielle dans le travail d'étudiant."
      },
      {
        nom: "Claude Code 101",
        organisme: "Anthropic",
        date: "2026",
        badge: "assets/certifs/vignette-anthropic-claude-code-101.svg",
        /* Visuel maison, pas un badge d organisme : l organisme n en
           delivre aucun. officiel:false l exclut du compteur et change
           son texte alternatif. */
        officiel: false,
        apercu: "",
        fichier: "assets/certifs/attestation-anthropic-2.pdf",
        poids: "96 Ko",
        couvre: "Prise en main de l'assistant de développement Claude Code en ligne de commande."
      }
    ]
  },

  {
    categorie: "Modules Microsoft Learn",
    /* IMPORTANT — HONNÊTETÉ : ce ne sont PAS des certifications, ce sont des
       modules de formation terminés. Ils ont leur propre catégorie pour que
       la distinction soit évidente. Ne les mélange jamais avec les Cisco.

       Les badges et les dates viennent de ton profil public Microsoft Learn :
       https://learn.microsoft.com/fr-fr/users/stylegarraway-1927/
       Ce sont donc les images officielles, pas des visuels refaits. */
    intro: "Dix modules de formation terminés sur Microsoft Learn, dont un trophée de parcours. Ce ne sont pas des certifications : ils attestent d'un parcours suivi et d'évaluations de module réussies, pas d'un examen surveillé. Ils sont affichés à part pour que la distinction soit nette.",
    items: [
      { nom: "Présentation de l'infrastructure cloud : décrire les concepts cloud",
        organisme: "Microsoft Learn", date: "8 mars 2026",
        badge: "assets/certifs/badge-microsoft-infrastructure-cloud.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-infrastructure-cloud.pdf", poids: "434 Ko",
        couvre: "Trophée de parcours : tous les modules du parcours validés." },

      { nom: "Décrire le cloud computing",
        organisme: "Microsoft Learn", date: "8 mars 2026",
        badge: "assets/certifs/badge-microsoft-decrire-le-cloud-computing.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-decrire-le-cloud-computing.pdf", poids: "397 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Décrire les avantages de l'utilisation des services cloud",
        organisme: "Microsoft Learn", date: "8 mars 2026",
        badge: "assets/certifs/badge-microsoft-avantages-services-cloud.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-avantages-services-cloud.pdf", poids: "395 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Décrire les types de services cloud",
        organisme: "Microsoft Learn", date: "8 mars 2026",
        badge: "assets/certifs/badge-microsoft-types-services-cloud.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-types-services-cloud.pdf", poids: "401 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Prise en main de FinOps",
        organisme: "Microsoft Learn", date: "8 mars 2026",
        badge: "assets/certifs/badge-microsoft-finops.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-finops.pdf", poids: "427 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Décrire les principaux composants architecturaux d'Azure",
        organisme: "Microsoft Learn", date: "9 mars 2026",
        badge: "assets/certifs/badge-microsoft-composants-architecturaux.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-composants-architecturaux.pdf", poids: "1 Mo",
        couvre: "Évaluation du module réussie." },

      { nom: "Écrire vos premières lignes de code en C#",
        organisme: "Microsoft Learn", date: "22 mars 2026",
        badge: "assets/certifs/badge-microsoft-premieres-lignes-csharp.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-premieres-lignes-csharp.pdf", poids: "404 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Présentation des concepts de l'IA",
        organisme: "Microsoft Learn", date: "23 mars 2026",
        badge: "assets/certifs/badge-microsoft-concepts-ia.svg",
        apercu: "", fichier: "assets/certifs/module-microsoft-concepts-ia.pdf", poids: "432 Ko",
        couvre: "Évaluation du module réussie." },

      { nom: "Stocker et récupérer des données avec des valeurs littérales et variables en C#",
        organisme: "Microsoft Learn", date: "24 mars 2026",
        badge: "assets/certifs/badge-microsoft-csharp-variables.svg",
        apercu: "", fichier: "", poids: "", verif: "https://learn.microsoft.com/fr-fr/users/stylegarraway-1927/",
        couvre: "Évaluation du module réussie." },

      { nom: "Présentation de l'IA et des agents génératifs",
        organisme: "Microsoft Learn", date: "2 mai 2026",
        badge: "assets/certifs/badge-microsoft-ia-agents-generatifs.svg",
        apercu: "", fichier: "", poids: "", verif: "https://learn.microsoft.com/fr-fr/users/stylegarraway-1927/",
        couvre: "Évaluation du module réussie." }
    ]
  },

  {
    categorie: "Formations AWS suivies",
    /* Ce sont de vrais certificats de fin de formation, délivrés par AWS
       Training & Certification et signés par sa directrice. Ils ne valent
       PAS l'examen CLF-C02, qui reste à passer : c'est pourquoi ils ont leur
       propre catégorie, distincte de « En préparation » juste en dessous. */
    intro: "Deux formations officielles AWS terminées en préparation de l'examen Cloud Practitioner. Ce sont des certificats de formation, pas la certification elle-même.",
    items: [
      {
        nom: "Official Practice Question Set : AWS Certified Cloud Practitioner (CLF-C02)",
        organisme: "AWS Training & Certification",
        date: "31 mars 2026",
        badge: "assets/certifs/vignette-aws-practice-question-set.svg",
        officiel: false,
        apercu: "",
        fichier: "assets/certifs/certificat-aws-practice-question-set.pdf",
        poids: "91 Ko",
        couvre: "Jeu de questions officielles d'entraînement, version française."
      },
      {
        nom: "Exam Prep Plan Overview : AWS Certified Cloud Practitioner (CLF-C02)",
        organisme: "AWS Training & Certification",
        date: "30 mars 2026",
        badge: "assets/certifs/vignette-aws-exam-prep-plan.svg",
        officiel: false,
        apercu: "",
        fichier: "assets/certifs/certificat-aws-exam-prep-plan.pdf",
        poids: "91 Ko",
        couvre: "Plan de préparation officiel à l'examen, version française."
      }
    ]
  },

  {
    categorie: "En préparation",
    intro: "L'examen lui-même n'est pas encore passé. Les deux formations préparatoires ci-dessus sont terminées, mais elles ne valent pas la certification.",
    items: [
      {
        nom: "AWS Certified Cloud Practitioner",
        organisme: "Amazon Web Services",
        date: "Révisions en cours",
        badge: "",
        apercu: "",
        fichier: "",
        poids: "",
        couvre: "Plan de révision officiel suivi et jeu de questions d'entraînement en cours."
      }
    ]
  }

];


/* ==========================================================================
   7. VEILLE TECHNOLOGIQUE
   --------------------------------------------------------------------------
   Attendue explicitement au BTS SIO. Peu d'étudiants la soignent :
   c'est un vrai différenciateur à l'oral.

   Sois précis sur les sources. "Je regarde des vidéos YouTube" ne vaut rien ;
   "Je suis les bulletins du CERT-FR" vaut beaucoup.
   ========================================================================== */

const VEILLE = [
  {
    sujet: "Cybersécurité et vulnérabilités",
    sources: [
      "Bulletins d'actualité du CERT-FR (cert.ssi.gouv.fr)",
      "TODO: ajoute une deuxième source que tu consultes vraiment"
    ],
    retiens: "TODO: en deux phrases, une chose concrète apprise récemment grâce à cette veille — par exemple une faille qui t'a fait changer ta façon de configurer quelque chose."
  },
  {
    sujet: "Cloud et hébergement",
    sources: [
      "AWS Skill Builder — parcours Cloud Practitioner",
      "Microsoft Learn — parcours infrastructure cloud"
    ],
    retiens: "TODO: pourquoi tu suis ce sujet, et ce que ça change concrètement pour un administrateur réseau aujourd'hui."
  },
  {
    sujet: "TODO: ton troisième sujet",
    sources: ["TODO: source 1", "TODO: source 2"],
    retiens: "TODO: ce que tu en retires."
  }
];
